import { TailSpin } from 'react-loader-spinner'

import { ConditionalRenderer } from '@/components/ConditionalRenderer/ConditionalRenderer'

import { useEmailVerificationCountDown } from './useEmailVerificationCountDown'

interface Props {
  resendCode: () => Promise<void>
  isResending: boolean
}

export function EmailVerificationCountDown({ resendCode, isResending }: Props) {
  const { seconds, isEnded, restartTime } = useEmailVerificationCountDown()

  async function handleRestart() {
    await resendCode()
    restartTime()
  }

  return (
    <ConditionalRenderer
      condition={isEnded || isResending}
      whenTrue={
        <button
          type="button"
          disabled={isResending}
          onClick={handleRestart}
          className="typography-xs flex items-center gap-2 text-bitrush-blue-500"
        >
          Resend the code
          {isResending && (
            <TailSpin
              visible={true}
              height="12"
              width="12"
              color="#0696FF"
              ariaLabel="tail-spin-loading"
              radius={1}
            />
          )}
        </button>
      }
      whenFalse={
        <div className="typography-xs flex gap-2 text-bitrush-neutral-300">
          <span>Resend the code</span>
          <div>
            <span>{`(${seconds[0]}${seconds[1]} sec)`}</span>
          </div>
        </div>
      }
    />
  )
}
