export const useStrrPlatformRegistration = defineStore('strr/platformRegistration', () => {
  const { $strrApi } = useNuxtApp()
  const { primaryRep, secondaryRep } = storeToRefs(useStrrPlatformContact())
  const { platformBusiness } = storeToRefs(useStrrPlatformBusiness())
  const { platformDetails } = storeToRefs(useStrrPlatformDetails())

  const registration = ref<PlatformRegistrationPayload | undefined>(undefined)

  async function loadRegistration (regId: string) {
    registration.value = await $strrApi(`/registrations/${regId}`, { method: 'GET' }) as PlatformRegistrationPayload

    if (registration.value.platformRepresentatives[0]) {
      primaryRep.value = formatRepresentativeUI(registration.value.platformRepresentatives[0])
    }
    if (registration.value.platformRepresentatives[1]) {
      secondaryRep.value = formatRepresentativeUI(registration.value.platformRepresentatives[1])
    }
    platformBusiness.value = formatBusinessDetailsUI(registration.value.businessDetails)
    platformDetails.value = registration.value.platformDetails
  }

  return {
    registration,
    loadRegistration
  }
})
