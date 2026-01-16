<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
  <div class="py-10">
    <ContentRenderer
      v-if="page"
      :value="page"
      class="content-wrapper"
    />
  </div>
</template>

<style scoped>
.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
