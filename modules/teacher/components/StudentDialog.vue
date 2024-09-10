<script setup lang="ts">
import type { StudentPartial } from "../composables";
import type { StudentType } from "@/composables";

/*
  ╔═ .★. ══════════════════════════════════════╗
              Definición de props

    provided = es el id del estudiante que se 
                  va a editar;
    data = todos los estudiantes a mapear;
    mode = true = edición activada;
  ╚══════════════════════════════════════ .★. ═╝
*/
const { provided, data, mode } = defineProps<{
  provided: Number;
  data: StudentType[];
  mode: Boolean;
}>();

const emit = defineEmits<{
  (e: "edit_student", dataStudent: StudentPartial): void;
}>();

const handleEditStudent = (estudianteActualizado: StudentPartial) => {
  emit("edit_student", estudianteActualizado);
};

/*
  ╔═ .★. ════════════════════════════════════════════════════════════╗
    Si el modo edición esta activado, se filtra la lista de estudiantes
    para mostrar en el carousel solo los que no han sido recogidos, caso
    contrario se devolverá el array tal cual se recibió
  ╚════════════════════════════════════════════════════════════ .★. ═╝
*/
const studentList = computed(() => {
  if (mode === true) return data;
  return data.filter((student: StudentType) => {
    return student.status !== "absent" && student.status !== "picked up";
  });
});

/*
  ╔═ .★. ════════════════════════════════════════════════════════════╗
    Se busca en el array dependiendo del id que se pasa en las props
    si el modo edición no esta activado, se busca el index en el array 
    para mostrar la posición inicial del carousel, caso contrario se
    se filtrara primero para obtener solo los disponibles y luego 
    obtener el index de ese array
  ╚════════════════════════════════════════════════════════════ .★. ═╝
*/
const indexFiltered = computed(() => {
  if (mode === true) return data.findIndex((student: StudentType) => student.id === provided);
  const arrayFiltered = data.filter((student: StudentType) => {
    return student.status !== "absent" && student.status !== "picked up";
  });
  return arrayFiltered.findIndex((student: StudentType) => student.id === provided);
});
</script>
<template>
  <div>
    <!--
      ╔═ .★. ════════╗
      Este es el modal
      ╚════════ .★. ═╝
    -->
    <Dialog>
      <DialogTrigger as-child>
        <slot></slot>
      </DialogTrigger>
      <DialogContent
        class="h-screen w-screen min-h-[550px] lg:!max-w-3xl sm:h-fit px-0 rounded-none sm:rounded-2xl flex flex-col items-center justify-center"
      >
        <DialogHeader><DialogTitle></DialogTitle></DialogHeader>
        <DialogDescription>
          <Carousel
            :opts="{ startIndex: indexFiltered, loop: true }"
            class="w-[80vw] min-w-[250px] sm:w-[60vw] md:!max-w-sm lg:!max-w-xl sm:h-fit rounded-none sm:rounded-2xl p-0"
          >
            <CarouselContent>
              <!--
                ╔═ .★. ══════════════════╗
                  Se carga una card de 
                  cada uno de los alumnos
                ╚══════════════════ .★. ═╝
              -->
              <CarouselItem v-for="(alum, i) in studentList" :key="i" class="w-full md:3/4 min-w-[250px]">
                <StudentCard :student="alum" :mode="mode" @edit_student="handleEditStudent" />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious class="left-2 sm:-left-10 border-none shadow-none w-10 h-10" />
            <CarouselNext class="right-2 sm:-right-10 border-none shadow-none w-10 h-10" />
          </Carousel>
        </DialogDescription>
        <DialogFooter>
          <DialogClose class="mt-3 mb-10">
            <button class="underline decoration-solid">Ver lista completa</button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
