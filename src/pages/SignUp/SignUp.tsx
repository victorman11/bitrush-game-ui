import { motion } from 'framer-motion'

import { LayoutUnauthorized } from '@/components'

import { EmailVerification } from './components/EmailVerification'
import { SignUpForm } from './components/Form/SignUpForm'
import Step from './components/Step/component'

const fadeInLeft = {
  hidden: { opacity: 0, translateX: -50 },
  show: { opacity: 1, translateX: 0, transition: { duration: 0.3 } },
}

const fadeInRight = {
  hidden: { opacity: 0, translateX: 50 },
  show: { opacity: 1, translateX: 0, transition: { duration: 0.3 } },
}

function SignUp() {
  return (
    <LayoutUnauthorized>
      <Step>
        <motion.div
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={fadeInLeft}
        >
          <SignUpForm />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={fadeInRight}
        >
          <EmailVerification />
        </motion.div>
      </Step>
    </LayoutUnauthorized>
  )
}

export default SignUp
