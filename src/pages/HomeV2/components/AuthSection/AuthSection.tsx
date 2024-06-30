import { Link, useNavigate } from 'react-router-dom'

import Button from '@/components/Button/Button'
import { Card } from '@/components/Card'
import CustomIcon from '@/components/CustomIcon/CustomIcon'

const AuthSection = () => {
  const navigate = useNavigate()

  const handleCreateAccount = () => {
    navigate('/affiliate-code')
  }

  return (
    <Card.Container className="lg:h-full">
      <div className="thin-scrollbar flex h-full flex-col overflow-y-scroll">
        <Card.Content className="flex flex-1 place-items-center">
          <div className="mb-6 flex flex-1 flex-col lg:mb-0 lg:text-center">
            <CustomIcon.UserBlock className="icon-title2lg mb-5 hidden self-center fill-white lg:block" />
            <p className="typography-h1 font-bold text-bitrush-neutral-0">
              You need an account to
            </p>
            <p className="typography-h1 font-bold text-bitrush-neutral-0">
              play Crashouse
            </p>
          </div>
        </Card.Content>
        <Card.Footer>
          <Button
            variant="play"
            label="Create an account"
            size="large"
            onClick={handleCreateAccount}
          />

          <div className="flex flex-col justify-items-center gap-2 pt-8 text-center">
            <p className="typography-xs font-thin text-bitrush-neutral-0">
              You already have an account?
            </p>
            <Link
              to="/login"
              className="typography-sm cursor-pointer text-bitrush-blue-500 hover:underline"
            >
              Login
            </Link>
          </div>
        </Card.Footer>
      </div>
    </Card.Container>
  )
}

export default AuthSection
