<script setup lang="ts">
defineProps<{
  data: CourseType;
}>();
</script>

<template>
  <li class="grid">
    <Button as-child variant="dark_blue" size="lg" classs="w-full">
      <NuxtLink :to="{ path: `/teacher/${data.id}` }">
        {{ data.description }}
      </NuxtLink>
    </Button>
  </li>
</template>
