import DashboardShellClient from './DashboardShellClient'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Server component: delegates interactive parts to the client shell
  return <DashboardShellClient>{children}</DashboardShellClient>
}
