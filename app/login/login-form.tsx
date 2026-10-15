'use client'

import { useState, type FormEvent } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'

export function LoginForm({ confirmationError = false }: { confirmationError?: boolean }) {
  const router = useRouter()
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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

      if (mode === 'sign-up') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
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

        if (signInError) throw signInError
      }

      router.replace('/')
      router.refresh()
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Authentication failed. Please try again.')
    } finally {
      setPending(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f7fb] px-4 py-10">
      <Card className="w-full max-w-md border-slate-200/80 bg-white shadow-sm">
        <CardHeader className="items-center gap-4 pb-2 text-center">
          <Image src="/gigshqicon.png" alt="" width={48} height={48} className="rounded-xl" />
          <div>
            <CardTitle className="text-xl font-semibold tracking-tight text-slate-950">
              {mode === 'sign-in' ? 'Sign in to gigshq' : 'Create your account'}
            </CardTitle>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Your personal workspace for finding and organizing opportunities.
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-5">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Email
              <Input
                type="email"
                autoComplete="email"
                required
                maxLength={320}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Password
              <Input
                type="password"
                autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'}
                required
                minLength={8}
                maxLength={128}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 8 characters"
              />
            </label>
            {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>}
            {message && <p role="status" className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{message}</p>}
            <Button type="submit" disabled={pending} className="mt-1 w-full">
              {pending ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : <ArrowRight aria-hidden="true" data-icon="inline-end" />}
              {pending ? 'Please wait…' : mode === 'sign-in' ? 'Sign in' : 'Create account'}
            </Button>
          </form>
          <p className="mt-5 text-center text-sm text-slate-500">
            {mode === 'sign-in' ? 'New to gigshq?' : 'Already have an account?'}{' '}
            <button
              type="button"
              className="min-h-10 font-semibold text-violet-800 underline-offset-4 hover:underline"
              onClick={() => {
                setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in')
                setError('')
                setMessage('')
              }}
            >
              {mode === 'sign-in' ? 'Create an account' : 'Sign in'}
            </button>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
