type Props = {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className = '' }: Props) {
  return (
    <div className={"rounded-xl border border-white/6 bg-slate-900/60 shadow-sm p-4 transition duration-300 " + className}>
      {children}
    </div>
  )
}
