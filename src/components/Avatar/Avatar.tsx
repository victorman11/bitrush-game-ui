interface AvatarProps {
  src?: string
  alt?: string
  size?: number
}
const Avatar = ({ src, alt = '', size = 10 }: AvatarProps) => {
  return (
    <div
      className={`bg-gray-200 text-gray-400 inline-flex items-center justify-center rounded-full bg-bitrush-neutral-800 min-w-${size} min-h-${size} w-${size} h-${size}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`w-${size} h-${size} rounded-full`}
        />
      ) : (
        <img src="avatar.svg" alt={alt} className="h-1/3 w-1/3" />
      )}
    </div>
  )
}
export default Avatar
