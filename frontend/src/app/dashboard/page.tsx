'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabaseClient'

export default function DashboardPage() {
  const router = useRouter()
  
  useEffect(() => {
    const supabase = getSupabaseClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push('/auth') // redirect if not logged in
    })
  }, [])

  return <div>Your Dashboard</div>
}