<template>
    <div class="page-wrapper">
        <slot />
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.page-wrapper {
    max-width: 800px;
    margin: 0 auto;
    min-height: 100vh;
    padding: 2rem;
}

@media (max-width: 768px) {
    .page-wrapper {
        padding: 1rem;
    }
}
</style>