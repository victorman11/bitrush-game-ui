import { useMemo } from 'react'
import {
  FaArrowLeft,
  FaRegArrowAltCircleDown,
  FaRegArrowAltCircleUp,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { useAuthStore } from '@/commons/stores'
import CustomIcon from '@/components/CustomIcon/CustomIcon'
import RenderIf from '@/components/RenderIf/RenderIf'
import { formatCurrency } from '@/helpers/numbers'

import useHeader from '../useHeader'

type Props = {
  onlyLogo?: boolean
}

export default function MobileHeader(props: Props) {
  const { constants, states, functions } = useHeader({ isMobile: true })
  const { isLoggedIn } = useAuthStore()

  const formattedRush = useMemo(() => {
    return states.user
      ? formatCurrency(states.user?.bits ?? 0)
      : formatCurrency(0)
  }, [states.user])

  if (props.onlyLogo) {
    return (
      <div className="flex flex-row items-center px-4 py-8">
        <button
          onClick={functions.goBack}
          className="flex h-10 w-10 items-center justify-center"
        >
          <FaArrowLeft className="h-5 w-5 text-bitrush-neutral-0" />
        </button>

        <Link to="/" className="mx-auto">
          <CustomIcon.Logo />
        </Link>

        <div className="w-10" />
      </div>
    )
  }

  const navOpenStyles =
    'block absolute w-full h-full z-10 left-0 top-0 bg-bitrush-neutral-850'

  const logoPosition = !isLoggedIn
    ? 'top-[16px]'
    : states.lastGameResult !== null
      ? 'top-[30px]'
      : 'top-[24px]'

  const titlePosition = !isLoggedIn
    ? 'top-[16px]'
    : states.lastGameResult !== null
      ? 'top-[24px]'
      : 'top-[16px]'

  return (
    <div className=" flex flex-row items-center justify-between py-4">
      <nav>
        <section className="flex">
          <div className="space-y-2" onClick={functions.toggleMobileNav}>
            {constants.showHamburguer ? (
              <img src="hamburguer.svg" alt="hamburguer" className="h-5 w-6" />
            ) : (
              <CustomIcon.ArrowBack className="h-5 w-6 fill-bitrush-neutral-0" />
            )}
          </div>

          <div
            className={
              states.isMobileNavOpen ? `${navOpenStyles} z-20` : 'hidden'
            }
          >
            <div
              className="flex items-center justify-between p-4 pt-4"
              onClick={functions.closeMobileNav}
            >
              <CustomIcon.ArrowBack className="h-5 w-6 fill-bitrush-neutral-0" />

              <div
                className={`absolute left-1/2 -translate-x-1/2 ${logoPosition}`}
              >
                <CustomIcon.Logo />
              </div>
              <RenderIf isTrue={states.isLoggedIn}>
                <div className="flex flex-col items-end text-bitrush-neutral-0">
                  {states.lastGameResult === 'win' ? (
                    <FaRegArrowAltCircleUp className="size-3 text-bitrush-green-500" />
                  ) : states.lastGameResult === 'lose' ? (
                    <FaRegArrowAltCircleDown className="size-3 text-bitrush-red-500" />
                  ) : null}

                  <div className="flex flex-col items-end">
                    <span className="typography-xs font-bold">
                      {states.user ? formattedRush : 0}
                    </span>
                    <span className="typography-xs"> RUSH</span>
                  </div>
                </div>
              </RenderIf>
            </div>
            <ul className="flex flex-col gap-10 p-8 text-bitrush-blue-100">
              {constants.links.map((link) => (
                <li className="mr-[3.2vh]" key={link.name}>
                  <Link
                    to={link.to}
                    className="text-bitrush-white typography-h1 flex flex-row items-center gap-6 font-light"
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </nav>

      {states.showTitleInsteadOfLogo ? (
        <div className={`absolute left-1/2 -translate-x-1/2 ${titlePosition}`}>
          <p className="typography-h1 capitalize text-white">
            {constants.pathnameNormalized}
          </p>
        </div>
      ) : (
        <Link to="/">
          <CustomIcon.Logo
            className={`absolute left-1/2 -translate-x-1/2 ${logoPosition}`}
          />
        </Link>
      )}

      <div className="text-bitrush-neutral-0">
        <RenderIf isTrue={states.isLoggedIn}>
          <div className="flex flex-col items-end">
            {states.lastGameResult === 'win' ? (
              <FaRegArrowAltCircleUp className="size-3 text-bitrush-green-500" />
            ) : states.lastGameResult === 'lose' ? (
              <FaRegArrowAltCircleDown className="size-3 text-bitrush-red-500" />
            ) : null}

            <div className="flex flex-col items-end">
              <span className="typography-xs font-bold">
                {states.user ? formattedRush : 0}
              </span>
              <span className="typography-xs"> RUSH</span>
            </div>
          </div>
        </RenderIf>
      </div>
    </div>
  )
}
