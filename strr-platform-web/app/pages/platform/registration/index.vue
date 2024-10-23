<script setup lang="ts">
const { t } = useI18n()

const regId = useRouter().currentRoute.value.params.registrationId as string

const { loading, title, subtitles, bottomButtons, sideDetails } = storeToRefs(useConnectDetailsHeaderStore())
const { loadRegistration } = useStrrPlatformRegistration()
const { primaryRep, secondaryRep } = storeToRefs(useStrrPlatformContact())
const { platformBusiness } = storeToRefs(useStrrPlatformBusiness())
const { platformDetails } = storeToRefs(useStrrPlatformDetails())

const addresses = ref<ConnectAccordionItem[]>([])
const representatives = ref<ConnectAccordionItem[]>([])

onMounted(async () => {
  loading.value = true
  if (!regId) {
    navigateTo({ name: PageName.PLAT_DASHBOARD })
    return
  }
  await loadRegistration(regId)
  await new Promise((resolve) => { setTimeout(resolve, 1000) })
  // set header stuff
  title.value = platformBusiness.value.legalName
  subtitles.value = [
    // TODO: pending - remove Canada as this could be international?
    `${platformBusiness.value.homeJurisdiction} Canada`,
    t(`platform.label.listingSize.${platformDetails.value.listingSize}`)
  ]
  // TODO: update button actions
  bottomButtons.value = [
    {
      action: () => { console.info('View and Change') },
      label: 'View and Change Platform Information',
      icon: 'i-mdi-file-document-edit-outline'
    },
    // TODO: pending - remove as platforms won't have a certificate
    {
      action: () => { console.info('Certificate') },
      label: 'Certificate',
      icon: 'i-mdi-file-download-outline'
    },
    {
      action: () => { console.info('Receipt') },
      label: 'Receipt',
      // TODO: find/replace with correct icon
      icon: 'i-mdi-file-download-outline'
    }
  ]
  sideDetails.value = [
    { label: t('label.busNum'), value: platformBusiness.value.businessNumber ?? t('text.notEntered') },
    { label: t('platform.label.cpbcNum'), value: platformBusiness.value.cpbcLicenceNumber ?? t('text.notEntered') },
    { label: t('platform.label.noncomplianceEmail'), value: platformBusiness.value.nonComplianceEmail },
    { label: t('platform.label.takedownEmail'), value: platformBusiness.value.takeDownEmail }
  ]
  // set sidebar accordian stuff
  addresses.value = [
    {
      defaultOpen: true,
      showAvatar: false,
      label: t('label.mailingAddress'),
      values: [
        {
          icon: 'i-mdi-email-outline',
          address: platformBusiness.value.mailingAddress
        }
      ]
    }
  ]
  if (platformBusiness.value.hasRegOffAtt) {
    addresses.value.push({
      showAvatar: false,
      label: t('platform.label.registeredOfficeAttorney'),
      values: [
        {
          class: 'pl-3',
          label: t('platform.label.attName'),
          text: platformBusiness.value.regOfficeOrAtt.attorneyName ?? t('label.notAvailable')
        },
        {
          class: 'pl-3',
          label: t('label.registeredOffice'),
          address: platformBusiness.value.regOfficeOrAtt.mailingAddress
        }
      ]
    })
  }

  representatives.value = [
    {
      defaultOpen: true,
      showAvatar: true,
      label: `${primaryRep.value?.firstName || ''} ` +
        `${primaryRep.value?.middleName || ''} ` +
        `${primaryRep.value?.lastName || ''}`.replaceAll('  ', '').trim(),
      values: [
        { text: primaryRep.value?.position },
        {
          icon: 'i-mdi-at',
          iconClass: 'text-base mt-[2px]',
          text: primaryRep.value?.emailAddress ?? t('label.notEntered')
        },
        {
          icon: 'i-mdi-phone',
          iconClass: 'text-base mt-[2px]',
          // TODO: update after lekshmi's phone change is in
          text: primaryRep.value?.phone.number ?? t('label.notEntered')
        },
        {
          icon: 'i-mdi-fax',
          iconClass: 'text-base mt-[2px]',
          text: primaryRep.value?.faxNumber ?? t('label.notEntered')
        }
      ]
    }
  ]
  if (secondaryRep.value) {
    representatives.value.push({
      showAvatar: true,
      label: `${secondaryRep.value?.firstName || ''} ` +
        `${secondaryRep.value?.middleName || ''} ` +
        `${secondaryRep.value?.lastName || ''}`.replaceAll('  ', '').trim(),
      values: [
        { text: secondaryRep.value?.position },
        {
          icon: 'i-mdi-at',
          iconClass: 'text-base mt-[2px]',
          text: secondaryRep.value?.emailAddress ?? t('label.notEntered')
        },
        {
          icon: 'i-mdi-phone',
          iconClass: 'text-base mt-[2px]',
          // TODO: update after lekshmi's phone change is in
          text: secondaryRep.value?.phone.number ?? t('label.notEntered')
        },
        {
          icon: 'i-mdi-fax',
          iconClass: 'text-base mt-[2px]',
          text: secondaryRep.value?.faxNumber ?? t('label.notEntered')
        }
      ]
    })
  }
  setBreadcrumbs([
    { label: t('label.bcregDash'), to: useRuntimeConfig().public.registryHomeURL + 'dashboard' },
    { label: t('platform.title.dashboard'), to: useLocalePath()('/platform/dashboard') },
    { label: platformBusiness.value.legalName }
  ])
  loading.value = false
})

// page stuff
useHead({
  title: t('platform.title')
})

definePageMeta({
  layout: 'connect-dashboard',
  path: '/platform/registration/:registrationId'
})

setBreadcrumbs([
  { label: t('label.bcregDash'), to: useRuntimeConfig().public.registryHomeURL + 'dashboard' },
  { label: t('platform.title.dashboard'), to: useLocalePath()('/platform/dashboard') },
  { label: regId }
])
</script>
<template>
  <div class="flex flex-col gap-5 py-8 sm:flex-row sm:py-10">
    <div class="grow space-y-10">
      <ConnectDashboardSection :title="`${$t('label.todo')} (0)`" :loading="loading">
        <div class="flex flex-col p-5 *:text-center">
          <p class="font-bold">
            {{ $t('text.nothingTodo') }}
          </p>
          <p class="text-sm">
            {{ $t('text.filingsWillAppear') }}
          </p>
        </div>
      </ConnectDashboardSection>
      <ConnectDashboardSection :title="$t('platform.label.brandNames')" :loading="loading">
        <div class="space-y-3 p-5">
          <p v-for="brand in platformDetails.brands" :key="brand.name">
            {{ brand.name }} - {{ brand.website }}
          </p>
        </div>
      </ConnectDashboardSection>
    </div>
    <div class="space-y-10">
      <ConnectDashboardSection :title="'Addresses'" :loading="loading">
        <ConnectAccordion :items="addresses" />
      </ConnectDashboardSection>
      <ConnectDashboardSection :title="'Representatives'" :loading="loading">
        <ConnectAccordion :items="representatives" />
      </ConnectDashboardSection>
    </div>
  </div>
</template>
