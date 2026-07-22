type Props = {
  src?: string
  name?: string
  size?: number
}

export default function Avatar({ src, name = '', size = 40 }: Props) {
  const initials = name.split(' ').map((s) => s[0]).join('').slice(0, 2).toUpperCase()
  return src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={name} className="rounded-full object-cover" style={{ width: size, height: size }} />
  ) : (
    <div style={{ width: size, height: size }} className="flex items-center justify-center rounded-full bg-slate-800/60 text-slate-100 font-semibold">{initials}</div>
  )
}
