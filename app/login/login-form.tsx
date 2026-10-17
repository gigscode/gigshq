'use client'

import { useState, type FormEvent } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowRight, Eye, EyeOff, LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'

export function LoginForm({
  confirmationError = false,
  initialMode = 'sign-in',
}: {
  confirmationError?: boolean
  initialMode?: 'sign-in' | 'sign-up' | 'reset-password'
}) {
  const router = useRouter()
  const [mode, setMode] = useState<'sign-in' | 'sign-up' | 'reset-request' | 'reset-password'>(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState(
    confirmationError ? 'That confirmation link could not be verified. Try signing in again or request a new confirmation email.' : '',
  )
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setMessage('')
    setPending(true)

    try {
      const supabase = createClient()

      if (mode === 'reset-request') {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent('/login?mode=reset-password')}`,
        })

        if (resetError) throw resetError
        setMessage('If an account exists for this email, a password reset link has been sent.')
        return
      }

      if (mode === 'reset-password') {
        const { error: updateError } = await supabase.auth.updateUser({ password })

        if (updateError) throw updateError

        const { error: signOutError } = await supabase.auth.signOut()
        if (signOutError) {
          setMode('sign-in')
          setPassword('')
          setError('Your password was updated, but we could not end the recovery session. Please sign out and sign in again.')
          return
        }

        setMode('sign-in')
        setPassword('')
        setMessage('Your password has been updated. Sign in with your new password.')
        return
      }

      if (mode === 'sign-up') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?next=%2Fapp`,
          },
        })

        if (signUpError) throw signUpError
        if (!data.session) {
          setMessage('Check your inbox to confirm your email, then sign in.')
          return
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })

        if (signInError?.message === 'Invalid login credentials') {
          setError("Email or password is incorrect. Try again, reset your password, or create an account if you haven't signed up.")
          return
        }

        if (signInError) throw signInError
      }

      router.replace('/app')
      router.refresh()
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Authentication failed. Please try again.')
    } finally {
      setPending(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fbfaf7] px-4 py-10">
      <Card className="w-full max-w-lg border-slate-200/80 bg-white shadow-sm">
        <CardHeader className="items-center gap-5 pb-2 text-center">
          <Image src="/gigshqicon.png" alt="" width={56} height={56} className="rounded-xl" />
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              {mode === 'sign-in'
                ? 'Sign in to gigshq'
                : mode === 'sign-up'
                  ? 'Create your account'
                  : mode === 'reset-request'
                    ? 'Reset your password'
                    : 'Choose a new password'}
            </h1>
            <p className="mt-3 text-base leading-7 text-slate-600">
              {mode === 'reset-request'
                ? 'Enter your account email and we will send a password reset link.'
                : mode === 'reset-password'
                  ? 'Choose a new password for your account.'
                  : 'Your personal workspace for finding and organizing opportunities.'}
            </p>
          </div>
        </CardHeader>
        <CardContent className="px-6 pb-7 pt-6 sm:px-8">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {mode !== 'reset-password' && (
              <label className="flex flex-col gap-2 text-base font-semibold text-slate-800">
                Email
                <Input
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={320}
                  className="h-12 px-3 text-base font-medium"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                />
              </label>
            )}
            {mode === 'sign-in' && (
              <button
                type="button"
                className="-mt-3 min-h-8 self-end text-sm font-semibold text-violet-800 underline-offset-4 hover:underline"
                onClick={() => {
                  setMode('reset-request')
                  setError('')
                  setMessage('')
                }}
              >
                Forgot password?
              </button>
            )}
            {mode !== 'reset-request' && (
              <div className="flex flex-col gap-2 text-base font-semibold text-slate-800">
                <label htmlFor="auth-password">{mode === 'reset-password' ? 'New password' : 'Password'}</label>
                <span className="relative block">
                  <Input
                    id="auth-password"
                    type={passwordVisible ? 'text' : 'password'}
                    autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'}
                    required
                    minLength={mode === 'sign-in' ? undefined : 8}
                    maxLength={128}
                    className="h-12 px-3 pr-12 text-base font-medium"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder={mode === 'sign-in' ? 'Your password' : 'At least 8 characters'}
                  />
                  <button
                    type="button"
                    aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                    aria-pressed={passwordVisible}
                    onClick={() => setPasswordVisible((visible) => !visible)}
                    className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-lg text-slate-500 transition-colors hover:text-violet-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700"
                  >
                    {passwordVisible
                      ? <EyeOff aria-hidden="true" className="size-5" />
                      : <Eye aria-hidden="true" className="size-5" />}
                  </button>
                </span>
              </div>
            )}
            {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>}
            {message && <p role="status" className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{message}</p>}
            <Button type="submit" disabled={pending} className="mt-1 h-12 w-full text-base font-bold">
              {pending ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : <ArrowRight aria-hidden="true" data-icon="inline-end" />}
              {pending
                ? 'Please wait…'
                : mode === 'sign-in'
                  ? 'Sign in'
                  : mode === 'sign-up'
                    ? 'Create account'
                    : mode === 'reset-request'
                      ? 'Send reset link'
                      : 'Update password'}
            </Button>
          </form>
          {mode === 'sign-in' || mode === 'sign-up' ? (
            <p className="mt-6 text-center text-base text-slate-600">
              {mode === 'sign-in' ? 'New to gigshq?' : 'Already have an account?'}{' '}
              <button
                type="button"
                className="min-h-10 font-bold text-violet-800 underline-offset-4 hover:underline"
                onClick={() => {
                  setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in')
                  setError('')
                  setMessage('')
                }}
              >
                {mode === 'sign-in' ? 'Create an account' : 'Sign in'}
              </button>
            </p>
          ) : (
            <button
              type="button"
              className="mt-6 min-h-10 w-full text-center text-base font-bold text-violet-800 underline-offset-4 hover:underline"
              onClick={() => {
                setMode('sign-in')
                setError('')
                setMessage('')
              }}
            >
              Back to sign in
            </button>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
