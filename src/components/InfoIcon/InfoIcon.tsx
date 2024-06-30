import { Tooltip } from '../Tooltip/Tooltip'

type InfoIconProps = {
  tooltipTitle?: string
  tooltipDesc?: string
}

const InfoIcon = ({ tooltipDesc, tooltipTitle }: InfoIconProps) => {
  const component = <img src="info-alert.svg" alt="info" />

  if (!tooltipDesc && !tooltipTitle) {
    return component
  }

  return (
    <Tooltip title={tooltipTitle} description={tooltipDesc}>
      {component}
    </Tooltip>
  )
}

export { InfoIcon }
