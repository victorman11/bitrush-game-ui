import envVariables from '@/commons/consts/envVariables'
import { useAuthStore } from '@/commons/stores'
import DataDisplay from '@/components/DataDisplay/DataDisplay'

type ShareCodeProps = {
  onShare: (url: string) => void
}

const ShareCode = ({ onShare }: ShareCodeProps) => {
  const { user } = useAuthStore()

  const affiliateUrl = `${envVariables.APP_DOMAIN}?affiliate=${user?.affiliateCode}`

  return (
    <div className="flex w-[30vw] min-w-[250px] flex-col gap-6">
      <span>Share link</span>
      <div className="flex flex-1 flex-row">
        <DataDisplay className="flex flex-1 items-center justify-between overflow-hidden">
          <span className="text-regular bitrush-neutral-100 typography-xs truncate">
            {affiliateUrl}
          </span>
          <div className="cursor-pointer" onClick={() => onShare(affiliateUrl)}>
            <img src="copy-icon.svg" alt="copy" />
          </div>
        </DataDisplay>
      </div>
    </div>
  )
}

export { ShareCode }
