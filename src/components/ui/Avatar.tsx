interface AvatarProps {
  initials: string
  color?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  name?: string
}

const SIZE_CLASSES = {
  xs: 'w-6 h-6 text-2xs',
  sm: 'w-7 h-7 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-10 h-10 text-sm',
}

export function Avatar({ initials, color = '#6366f1', size = 'md', name }: AvatarProps) {
  return (
    <div
      title={name}
      className={`${SIZE_CLASSES[size]} rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0`}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  )
}
