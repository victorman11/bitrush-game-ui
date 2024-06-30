import React from 'react'

interface RenderIfProps {
  children: JSX.Element | JSX.Element[]
  isTrue: boolean
}

const RenderIf: React.FC<RenderIfProps> = (props) => {
  const { children, isTrue } = props

  return isTrue ? children : null
}

export default RenderIf
