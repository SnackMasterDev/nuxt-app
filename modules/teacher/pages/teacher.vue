<script setup lang="ts">
import type { CourseType, ResponseApiType } from "composables/types";

const loading = ref<{ [key: string]: boolean }>({});
const allDisabled = ref(false);

function load(courseId: string) {
  loading.value[courseId] = true;
  allDisabled.value = true;
}

const { data: courses, error } = await useAPI<ResponseApiType<CourseType>>("/api/courses");
</script>
<template>
  <v-app-bar color="profesor" />
  <v-main>
    <v-container>
      <v-row v-if="!error" justify="space-around" class="flex-wrap">
        <v-btn-expand
          v-for="course in courses?.rows"
          :key="course.id"
          :href="`/teacher/${course.id}`"
          :loading="loading[course.id]"
          :disabled="allDisabled && !loading[course.id]"
          @click="() => load(course.id)"
        >
          {{ course.description }}
        </v-btn-expand>
      </v-row>
      <v-row v-else justify="center" align="center">
        <h2>Ah ocurrido un error, inténtelo más tarde</h2>
      </v-row>
    </v-container>
  </v-main>
  <v-footer class="d-flex justify-center py-5" elevation="10" :app="true">
    <v-btn-submit> Cerrar Sesión</v-btn-submit>
  </v-footer>
</template>
