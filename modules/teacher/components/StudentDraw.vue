<script setup lang="ts">
/*
  ╔═ .★. ═══════════════════════════╗
    Definición de props
    authorized = contacto autorizado
    tutor = contacto apoderado
  ╚═══════════════════════════ .★. ═╝
*/
defineProps<{
  authorized: string;
  tutor: string;
}>();
</script>
<template>
  <Drawer>
    <DrawerTrigger as-child>
      <slot></slot>
    </DrawerTrigger>
    <DrawerContent class="w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4 mx-auto pb-5 flex flex-col justify-center items-center">
      <DrawerDescription class="mt-5 w-full text-base font-semibold text-black">
        <div class="text-center py-2.5 bg-[#C3DBC5]">Contacto autorizado:</div>
        <div class="text-center py-2.5">{{ authorized }}</div>
        <div class="text-center py-2.5 bg-[#C3DBC5]">Contacto apoderado:</div>
        <div class="text-center py-2.5">{{ tutor }}</div>
      </DrawerDescription>
    </DrawerContent>
  </Drawer>
</template>
