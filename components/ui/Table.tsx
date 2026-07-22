type Props = {
  children: React.ReactNode
  className?: string
}

export default function Table({ children, className = '' }: Props) {
  return (
    <div className={`rounded-xl border border-white/6 bg-slate-900/50 overflow-auto shadow-sm ${className}`}>
      <table className="min-w-full divide-y divide-white/6">{children}</table>
    </div>
  )
}
