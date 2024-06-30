import DataDisplay from '../DataDisplay/DataDisplay'

type InfoFieldProps = {
  title: string
  value: string
}
const InfoField = ({ title, value }: InfoFieldProps) => {
  return (
    <div className="flex flex-1 flex-row">
      <DataDisplay className="flex items-center justify-center">
        <span className="text-regular bitrush-neutral-100 typography-xs">
          {title}
        </span>
      </DataDisplay>
      <DataDisplay className="flex flex-1 items-center justify-center">
        <span className="text-regular bitrush-neutral-100 typography-xs lowercase">
          {value}
        </span>
      </DataDisplay>
    </div>
  )
}

export default InfoField
