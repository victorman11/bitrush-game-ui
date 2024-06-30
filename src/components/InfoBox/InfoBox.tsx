interface InfoBoxProps {
  title: string
  value: string
}

const InfoBox = ({ title, value }: InfoBoxProps) => {
  return (
    <div
      className={
        // TODO REMOVE COMMENTS AFTER VALIDATION
        // "align-center border border-bitrush-neutral-600 bg-bitrush-neutral-850 flex flex-row justify-between rounded py-2 px-3"
        'align-center flex flex-row justify-between rounded border border-bitrush-neutral-600 bg-bitrush-neutral-850 px-[1.2vh] py-[0.78vh]'
      }
    >
      <p className="text-bitrush-blue-0 typography-xs font-light">{title}</p>
      <p className="typography-xs font-bold text-bitrush-neutral-0">{value}</p>
    </div>
  )
}

export default InfoBox
