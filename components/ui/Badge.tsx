type Props = {
  children: React.ReactNode
  className?: string
}

export default function Badge({ children, className = '' }: Props) {
  return (
    <span className={`inline-flex items-center rounded-full border border-white/6 bg-slate-800/40 px-2 py-1 text-xs text-slate-200 ${className}`}>{children}</span>
  )
}
