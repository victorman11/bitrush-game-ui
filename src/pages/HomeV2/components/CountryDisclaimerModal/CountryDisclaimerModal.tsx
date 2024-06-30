import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { QueryKeys } from '@/commons/consts'
import { useAuthStore } from '@/commons/stores'
import Button from '@/components/Button/Button'
import Divisor from '@/components/Divisor/Divisor'
import { Form } from '@/components/Form'
import { ModalDialog, ModalDialogHandles } from '@/components/ModalDialog'

import { patchUserCountryDisclaimer } from '../../store/actions'
import { ApiRequest } from '../../types'
import { CountryDisclaimerData, countryDisclaimerSchema } from './schema'

const CountryDisclaimerModal = () => {
  const queryClient = useQueryClient()
  const ref = useRef<ModalDialogHandles>(null)
  const { user } = useAuthStore()

  const countryDisclaimerForm = useForm<CountryDisclaimerData>({
    resolver: zodResolver(countryDisclaimerSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ApiRequest.UserCountryDisclaimerType) =>
      patchUserCountryDisclaimer(payload),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [QueryKeys.GET_ME],
      })
    },
  })

  const { formState, handleSubmit } = countryDisclaimerForm

  const handleSaveOnSubmit = (data: CountryDisclaimerData) => {
    mutate({ isCountryDisclaimer: data.countryDisclaimer })
    ref.current?.closeModal()
  }

  useEffect(() => {
    if (user && !user.isCountryDisclaimer) {
      ref.current?.openModal()
    }
  }, [user])

  return (
    <ModalDialog ref={ref}>
      <div className="flex max-w-[500px] flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-2">
          <img src="hand-blue.svg" className="h-8 w-8" alt="hand blue" />
          <span className="typography-xs text-center font-light text-bitrush-blue-400">
            Disclaimer
          </span>
        </div>
        <span className="typography-xs text-center font-light">
          If you live in the following restricted territories, you are not
          allowed to play on Crashouse
        </span>
        <Divisor className="!bg-bitrush-red-600" />
        <span className="typography-xs max-w-[300px] text-center font-light text-bitrush-red-500">
          USA, Aruba, Bonaire, Curacao, France, Netherlands, Saba, St Eustatius,
          St Martin, China, United Kingdoms, Turkey
        </span>
        <Divisor className="!bg-bitrush-red-600" />
        <FormProvider {...countryDisclaimerForm}>
          <Form.Checkbox name="countryDisclaimer">
            <span className="typography-xs font-extralight text-bitrush-neutral-0">
              I confirm gambling isn’t forbidden by my local authorities and I’m
              at least 18 years old
            </span>
          </Form.Checkbox>
          <Button
            label="Confirm"
            loading={isPending}
            disabled={!formState.isValid}
            onClick={handleSubmit(handleSaveOnSubmit)}
          />
        </FormProvider>
      </div>
    </ModalDialog>
  )
}

export { CountryDisclaimerModal }
