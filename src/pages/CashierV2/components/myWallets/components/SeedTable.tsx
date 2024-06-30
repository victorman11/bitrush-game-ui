import { useMemo } from 'react'

import RenderIf from '@/components/RenderIf/RenderIf'

type SeedTableType = {
  seed: Array<string>
  tableColumns: number
  visible?: boolean
}

type Seed = {
  index: number
  word: string
}

const SeedTable = ({ seed, tableColumns, visible = false }: SeedTableType) => {
  const seedTableData = useMemo((): { index: number; word: string }[][] => {
    const cols: Seed[][] = []
    let seedData: Seed[] = []
    let currentIndex = 1

    for (let i = 0; i < seed.length; i++) {
      seedData.push({ index: currentIndex++, word: seed[i] })

      if (seedData.length === tableColumns) {
        cols.push([...seedData])
        seedData = []
      }
    }
    if (seedData.length > 0) {
      cols.push([...seedData])
    }

    return cols
  }, [seed, tableColumns])

  return (
    <div>
      <p className="typography-xs mb-4 mt-6 font-bold text-bitrush-blue-100 ">
        Your seed:
      </p>
      <div className="relative">
        <div
          className={`relative flex flex-1 flex-row ${
            visible ? 'blur-none' : 'blur-sm'
          }`}
        >
          {seedTableData.map((cols, index) => (
            <div key={index} className="flex flex-1 flex-col">
              {cols.map((seed, subIndex) => (
                <p
                  key={subIndex}
                  className={`typography-xs font-bold capitalize text-bitrush-yellow-700 ${
                    visible ? 'select-all' : 'select-none'
                  }`}
                >
                  {`#${seed.index} - ${seed.word}`}
                </p>
              ))}
            </div>
          ))}
        </div>

        <RenderIf isTrue={!visible}>
          <div className="absolute left-1/2 top-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2 transform border border-bitrush-yellow-700 bg-bitrush-neutral-800 px-4 py-2">
            <p className="typography-sm   text-center font-light text-bitrush-yellow-500">
              Your seed is personal and must remains secret.
            </p>
          </div>
        </RenderIf>
      </div>
    </div>
  )
}

export default SeedTable
