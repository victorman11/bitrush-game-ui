type UserSecurityItemProps = {
  title: string
  description?: string
  onClick: () => void
}

const UserSecurityItem = ({
  description,
  title,
  onClick,
}: UserSecurityItemProps) => {
  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-1 flex-col gap-1">
        <span className="typography-xs text-bitrush-neutral-300">{title}</span>
        <span className="typography-sm">{description}</span>
      </div>
      <div className="cursor-pointer" onClick={onClick}>
        <span className="typography-xs text-bitrush-blue-100">Edit</span>
      </div>
    </div>
  )
}

export { UserSecurityItem }
