<script setup lang="ts">
const { t } = useI18n()

const regId = ref('')

// page stuff
useHead({
  title: t('platform.title.dashboard')
})

definePageMeta({
  path: '/platform/dashboard'
})

setBreadcrumbs([
  { label: t('label.bcregDash'), to: useRuntimeConfig().public.registryHomeURL + 'dashboard' },
  { label: t('platform.title.dashboard') }
])
</script>
<template>
  <div class="app-inner-container space-y-5 py-10">
    <ConnectTypographyH1 :text="$t('platform.title.dashboard')" />
    <div class="space-y-5 *:bg-white *:p-5">
      <div>
        <p>TBD</p>
        <p>- list of all platform applications / registrations</p>
        <p>- option to switch roles (host / property manager / strata hotel / platform)</p>
      </div>
      <div>
        <NuxtLink :to="{ path: useLocalePath()('/platform/application') }" class="text-blue-500">
          Go to Application Form
        </NuxtLink>
      </div>
      <div>
        <UInput v-model="regId" placeholder="Registration ID" size="lg" class="max-w-bcGovInput" />
        <div class="mt-3">
          <NuxtLink
            v-if="regId"
            :to="{ path: useLocalePath()(`/platform/registration/${regId}`) }"
            class="text-blue-500"
          >
            Go to Registration Dashboard for {{ regId }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
