import { create } from 'zustand'

type SignUpStepStore = {
  currentStep: number
  formData: Record<string, unknown>
  nextStep: () => void
  previousStep: () => void
  updateFormData: (newData: Record<string, unknown>) => void
  resetForm: () => void
}

// Definindo o estado inicial do formulário
const initialState = {
  currentStep: 1,
  formData: {},
}

export const useStepFormStore = create<SignUpStepStore>((set) => ({
  ...initialState,
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  previousStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  updateFormData: (newData: Record<string, unknown>) =>
    set((state) => ({ formData: { ...state.formData, ...newData } })),
  resetForm: () => set({ ...initialState }),
}))

export const useCurrentStep = () => {
  return useStepFormStore((state) => state.currentStep)
}

export const useStepFormData = () => {
  return useStepFormStore((state) => state.formData)
}

export const useStepFormDataHandler = () => {
  const updateFormData = useStepFormStore((state) => state.updateFormData)
  const resetFormData = useStepFormStore((state) => state.resetForm)

  return {
    updateFormData,
    resetFormData,
  }
}

export const useStepHandler = () => {
  const nextStep = useStepFormStore((state) => state.nextStep)
  const previousStep = useStepFormStore((state) => state.previousStep)

  return {
    nextStep,
    previousStep,
  }
}
