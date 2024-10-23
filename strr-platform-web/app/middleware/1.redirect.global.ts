export default defineNuxtRouteMiddleware((to) => {
  const localPath = useLocalePath()
  if (!to.matched.length || to.path === localPath('/')) {
    return navigateTo({ path: localPath('/platform/dashboard') })
  }
})
