import React, { PropsWithChildren } from 'react'

import { useCurrentStep } from '../../store/useStepFormStore'

const Step = ({ children }: PropsWithChildren) => {
  const currentStep = useCurrentStep()
  const content = React.Children.toArray(children)[currentStep - 1]

  return <>{content}</>
}

export default Step
