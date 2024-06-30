const passwordRegex = /^(?=.[A-Z])(?=.\d).{8,}$/
const usernameRegex = /[^a-zA-Z0-9]/g
// const decimalNumberRegex = /^\d+(\.\d+)?$/;
const decimalNumberRegex = /^\d*\.?\d+$/

export { decimalNumberRegex, passwordRegex, usernameRegex }
