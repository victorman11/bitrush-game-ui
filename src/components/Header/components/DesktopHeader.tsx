import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import CustomIcon from '@/components/CustomIcon/CustomIcon'
import RenderIf from '@/components/RenderIf/RenderIf'
import { formatCurrency } from '@/helpers/numbers.ts'

import useHeader from '../useHeader'

type Props = {
  onlyLogo?: boolean
}

export default function DesktopHeader({ onlyLogo = false }: Props) {
  const { constants, states } = useHeader({ isMobile: false })

  if (onlyLogo) {
    return (
      <div className="flex flex-row py-8">
        <Link to="/" className="mx-auto">
          <CustomIcon.Logo className="h-[1.95vw] w-[11.6vw]" />
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-row items-center justify-between py-[1.95vh] 2xl:py-[2.34vh]">
      <div className="flex flex-row items-center">
        <Link to="/" className="mr-10">
          {/* <img src="logo.svg" alt="logo" className="h-[1.95vw] w-[11.6vw]" /> */}
          <CustomIcon.Logo className="h-[1.95vw] w-[11.6vw]" />
        </Link>
        <nav className="flex flex-row">
          <ul className="flex text-bitrush-neutral-0">
            {constants.links.map((link) => (
              <li className="mr-[3.2vh]" key={link.name}>
                <Link
                  to={link.to}
                  className="typography-sm flex flex-row items-center justify-center gap-2 font-light text-bitrush-blue-100"
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="text-bitrush-neutral-0">
        <RenderIf isTrue={states.isLoggedIn}>
          <div className="flex flex-row items-center gap-1">
            {states.lastGameResult === 'win' ? (
              <FaRegArrowAltCircleUp className="text-bitrush-green-500" />
            ) : states.lastGameResult === 'lose' ? (
              <FaRegArrowAltCircleDown className="text-bitrush-red-500" />
            ) : null}

            <p className="typography-xs">
              <span className="font-bold">
                {states.user
                  ? formatCurrency(states.user.bits ?? 0)
                  : formatCurrency(0)}
              </span>
              <span className="typography-xs"> RUSH</span>
            </p>
          </div>
        </RenderIf>
      </div>
    </div>
  )
}
