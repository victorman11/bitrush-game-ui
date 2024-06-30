import { ComponentProps } from 'react'

type Props = ComponentProps<'svg'>

const WalletIcon = (props: Props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0.75 1H0V1.75V14.25V15H0.75H15.25H16V14.25V4.75V4H15.25H3.75H3V5.5H3.75H14.5V13.5H1.5V2.5H14.25H15V1H14.25H0.75ZM12 10.5C12.2652 10.5 12.5196 10.3946 12.7071 10.2071C12.8946 10.0196 13 9.76522 13 9.5C13 9.23478 12.8946 8.98043 12.7071 8.79289C12.5196 8.60536 12.2652 8.5 12 8.5C11.7348 8.5 11.4804 8.60536 11.2929 8.79289C11.1054 8.98043 11 9.23478 11 9.5C11 9.76522 11.1054 10.0196 11.2929 10.2071C11.4804 10.3946 11.7348 10.5 12 10.5Z" />
    </svg>
  )
}

const NetworkIcon = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800px"
      height="800px"
      viewBox="0 0 800 800"
      enableBackground="new 0 0 800 800"
      xmlSpace="preserve"
      {...props}
    >
      <path
        d="M712.727,0c-48.131,0-87.273,39.142-87.273,87.273c0,15.055,3.825,29.222,10.56,41.6L493.047,271.84
   c-19.709-15.345-44.378-24.567-71.229-24.567s-51.52,9.222-71.244,24.553L239.025,160.276c5.12-8.655,8.247-18.604,8.247-29.367
   c0-32.087-26.095-58.182-58.182-58.182s-58.182,26.095-58.182,58.182s26.095,58.182,58.182,58.182
   c10.764,0,20.713-3.127,29.367-8.247l111.549,111.549c-15.331,19.724-24.553,44.393-24.553,71.244s9.222,51.52,24.553,71.229
   L145.804,619.084c-15.505-14.065-36-22.72-58.531-22.72C39.142,596.364,0,635.505,0,683.636c0,48.131,39.142,87.273,87.273,87.273
   s87.273-39.142,87.273-87.273c0-15.055-3.825-29.222-10.56-41.6l186.604-186.604c16.087,12.509,35.491,20.887,56.698,23.549v147.782
   c-41.207,6.953-72.727,42.793-72.727,85.964c0,48.131,39.142,87.273,87.273,87.273s87.273-39.142,87.273-87.273
   c0-43.156-31.52-78.996-72.727-85.964V478.982c21.207-2.662,40.611-11.04,56.698-23.549l111.549,111.549
   c-5.135,8.669-8.262,18.618-8.262,29.382c0,32.087,26.095,58.182,58.182,58.182s58.182-26.095,58.182-58.182
   s-26.095-58.182-58.182-58.182c-10.764,0-20.713,3.127-29.367,8.247L513.629,434.88c15.331-19.724,24.553-44.393,24.553-71.244
   s-9.222-51.52-24.553-71.229l140.582-140.582c15.491,14.065,35.985,22.72,58.516,22.72c48.131,0,87.273-39.142,87.273-87.273
   S760.858,0,712.727,0z"
      />
    </svg>
  )
}

const StatsIcon = (props: Props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_578_5306)">
        <path d="M8.57143 1.71429V14.2857H7.42857V1.71429H8.57143ZM7.42857 0H5.71429V1.71429V14.2857V16H7.42857H8.57143H10.2857V14.2857V1.71429V0H8.57143H7.42857ZM2.85714 8.57143V14.2857H1.71429V8.57143H2.85714ZM1.71429 6.85714H0V8.57143V14.2857V16H1.71429H2.85714H4.57143V14.2857V8.57143V6.85714H2.85714H1.71429ZM13.1429 4H14.2857V14.2857H13.1429V4ZM11.4286 2.28571V4V14.2857V16H13.1429H14.2857H16V14.2857V4V2.28571H14.2857H13.1429H11.4286Z" />
      </g>
      <defs>
        <clipPath id="clip0_578_5306">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

const UserIcon = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="24"
      viewBox="0 0 22 24"
      fill="none"
      {...props}
    >
      <path d="M14.75 6C14.75 5.00544 14.3549 4.05161 13.6517 3.34835C12.9484 2.64509 11.9946 2.25 11 2.25C10.0054 2.25 9.05161 2.64509 8.34835 3.34835C7.64509 4.05161 7.25 5.00544 7.25 6C7.25 6.99456 7.64509 7.94839 8.34835 8.65165C9.05161 9.35491 10.0054 9.75 11 9.75C11.9946 9.75 12.9484 9.35491 13.6517 8.65165C14.3549 7.94839 14.75 6.99456 14.75 6ZM5 6C5 4.4087 5.63214 2.88258 6.75736 1.75736C7.88258 0.632141 9.4087 0 11 0C12.5913 0 14.1174 0.632141 15.2426 1.75736C16.3679 2.88258 17 4.4087 17 6C17 7.5913 16.3679 9.11742 15.2426 10.2426C14.1174 11.3679 12.5913 12 11 12C9.4087 12 7.88258 11.3679 6.75736 10.2426C5.63214 9.11742 5 7.5913 5 6ZM3.54688 21.75H18.4531L16.8359 16.5H5.16406L3.54688 21.75ZM3.5 14.25H18.5L20.8063 21.75L21.5 24H19.1469H2.85313H0.5L1.19375 21.75L3.5 14.25Z" />
    </svg>
  )
}

const SettingsIcon = (props: Props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_578_5315)">
        <path d="M10.2371 0L10.6905 2.0875C11.06 2.25938 11.4139 2.4625 11.74 2.7L13.7644 2.05L16 5.94688L14.4289 7.3875C14.4475 7.5875 14.4568 7.79062 14.4568 7.99687C14.4568 8.20312 14.4475 8.40625 14.4289 8.60625L16 10.0469L13.7644 13.9438L11.74 13.2937C11.4108 13.5281 11.06 13.7344 10.6905 13.9062L10.2371 16H5.76596L5.31263 13.9125C4.94314 13.7406 4.58917 13.5375 4.26315 13.3L2.23559 13.95L0 10.0531L1.57112 8.6125C1.55249 8.4125 1.54318 8.20938 1.54318 8.00313C1.54318 7.79688 1.55249 7.59375 1.57112 7.39375L0 5.95L2.23559 2.05312L4.26004 2.70312C4.58917 2.46875 4.94003 2.2625 5.30953 2.09063L5.76596 0H10.2371ZM12.1933 4.13125L11.4822 4.35938L10.8768 3.925C10.6222 3.74375 10.352 3.58437 10.0695 3.45312L9.39259 3.14062L9.23423 2.40937L9.03862 1.5H6.96449L6.76577 2.40937L6.60741 3.14062L5.93053 3.45312C5.64487 3.58437 5.37473 3.74375 5.12323 3.925L4.51776 4.35938L3.80982 4.13125L2.928 3.85L1.89094 5.65312L2.57403 6.28125L3.12362 6.78438L3.05531 7.52812C3.03978 7.68437 3.03357 7.84062 3.03357 8C3.03357 8.15938 3.03978 8.31563 3.05531 8.47188L3.12362 9.21562L2.57403 9.71875L1.89094 10.3469L2.928 12.1531L3.80982 11.8719L4.52086 11.6438L5.12633 12.0781C5.38094 12.2594 5.65108 12.4187 5.93363 12.55L6.61052 12.8625L6.76887 13.5938L6.96759 14.5031H9.03862L9.23734 13.5938L9.39569 12.8625L10.0726 12.55C10.3582 12.4187 10.6284 12.2594 10.8799 12.0781L11.4853 11.6438L12.1964 11.8719L13.0782 12.1531L14.1153 10.3469L13.4291 9.71875L12.8795 9.21562L12.9478 8.47188C12.9633 8.31563 12.9695 8.15938 12.9695 8C12.9695 7.84062 12.9633 7.68437 12.9478 7.52812L12.8795 6.78438L13.4291 6.28125L14.1153 5.65312L13.0782 3.84687L12.1964 4.12813L12.1933 4.13125ZM9.49195 8C9.49195 7.60218 9.33492 7.22064 9.05542 6.93934C8.77592 6.65804 8.39683 6.5 8.00155 6.5C7.60628 6.5 7.22719 6.65804 6.94768 6.93934C6.66818 7.22064 6.51116 7.60218 6.51116 8C6.51116 8.39782 6.66818 8.77936 6.94768 9.06066C7.22719 9.34196 7.60628 9.5 8.00155 9.5C8.39683 9.5 8.77592 9.34196 9.05542 9.06066C9.33492 8.77936 9.49195 8.39782 9.49195 8ZM5.02076 8C5.02076 7.20435 5.33481 6.44129 5.89382 5.87868C6.45282 5.31607 7.211 5 8.00155 5C8.79211 5 9.55028 5.31607 10.1093 5.87868C10.6683 6.44129 10.9823 7.20435 10.9823 8C10.9823 8.79565 10.6683 9.55871 10.1093 10.1213C9.55028 10.6839 8.79211 11 8.00155 11C7.211 11 6.45282 10.6839 5.89382 10.1213C5.33481 9.55871 5.02076 8.79565 5.02076 8Z" />
      </g>
      <defs>
        <clipPath id="clip0_578_5315">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

const TrophyIcon = (props: Props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M8.66667 11.6801C8.77778 11.6364 8.9 11.5817 9.03056 11.5133C9.96944 11.3493 11.6833 10.9118 13.1833 9.77153C14.725 8.59849 16 6.7063 16 3.7395V3.08325H15.3333H12.4C12.4083 2.94106 12.4139 2.79341 12.4194 2.64575C12.4361 2.22739 12.4444 1.78989 12.4444 1.33325H11.1111H4.88889H3.55556C3.55556 1.78989 3.56389 2.22739 3.58056 2.64575C3.58611 2.79341 3.59167 2.94106 3.6 3.08325H0.666667H0V3.7395C0 6.7063 1.275 8.59849 2.81944 9.77153C4.31667 10.9118 6.03333 11.3465 6.97222 11.5133C7.10278 11.5817 7.225 11.6364 7.33611 11.6801V14.0208H5.11111H4.44444V15.3333H5.11111H8H10.8889H11.5556V14.0208H10.8889H8.66667V11.6801ZM12.3667 8.73247C11.8806 9.10435 11.3583 9.38872 10.8556 9.60747C11.4861 8.50552 12.0444 6.85942 12.2972 4.39575H14.6417C14.475 6.5395 13.4944 7.87661 12.3667 8.73247ZM1.35833 4.39575H3.70278C3.95556 6.85942 4.51389 8.50552 5.14444 9.60747C4.64167 9.38872 4.12222 9.10435 3.63333 8.73247C2.50556 7.87661 1.525 6.5395 1.35833 4.39575ZM4.91389 2.64575H11.0861C10.9167 6.83208 9.95278 8.78989 9.19722 9.6813C8.78889 10.1653 8.41667 10.3649 8.19722 10.4524C8.11111 10.4852 8.04167 10.5043 7.99722 10.5153C7.95278 10.5071 7.88333 10.4879 7.79722 10.4524C7.57778 10.3676 7.20833 10.1653 6.79722 9.6813C6.04722 8.78989 5.08333 6.83208 4.91389 2.64575Z" />
    </svg>
  )
}

const UserBlock = (props: Props) => {
  return (
    <svg viewBox="0 0 56 46" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M19.6 18.8C21.4565 18.8 23.237 18.0625 24.5497 16.7497C25.8625 15.437 26.6 13.6565 26.6 11.8C26.6 9.94346 25.8625 8.16298 24.5497 6.85023C23.237 5.53747 21.4565 4.79997 19.6 4.79997C17.7435 4.79997 15.963 5.53747 14.6503 6.85023C13.3375 8.16298 12.6 9.94346 12.6 11.8C12.6 13.6565 13.3375 15.437 14.6503 16.7497C15.963 18.0625 17.7435 18.8 19.6 18.8ZM19.6 0.599976C22.5704 0.599976 25.4192 1.77997 27.5196 3.88038C29.62 5.98079 30.8 8.82955 30.8 11.8C30.8 14.7704 29.62 17.6192 27.5196 19.7196C25.4192 21.82 22.5704 23 19.6 23C16.6296 23 13.7808 21.82 11.6804 19.7196C9.58 17.6192 8.4 14.7704 8.4 11.8C8.4 8.82955 9.58 5.98079 11.6804 3.88038C13.7808 1.77997 16.6296 0.599976 19.6 0.599976ZM8.70625 31.4L5.6875 41.2H28H33.5125H33.6V45.4H4.3925H0L1.295 41.2L5.6 27.2H33.6V31.4H30.4937H28H8.70625ZM46.2 21.6C44.6512 21.6 43.4 22.8512 43.4 24.4V28.6H49V24.4C49 22.8512 47.7487 21.6 46.2 21.6ZM39.2 24.4C39.2 20.5325 42.3325 17.4 46.2 17.4C50.0675 17.4 53.2 20.5325 53.2 24.4V28.6H56V45.4H36.4V28.6H39.2V24.4Z" />
    </svg>
  )
}

const ChatBubbles = (props: Props) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M7.87976 18.0385C7.17704 17.7854 6.39469 17.8932 5.79036 18.3384C5.40621 18.6196 4.74566 19.032 3.94456 19.4023C4.20691 18.7133 4.40835 17.9354 4.47394 17.0871C4.52079 16.4826 4.31934 15.8827 3.92114 15.4235C2.82959 14.1909 2.24868 12.7475 2.24868 11.2478C2.24868 7.52209 6.15108 3.7495 11.993 3.7495C17.8349 3.7495 21.7373 7.52209 21.7373 11.2478C21.7373 14.9736 17.8349 18.7462 11.993 18.7462C10.5126 18.7462 9.12122 18.4884 7.87976 18.0385ZM1.23209 19.8615C1.15713 19.9881 1.07749 20.1146 0.993168 20.2411L0.979114 20.2646C0.904158 20.3723 0.829202 20.4801 0.754246 20.5879C0.590279 20.8082 0.412258 21.0238 0.224868 21.2206C0.00936952 21.4362 -0.0515323 21.7549 0.0655866 22.036C0.182705 22.3172 0.454421 22.5 0.75893 22.5C0.997853 22.5 1.23678 22.4859 1.4757 22.4625L1.50849 22.4578C1.71462 22.4344 1.92075 22.4063 2.12688 22.3688C2.16436 22.3641 2.20183 22.3547 2.23931 22.3453C3.0732 22.1813 3.87429 21.9001 4.58638 21.5908C5.65918 21.1222 6.57271 20.5645 7.1302 20.1568C8.61995 20.6957 10.269 20.9956 12.007 20.9956C18.6313 20.9956 24 16.6326 24 11.2478C24 5.86309 18.6172 1.5 11.993 1.5C5.36873 1.5 0 5.86309 0 11.2478C0 13.3614 0.829202 15.3157 2.23463 16.9137C2.14562 18.0619 1.70057 19.0836 1.23209 19.8615ZM6.74605 12.7475C7.14364 12.7475 7.52495 12.5895 7.80609 12.3082C8.08723 12.027 8.24517 11.6456 8.24517 11.2478C8.24517 10.8501 8.08723 10.4686 7.80609 10.1874C7.52495 9.90616 7.14364 9.74816 6.74605 9.74816C6.34846 9.74816 5.96715 9.90616 5.68601 10.1874C5.40487 10.4686 5.24693 10.8501 5.24693 11.2478C5.24693 11.6456 5.40487 12.027 5.68601 12.3082C5.96715 12.5895 6.34846 12.7475 6.74605 12.7475ZM13.4921 11.2478C13.4921 10.8501 13.3342 10.4686 13.053 10.1874C12.7719 9.90616 12.3906 9.74816 11.993 9.74816C11.5954 9.74816 11.2141 9.90616 10.9329 10.1874C10.6518 10.4686 10.4939 10.8501 10.4939 11.2478C10.4939 11.6456 10.6518 12.027 10.9329 12.3082C11.2141 12.5895 11.5954 12.7475 11.993 12.7475C12.3906 12.7475 12.7719 12.5895 13.053 12.3082C13.3342 12.027 13.4921 11.6456 13.4921 11.2478ZM17.2399 12.7475C17.6375 12.7475 18.0188 12.5895 18.2999 12.3082C18.5811 12.027 18.739 11.6456 18.739 11.2478C18.739 10.8501 18.5811 10.4686 18.2999 10.1874C18.0188 9.90616 17.6375 9.74816 17.2399 9.74816C16.8423 9.74816 16.461 9.90616 16.1799 10.1874C15.8987 10.4686 15.7408 10.8501 15.7408 11.2478C15.7408 11.6456 15.8987 12.027 16.1799 12.3082C16.461 12.5895 16.8423 12.7475 17.2399 12.7475Z" />
    </svg>
  )
}

const ArrowBack = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="22"
      viewBox="0 0 24 22"
      fill="none"
      {...props}
    >
      <path d="M0.91316 11.9159L0 11.0028L0.91316 10.0896L9.16383 1.83894L10.077 0.925781L11.8979 2.74673L10.9848 3.65989L4.93644 9.71361H22.7108H24V12.2919H22.7108H4.93644L10.9902 18.3403L11.9033 19.2534L10.0824 21.0744L9.1692 20.1612L0.91316 11.9159Z" />
    </svg>
  )
}

const Logo = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="167"
      height="20"
      x="0"
      y="0"
      version="1.1"
      viewBox="0 0 167 20"
      xmlSpace="preserve"
      {...props}
    >
      <path
        fill="#FFF"
        d="M166 9.795h-12.452v1.348H166V9.795zm0-8.724h-12.452v1.348H166V1.071zm0 18.797h-12.452V18.52H166v1.348zm-25.204-.053c.67.123 1.349.185 2.036.185 1.163 0 2.168-.132 3.014-.397.846-.264 1.542-.617 2.089-1.057.564-.458.978-.987 1.242-1.586a4.59 4.59 0 00.397-1.877c0-.846-.168-1.542-.502-2.088a3.878 3.878 0 00-1.295-1.375 7.522 7.522 0 00-1.851-.899 26.525 26.525 0 00-2.115-.608 300.99 300.99 0 01-2.089-.529 9.86 9.86 0 01-1.851-.714c-.547-.282-.987-.634-1.322-1.057-.317-.441-.476-.996-.476-1.666 0-.494.097-.961.291-1.401.212-.441.52-.82.925-1.137.423-.335.952-.59 1.586-.767.652-.194 1.419-.291 2.3-.291.846 0 1.701.132 2.565.397a8.775 8.775 0 012.512 1.163l.555-1.216c-.723-.529-1.586-.934-2.591-1.216-.987-.3-2.001-.449-3.04-.449-1.146 0-2.141.141-2.988.423-.828.264-1.515.626-2.062 1.084a4.254 4.254 0 00-1.19 1.56 4.606 4.606 0 00-.396 1.877c0 .864.158 1.578.476 2.141a4.358 4.358 0 001.322 1.401c.546.37 1.163.67 1.85.899.688.211 1.384.405 2.089.582.723.176 1.428.361 2.115.555a8.79 8.79 0 011.851.687c.546.282.978.643 1.295 1.084.335.423.502.969.502 1.639 0 .494-.106.952-.317 1.375-.194.423-.502.793-.925 1.11-.423.317-.969.573-1.639.767-.652.176-1.428.264-2.327.264a9.304 9.304 0 01-3.516-.661c-1.093-.441-1.956-.987-2.591-1.639l-.661 1.163c.335.37.749.705 1.242 1.005.493.3 1.031.555 1.613.767.599.211 1.225.379 1.877.502zM124.801 20c-2.309 0-4.133-.67-5.473-2.009-1.322-1.34-1.983-3.331-1.983-5.975V1.361h1.507v10.575c0 2.291.511 3.983 1.533 5.076 1.04 1.075 2.52 1.613 4.441 1.613 1.904 0 3.366-.538 4.389-1.613 1.04-1.093 1.56-2.785 1.56-5.076V1.361h1.507v10.654c0 2.644-.67 4.635-2.009 5.975-1.321 1.34-3.145 2.01-5.472 2.01zm-24.848-.714c1.181.476 2.459.714 3.834.714 1.374 0 2.652-.238 3.833-.714a9.525 9.525 0 003.067-1.956 8.635 8.635 0 002.009-2.961c.493-1.163.74-2.415.74-3.754 0-1.357-.247-2.609-.74-3.754a8.65 8.65 0 00-2.009-2.961 9.525 9.525 0 00-3.067-1.956c-1.181-.476-2.459-.714-3.833-.714-1.375 0-2.653.238-3.834.714S97.75 3.072 96.886 3.9a8.964 8.964 0 00-2.036 2.961c-.476 1.146-.714 2.397-.714 3.754 0 1.34.238 2.591.714 3.754a8.949 8.949 0 002.036 2.961 9.525 9.525 0 003.067 1.956zm7.058-1.269c-.987.405-2.062.608-3.225.608-1.163 0-2.238-.203-3.226-.608a8.267 8.267 0 01-2.591-1.666 7.808 7.808 0 01-1.692-2.538c-.406-.987-.608-2.053-.608-3.199s.203-2.203.608-3.173a7.444 7.444 0 011.692-2.538 8.029 8.029 0 012.591-1.692c.987-.405 2.062-.608 3.226-.608 1.163 0 2.238.203 3.225.608a7.737 7.737 0 012.565 1.692 7.27 7.27 0 011.718 2.538c.406.969.608 2.027.608 3.173a8.344 8.344 0 01-.608 3.199 7.617 7.617 0 01-1.718 2.538 7.96 7.96 0 01-2.565 1.666zM88.546 9.795V1.361h1.507v18.506h-1.507v-8.724h-5.183v2.528H81.71v-2.528h-5.326v8.724h-1.507V1.361h1.507v8.434h5.326V7.062h1.653v2.733h5.183zm-26.42 10.02c.67.123 1.348.185 2.035.185 1.163 0 2.168-.132 3.014-.397.846-.264 1.542-.617 2.088-1.057.564-.458.978-.987 1.243-1.586a4.606 4.606 0 00.396-1.877c0-.846-.168-1.542-.502-2.088a3.878 3.878 0 00-1.295-1.375 7.504 7.504 0 00-1.851-.899 26.525 26.525 0 00-2.115-.608 300.99 300.99 0 01-2.089-.529 9.86 9.86 0 01-1.851-.714c-.546-.282-.987-.634-1.322-1.057-.317-.441-.476-.996-.476-1.666 0-.494.097-.961.291-1.401.212-.441.52-.82.925-1.137.423-.335.952-.59 1.586-.767.652-.194 1.419-.291 2.3-.291.846 0 1.701.132 2.565.397a8.775 8.775 0 012.512 1.163l.555-1.216c-.723-.529-1.586-.934-2.591-1.216-.987-.3-2.001-.449-3.04-.449-1.146 0-2.141.141-2.987.423-.829.264-1.516.626-2.062 1.084a4.254 4.254 0 00-1.19 1.56 4.606 4.606 0 00-.396 1.877c0 .864.158 1.578.476 2.141a4.358 4.358 0 001.322 1.401c.546.37 1.163.67 1.851.899.687.211 1.384.405 2.089.582.723.176 1.428.361 2.115.555a8.79 8.79 0 011.851.687c.546.282.978.643 1.295 1.084.335.423.502.969.502 1.639 0 .494-.106.952-.317 1.375-.194.423-.502.793-.925 1.11-.423.317-.97.573-1.639.767-.652.176-1.428.264-2.327.264a9.304 9.304 0 01-3.516-.661c-1.093-.441-1.956-.987-2.591-1.639l-.661 1.163c.335.37.749.705 1.242 1.005.493.3 1.031.555 1.613.767.599.211 1.225.379 1.877.502zm-22.551.053h-1.613l8.513-18.506h1.507l8.513 18.506h-1.639L47.216 3l-7.641 16.868zm-4.302 0h1.718l-4.6-6.451c1.375-.405 2.432-1.102 3.172-2.089.758-.987 1.137-2.221 1.137-3.701 0-.987-.176-1.868-.529-2.644a5.066 5.066 0 00-1.48-1.956c-.634-.546-1.419-.961-2.353-1.243-.917-.282-1.956-.423-3.12-.423h-6.715v1.348h6.715c1.939 0 3.41.432 4.415 1.295 1.022.846 1.533 2.053 1.533 3.622 0 1.551-.511 2.758-1.533 3.622-1.005.864-2.476 1.295-4.415 1.295h-6.715v7.323h1.507v-6.001h5.208c.3 0 .59-.009.872-.026.282-.018.555-.044.82-.079l4.363 6.108zM11.961 20c-1.375 0-2.653-.238-3.833-.714-1.163-.476-2.177-1.128-3.04-1.956s-1.542-1.815-2.036-2.961c-.476-1.163-.714-2.415-.714-3.754 0-1.357.238-2.609.714-3.754.494-1.146 1.172-2.133 2.036-2.961s1.877-1.48 3.04-1.956c1.181-.476 2.459-.714 3.833-.714 1.322 0 2.556.22 3.701.661a7.77 7.77 0 012.961 1.93l-.978.978c-.793-.793-1.666-1.357-2.617-1.692a8.863 8.863 0 00-3.014-.502 8.619 8.619 0 00-3.252.608 7.72 7.72 0 00-2.565 1.691 7.792 7.792 0 00-1.718 2.538c-.405.969-.608 2.027-.608 3.173s.203 2.212.608 3.199a8.193 8.193 0 001.718 2.538 7.982 7.982 0 002.564 1.666 8.619 8.619 0 003.252.608c1.075 0 2.08-.167 3.014-.502.952-.352 1.824-.925 2.617-1.718l.978.978a7.904 7.904 0 01-2.961 1.983c-1.145.421-2.379.633-3.7.633z"
      />
    </svg>
  )
}

const CustomIcon = {
  ChatBubbles,
  NetworkIcon,
  SettingsIcon,
  StatsIcon,
  TrophyIcon,
  UserIcon,
  UserBlock,
  WalletIcon,
  ArrowBack,
  Logo,
}

export default CustomIcon
