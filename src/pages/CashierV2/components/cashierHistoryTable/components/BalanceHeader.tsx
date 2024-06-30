type BalanceHeaderProps = {
  amount: string
  title: string
}
const BalanceHeader = ({ amount, title }: BalanceHeaderProps) => {
  return (
    <div className="mb-3 flex items-center justify-center border-y border-bitrush-neutral-500 p-2">
      <span className="typography-xs text-bitrush-neutral-100">
        <span>{title}:</span>&nbsp;
        <span className="text-bitrush-blue-500">
          <b>{amount}</b>
        </span>
      </span>
    </div>
  )
}

export { BalanceHeader }
