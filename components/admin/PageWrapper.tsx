type Props = {
  children: React.ReactNode
}

export default function PageWrapper({ children }: Props) {
  return (
    <div className="space-y-6 py-4">{children}</div>
  )
}
