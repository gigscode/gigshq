import { Dashboard } from '@/components/dashboard'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AppPage() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError && authError.name !== 'AuthSessionMissingError') {
    throw new Error('Could not verify the Supabase session.', { cause: authError })
  }

  if (!user) redirect('/login')

  const { data, error } = await supabase
    .from('opportunities')
    .select('id, company_name, title, description, source_name, source_url, contact_name, contact_email, compensation, fit_score, status, created_at')
    .order('created_at', { ascending: false })

  return (
    <Dashboard
      userId={user.id}
      userEmail={user.email ?? ''}
      initialOpportunities={data ?? []}
      loadError={error?.message ?? ''}
    />
  )
}
