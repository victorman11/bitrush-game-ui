import envVariables from '@/commons/consts/envVariables'
import StatsTable from '@/pages/Stats/components/StatsTable.tsx'
const appDomain = envVariables.APP_DOMAIN
function Stats() {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-xl md:max-w-2xl">
        <h1 className="typography-h1 mb-7 hidden text-bitrush-neutral-0 lg:block">
          Stats
        </h1>
        <StatsTable />
        <div className="typography-xs mt-8 font-thin text-bitrush-neutral-0">
          You want to become investor? Please contact us:{' '}
          <a
            className="font-bold text-bitrush-blue-500"
            href={`mailto:team@${appDomain}`}
          >
            {`team@${appDomain}`}
          </a>
        </div>
      </div>
    </div>
  )
}

export default Stats
