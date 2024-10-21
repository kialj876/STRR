<script setup lang="ts">
const { t } = useI18n()

const { loading, title, subtitles, bottomButtons, sideDetails } = storeToRefs(useConnectDetailsHeaderStore())

onMounted(async () => {
  loading.value = true
  await new Promise((resolve) => { setTimeout(resolve, 1000) })
  title.value = 'Airbnb Company Inc.'
  subtitles.value = ['Quebec Canada', 'Large Platform']
  bottomButtons.value = [
    {
      action: () => { console.info('View and Change') },
      label: 'View and Change Platform Information',
      icon: 'i-mdi-file-document-edit-outline'
    },
    {
      action: () => { console.info('Certificate') },
      label: 'Certificate',
      icon: 'i-mdi-file-download-outline'
    },
    {
      action: () => { console.info('Receipt') },
      label: 'Receipt',
      icon: 'i-mdi-file-download-outline'
    }
  ]
  sideDetails.value = [
    { label: 'Business Number', value: '123456789BC0001' },
    { label: 'Consumer Protection BC Number', value: '12345' },
    { label: 'Non-compliance Email', value: 'noncomply@email.com' },
    { label: 'Takedown Email', value: 'takedown@email.com' }
  ]
  loading.value = false
})

// page stuff
useHead({
  title: t('platform.title')
})

definePageMeta({
  layout: 'platform-registration',
  path: '/platform/registration/:registrationId'
})

setBreadcrumbs([
  { label: t('platform.title') }
])
</script>
<template>
  <div class="flex flex-col gap-5 py-8 sm:flex-row sm:py-10">
    <div class="grow space-y-10">
      <ConnectDashboardSection :title="'To Do (0)'">
        <div class="p-5">
          TBD
        </div>
      </ConnectDashboardSection>
      <ConnectDashboardSection :title="'Brand Names'">
        <div class="p-5">
          TBD
        </div>
      </ConnectDashboardSection>
    </div>
    <div class="space-y-10">
      <ConnectDashboardSection :title="'Addresses'">
        <div class="w-[300px] p-5">
          TBD
        </div>
      </ConnectDashboardSection>
      <ConnectDashboardSection :title="'Representatives'">
        <div class="w-[300px] p-5">
          TBD
        </div>
      </ConnectDashboardSection>
    </div>
  </div>
</template>
