<template>
  <div>
    <pre>{{ data.records }}</pre>
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/orders");
</script>

<style scoped></style>
