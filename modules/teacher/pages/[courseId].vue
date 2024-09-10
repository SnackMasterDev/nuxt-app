<script setup lang="ts">
import type { StudentType, ResponseApiType } from "@/composables";

import type { StudentPartial } from "../composables";

const route = useRoute();
const studentFullList: Ref = ref([]);
const editMode: Ref<boolean> = ref(false);
const alertValue: Ref<boolean> = ref(false);

/*
  ╔═ .★. ═════════╗
  Solicitud a la API
  ╚═════════ .★. ═╝
*/
const { data: students, error } = await useAPI<ResponseApiType<StudentType>>(
  `/api/students/course/${route.params.courseId}`,
);

/*
  ╔═ .★. ═══════════════════════════════════════════════════════════╗
    Cuando se monta el componente se hace una instancia de la lista
  ╚═══════════════════════════════════════════════════════════ .★. ═╝
*/
onMounted(() => {
  studentFullList.value = students.value?.rows;
  alertValue.value = false;
});

/*
  ╔═ .★. ════════════════════════════════════════════════════════╗
    Función para actualizar la lista de estudiantes desde el emit
  ╚════════════════════════════════════════════════════════ .★. ═╝
*/
const updateFullList = (estudianteActualizado: StudentPartial) => {
  alertValue.value = false;
  const index = studentFullList.value.findIndex(
    (student: StudentType) => student.id === estudianteActualizado.student.id,
  );
  studentFullList.value[index] = estudianteActualizado.student;
};

/*
  ╔═ .★. ════════════════════════════════════════════════════════════╗
    Se filtran los estudiantes que no han sido recogidos ni retirados
  ╚════════════════════════════════════════════════════════════ .★. ═╝
*/
const studentList = computed(() => {
  return studentFullList.value.filter((student: StudentType) => {
    return student.status !== "absent" && student.status !== "picked up";
  });
});

/*
  ╔═ .★. ══════════════════════════════════════════════════════════════╗
    Se valida si hay estudiantes que no han sido recogidos ni retirados
  ╚══════════════════════════════════════════════════════════════ .★. ═╝
*/
const countStudents = computed(() => {
  if (studentList.value.length === 0) {
    alertValue.value = true;
  }
  return studentList.value.length === 0;
});
</script>
<template>
  <v-app-bar color="profesor" />
  <v-main>
    <v-container v-if="!error">
      <!--
        ╔═ .★. ════════════════════════════════════════════════════════════════╗
          En esta parte se cargan solo los estudiantes que faltan por recoger,
          y no los que ya han sido recogidos, ni los ausentes y el modo edición 
          debe estar desactivado 
        ╚════════════════════════════════════════════════════════════════ .★. ═╝
      -->
      <v-row v-if="!editMode" justify="center" align="center" class="flex-wrap">
        <!--
          ╔═ .★. ══════════════════════════════════════════════════════════════╗
            Se valida si hay estudiantes que no han sido recogidos ni retirados
            llegado el caso no hayan se mostrara una pantalla de éxito
          ╚══════════════════════════════════════════════════════════════ .★. ═╝
        -->
        <div v-if="countStudents" class="w-full h-screen flex justify-center items-center">
          <AlertDialog :open="alertValue">
            <AlertDialogContent
              class="w-3/4 h-1/2 min-w-60 max-w-[700px] flex flex-col justify-center items-center text-center font-light text-xl text-black"
            >
              <AlertDialogTitle class="text-2xl font-bold text-start"
                >¡Excelente! El curso completo fue retirado</AlertDialogTitle
              >
              <AlertDialogDescription />
              <div class="w-full flex flex-wrap justify-around items-center mt-5">
                <button
                  class="text-[#6750A4] font-semibold outline-none bg-transparent mx-5 my-2.5"
                  @click="editMode = true"
                >
                  Editar
                </button>
                <NuxtLink :to="{ path: `/teacher/` }" class="text-[#6750A4] font-semibold mx-5 my-2.5">
                  Volver al Inicio
                </NuxtLink>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <!--
          ╔═ .★. ══════════════════════════════════════════════════════════════════╗
            En caso de que hayan estudiantes pendientes se muestran en esta sección
          ╚══════════════════════════════════════════════════════════════════ .★. ═╝
        -->
        <v-col v-for="student in studentList" :key="student.id" fluid class="d-flex justify-center align-center">
          <v-btn-student color="blue_1"> {{ student.first_name }} {{ student.last_name }} </v-btn-student>
          <v-chip-retirar> Por retirar </v-chip-retirar>
        </v-col>
      </v-row>
      <!-- 
        ╔═ .★. ═════════════════════════════════════════════════════════════╗
          En esta parte se cargan todos los estudiantes con sus estados, 
          independiente de que si se han recogido, retirado o ausente pero 
          para cumplir esto debe estar activo el modo de edición 
        ╚═════════════════════════════════════════════════════════════ .★. ═╝
      -->
      <v-row v-if="editMode" class="flex-wrap" justify="center" align="center">
        <v-col v-for="student in studentFullList" :key="student.id" fluid class="d-flex justify-center align-center">
          <!--
                ╔═ .★. ═════════╗
                  Carga el modal
                  de edición
                ╚═════════ .★. ═╝
              -->
          <v-btn-student>
            {{ student.first_name }}
            {{ student.last_name }}
          </v-btn-student>
          <!--
                ╔═ .★. ═══════════════════════╗
                  Aquí se asigna una etiqueta 
                  dependiendo del estatus
                ╚═══════════════════════ .★. ═╝
              -->
          <v-chip-retirar v-if="student.status === 'not picked up'"> Por retirar </v-chip-retirar>
          <v-chip-retirado v-if="student.status === 'picked up'"> Retirado </v-chip-retirado>
          <v-chip-ausente v-if="student.status === 'absent'"> No asistió </v-chip-ausente>
          <v-icon icon="mdi-pencil-box-outline" />
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <h1 class="text-xl text-destructive text-center">Ah ocurrido un error, inténtelo más tarde</h1>
    </v-container>
    <!--
    ╔═ .★. ═══════════════╗
      Botones que sirven 
      para controlar el 
      modo de edición
    ╚═══════════════ .★. ═╝
  -->
  </v-main>
  <v-footer class="d-flex justify-center py-5" elevation="10" :app="true">
    <v-btn-submit v-if="!editMode" @click="editMode = true"> Editar </v-btn-submit>
    <v-btn-cancel v-if="editMode" color="red_1" @click="editMode = false"> Cancelar Edición </v-btn-cancel>
  </v-footer>
</template>
