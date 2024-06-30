import { useQuery } from '@tanstack/react-query'
import { useMemo, useRef } from 'react'

import { QueryKeys } from '@/commons/consts'
import { useOutsideClickAlerter } from '@/commons/hooks/useOutsideClickAlerter'
import { useAuthStore } from '@/commons/stores'
import { ModalDialogHandles } from '@/components/ModalDialog'
import { copyStringToClipboard } from '@/helpers/clipboard'

import { getNetworkInfo } from '../../store/actions'

const fiveMinutesInMiliseconds = 1000 * 60 * 5 // 5 minutes;

const useNetworkInfo = () => {
  const { user } = useAuthStore()
  const modalDialogRef = useRef<ModalDialogHandles>(null)
  const modalContentRef = useRef<HTMLDivElement>(null)

  const { data } = useQuery({
    queryFn: () => getNetworkInfo(),
    queryKey: [QueryKeys.GET_NETWORK_INFO],
    staleTime: fiveMinutesInMiliseconds,
  })

  const handleCopy = () => {
    if (!user?.affiliateCode) {
      return
    }
    copyStringToClipboard(user.affiliateCode, 'Affiliate code has been copied!')
  }

  const handleCopyAffiliateUrl = async (url: string) => {
    await copyStringToClipboard(url, 'Link has been copied!')
    modalDialogRef.current?.closeModal()
  }

  const handleShare = () => {
    modalDialogRef.current?.openModal()
  }

  const handleClose = () => {
    modalDialogRef.current?.closeModal()
  }

  const nextRankCalculated = useMemo(() => {
    if (!data) return null
    if (!data.nextRank) return null

    return data.nextRank.minAffiliates - data.directAffiliates
  }, [data])

  useOutsideClickAlerter(modalContentRef, handleClose)

  return {
    functions: {
      handleCopy,
      handleShare,
      handleCopyAffiliateUrl,
    },
    refs: {
      modalDialogRef,
      modalContentRef,
    },
    states: {
      affiliateCode: user?.affiliateCode,
      networkInfo: data,
      nextRankCalculated,
      isMaximumLevel: data?.nextRank === null,
    },
  }
}

export { useNetworkInfo }
