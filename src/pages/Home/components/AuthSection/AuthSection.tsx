import { Link, useNavigate } from 'react-router-dom'

import Button from '@/components/Button/Button'
import { Card } from '@/components/Card'

const AuthSection = () => {
  const navigate = useNavigate()

  const handleCreateAccount = () => {
    navigate('/signup')
  }

  return (
    <Card.Container>
      <div className="thin-scrollbar flex h-full flex-col overflow-y-scroll">
        <Card.Content className="flex flex-1 place-items-center">
          <div className="flex flex-1 flex-col text-center">
            <img src="user-block.svg" alt="user" className="mb-5 h-8" />
            <p className="text-xl text-bitrush-neutral-0">
              You need an account
            </p>
            <p className="text-xl text-bitrush-neutral-0">to play Bitrush</p>
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
