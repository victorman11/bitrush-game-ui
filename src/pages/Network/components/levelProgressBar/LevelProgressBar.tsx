import './styles.css'

import ReactSlider from 'react-slider'

import RenderIf from '@/components/RenderIf/RenderIf'

const getPoints = (
  initValue = 0,
  endValue: number | undefined,
  level: number,
) => {
  const maxEndValue = endValue === undefined ? initValue : endValue
  const minInitValue = endValue === undefined ? initValue - level : initValue

  const numPoints = Math.abs(maxEndValue - minInitValue + 1)
  const step = (maxEndValue - minInitValue) / (numPoints - 1)

  return Array.from({ length: numPoints }, (_, i) =>
    Math.round(minInitValue + step * i),
  )
}

interface Props {
  currentLevel?: number
  directAffiliates?: number
  min?: number
  max?: number
  isMaximumLevel?: boolean
}

const LevelProgressBar = ({
  currentLevel = 0,
  directAffiliates = 0,
  min,
  max,
  isMaximumLevel = false,
}: Props) => {
  const points = getPoints(min, max, currentLevel)

  return (
    <div className="flex flex-col">
      <div className="mb-[0.88vh] flex flex-row justify-between">
        <RenderIf isTrue={!isMaximumLevel}>
          <span className="bitrush-blue-100 typography-xs font-light">
            Level {currentLevel}
          </span>
        </RenderIf>

        <RenderIf isTrue={!isMaximumLevel}>
          <span className="bitrush-blue-100 typography-xs font-light">
            Level {currentLevel + 1}
          </span>
        </RenderIf>
      </div>
      <div>
        <ReactSlider
          disabled
          min={isMaximumLevel ? 0 : min}
          max={isMaximumLevel ? min : max}
          className="flex h-[0.7vh] items-center rounded"
          trackClassName={`rounded h-[0.7vh] custom-track`}
          thumbClassName={`rounded-full h-[0.7vh] w-[0.7vh] outline-none bg-bitrush-yellow-500 shadow-glow-yellow-hovered`}
          renderThumb={(props) => <div {...props} />}
          value={directAffiliates}
        />
      </div>
      <div className="mt-[0.41vh] flex flex-row justify-between">
        {points.map((point) => (
          <span
            key={point}
            className="bitrush-blue-100 typography-xs font-light"
          >
            {point}
          </span>
        ))}
      </div>
    </div>
  )
}

export default LevelProgressBar
