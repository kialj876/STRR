<script setup lang="ts">
const { t } = useI18n()

// page stuff
useHead({
  title: t('platform.title')
})

definePageMeta({
  path: 'platform/registration/:registrationId/edit'
})

setBreadcrumbs([
  { label: t('platform.title') }
])
</script>
<template>
  <div>
    TBD
    - edit registration values (this will be similar to business-edit?)
    - is this page necessary? Could all edits be inline inside the registration dashboard?
  </div>
</template>
