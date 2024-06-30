const Footer = () => {
  const date = new Date()

  return (
    <div className="py-6 text-center">
      <p className="typography-xs font-thin text-bitrush-neutral-0">
        Bitrush Copyright {date.getFullYear()}
      </p>
    </div>
  )
}

export default Footer
