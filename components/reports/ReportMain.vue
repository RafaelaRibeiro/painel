<template>
  <div class="mt-3 min-h-[80vh]">
    <div>
      <h1 class="headline font-bold text-gray-700 mb-4">
        <i>
          <v-icon size="30" class="px-3">mdi-file-chart-outline</v-icon
          >Relatórios
        </i>
      </h1>
    </div>
    <div class="bg-white min-h-[75vh] px-6 py-10">
      <div class="mx-5 grid grid-cols-3">
        <div class="col-span-1">
          <div class="mb-2 mr-4">
            <nuxt-link to="/reports/timesheets-by-date">
              <span class="text-gray-800 text-base"
                >Registro de Atividades Por Data</span
              >
            </nuxt-link>
            <p class="text-gray-600 text-justify text-sm">
              Este relatório apresenta as atividades registradas por cliente.
            </p>
          </div>
        </div>
        <v-divider vertical></v-divider>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
