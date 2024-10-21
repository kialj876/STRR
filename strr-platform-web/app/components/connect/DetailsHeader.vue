<script setup lang="ts">
const {
  loading,
  title,
  subtitles,
  details,
  sideDetails,
  bottomButtons
} = storeToRefs(useConnectDetailsHeaderStore())
</script>

<template>
  <div class="bg-white py-5" data-testid="connect-details-header">
    <div class="app-inner-container">
      <div v-if="loading" class="flex animate-pulse flex-col gap-2 sm:flex-row">
        <div class="grow space-y-2">
          <div class="h-9 w-[400px] rounded bg-gray-200" />
          <div class="h-5 w-[250px] rounded bg-gray-200" />
          <div class="h-5 w-[200px] rounded bg-gray-200" />
          <div class="h-5 w-[150px] rounded bg-gray-200" />
        </div>
        <div class="space-y-2">
          <div class="h-5 w-[300px] rounded bg-gray-200" />
          <div class="h-5 w-[300px] rounded bg-gray-200" />
          <div class="h-5 w-[300px] rounded bg-gray-200" />
          <div class="h-5 w-[300px] rounded bg-gray-200" />
        </div>
      </div>
      <div v-else class="flex flex-col gap-2 sm:flex-row">
        <div class="grow space-y-4">
          <div class="space-y-2">
            <ConnectTypographyH1 v-if="title" :text="title" />
            <div v-if="subtitles.length" class="flex divide-x *:border-gray-500 *:px-2 first:*:pl-0">
              <p v-for="subtitle in subtitles" :key="subtitle" class="text-sm">
                {{ subtitle }}
              </p>
            </div>
          </div>
          <div class="space-y-2">
            <slot name="details">
              <p v-if="details" class="text-sm">
                {{ details }}
              </p>
            </slot>
            <slot name="buttons">
              <div v-if="bottomButtons.length" class="flex flex-wrap gap-2">
                <UButton
                  v-for="btn in bottomButtons"
                  :key="btn.label"
                  :label="btn.label"
                  :icon="btn.icon"
                  class="pl-0"
                  color="primary"
                  variant="link"
                  @click="btn.action()"
                />
              </div>
            </slot>
          </div>
        </div>
        <dl class="space-y-1 text-sm">
          <template v-for="detail in sideDetails" :key="detail.label">
            <div class="flex flex-row flex-wrap gap-2 sm:flex-row">
              <dt class="font-bold">
                {{ detail.label }}:
              </dt>
              <dd>{{ detail.value }}</dd>
            </div>
          </template>
        </dl>
      </div>
    </div>
  </div>
</template>
