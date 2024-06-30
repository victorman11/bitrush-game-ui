import Button from '@/components/Button/Button'
import { Card } from '@/components/Card'
import { ConditionalRenderer } from '@/components/ConditionalRenderer/ConditionalRenderer'
import DataDisplay from '@/components/DataDisplay/DataDisplay'
import DataDisplayRow from '@/components/DataDisplay/DataDisplayRow'
import { InfoIcon } from '@/components/InfoIcon/InfoIcon'
import { ModalDialog } from '@/components/ModalDialog'
import RenderIf from '@/components/RenderIf/RenderIf'

import LevelProgressBar from '../levelProgressBar/LevelProgressBar'
import { ShareCode } from './components/ShareCode/ShareCode'
import { useNetworkInfo } from './useNetworkInfo'

const NetworkInfo = () => {
  const { functions, refs, states } = useNetworkInfo()

  return (
    <>
      <ModalDialog ref={refs.modalDialogRef} contentRef={refs.modalContentRef}>
        <ShareCode onShare={functions.handleCopyAffiliateUrl} />
      </ModalDialog>
      <Card.Container className="thin-scrollbar flex h-full flex-col justify-between overflow-y-scroll p-2 py-4 lg:p-10">
        <Card.Header>
          <Card.Title className="w-full text-center">
            My Affiliate Code
          </Card.Title>
        </Card.Header>
        <Card.Content className="flex flex-col gap-[1.88vh]">
          <div>
            <div className="flex flex-1 flex-row">
              <DataDisplay className="flex items-center justify-center ">
                <span className="text-regular bitrush-neutral-100 typography-xs ">
                  Affiliate Code
                </span>
              </DataDisplay>
              <DataDisplay className="flex flex-1 items-center justify-between overflow-hidden">
                <span className="text-regular bitrush-neutral-100 typography-xs truncate">
                  {states.affiliateCode}
                </span>
                <div className="cursor-pointer" onClick={functions.handleCopy}>
                  <img src="copy-icon.svg" alt="copy" />
                </div>
              </DataDisplay>
            </div>
            <Button
              className="mt-2"
              label="Share Link"
              onClick={functions.handleShare}
            />
          </div>
          <DataDisplay className="bg-bitrush-neutral-900">
            <DataDisplayRow
              title="Affiliates in my network"
              formatValue={false}
              value={states.networkInfo?.totalAffiliates}
              coloredValue
              icon={
                <InfoIcon
                  tooltipDesc="those you invited and those invited by your affiliates."
                  tooltipTitle="Total network affiliates:"
                />
              }
            />
            <DataDisplayRow
              title="Total Network Revenue"
              value={states.networkInfo?.totalRevenue}
              coloredValue
            />
          </DataDisplay>

          <div className="text-center">
            <ConditionalRenderer
              condition={states.isMaximumLevel}
              whenTrue={
                <span className="typography-h1 font-bold text-bitrush-green-500">
                  Congratulations!
                </span>
              }
              whenFalse={
                <span className="typography-h1 font-bold text-bitrush-yellow-500">
                  You are in {states.networkInfo?.rank.level.label}!
                </span>
              }
            />
          </div>

          <RenderIf isTrue={!states.isMaximumLevel}>
            <LevelProgressBar
              currentLevel={states.networkInfo?.rank.level.value}
              directAffiliates={states.networkInfo?.directAffiliates}
              min={states.networkInfo?.rank.minAffiliates}
              max={states.networkInfo?.nextRank?.minAffiliates}
              isMaximumLevel={states.isMaximumLevel}
            />
          </RenderIf>

          <DataDisplay className="bg-bitrush-neutral-900 text-center">
            <ConditionalRenderer
              condition={states.isMaximumLevel}
              whenTrue={
                <span className="typography-xs">
                  <span className="font-bold text-bitrush-green-500">
                    Congratulations!
                  </span>{' '}
                  you have reached the maximum level. <br />
                  Continue to invite people to increase your revenue.
                </span>
              }
              whenFalse={
                <span className="typography-xs">
                  You miss{' '}
                  <span className="font-bold text-bitrush-yellow-500">
                    {states.nextRankCalculated} affiliates
                  </span>{' '}
                  to hit{' '}
                  <span className="font-bold text-bitrush-yellow-500">
                    level {states.networkInfo?.nextRank?.level.value}
                  </span>
                  , boosting revenues and lowering your contribution.
                </span>
              }
            />
          </DataDisplay>
        </Card.Content>
      </Card.Container>
    </>
  )
}

export { NetworkInfo }
