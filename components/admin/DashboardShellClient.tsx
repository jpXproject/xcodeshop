"use client"

import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Container from './Container'
import PageWrapper from './PageWrapper'

export default function DashboardShellClient({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const stored = globalThis.localStorage?.getItem('admin:sidebarCollapsed')
    if (stored) setCollapsed(stored === 'true')
  }, [])

  const toggle = () => {
    setCollapsed((c) => {
      const next = !c
      try { globalThis.localStorage?.setItem('admin:sidebarCollapsed', String(next)) } catch { }
      return next
    })
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar collapsed={collapsed} />

      <div className="flex-1 flex flex-col">
        <Header collapsed={collapsed} onToggle={toggle} />

        <main className="flex-1 overflow-y-auto bg-transparent p-4 sm:p-6 lg:p-8">
          <Container>
            <PageWrapper>{children}</PageWrapper>
          </Container>
        </main>
      </div>
    </div>
  )
}
