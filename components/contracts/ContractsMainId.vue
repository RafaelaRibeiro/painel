<template>
  <div class="min-h-[74vh] bg-white ma-5 border border-gray-200 px-4 py-4">
    <div class="flex">
      <div class="w-32 mr-2">
        <span> Nº do Contrato</span>
        <u-input />
      </div>
      <div class="w-1/3 mr-2">
        <span> Cliente</span>
        <u-input />
      </div>
      <div class="w-32 mr-2">
        <span> Tipo</span>
        <select
          class="rounded px-4 py-2 text-base block w-full text-gray-700 leading-tight bg-white border border-solid border-gray-500 focus:border-2 focus:outline-none focus:border-colorButton hover:border-colorButton"
        >
          <option value="A">Hora</option>
          <option value="I">Pacote</option>
        </select>
      </div>
      <div class="w-36 mr-2">
        <span> Valor</span>
        <u-input />
      </div>
      <div class="w-28 mr-2">
        <span> Dia do Venc.</span>
        <u-input />
      </div>
      <div class="w-28">
        <span> Situação</span>
        <select
          class="rounded px-4 py-2 text-base block w-full text-gray-700 leading-tight bg-white border border-solid border-gray-500 focus:border-2 focus:outline-none focus:border-colorButton hover:border-colorButton"
        >
          <option value="A">Ativo</option>
          <option value="I">Inativo</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import UInput from '../UI/UInput.vue'
export default {
  components: { UInput },
}
</script>

<style>
</style>
