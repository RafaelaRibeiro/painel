<template>
  <div class="mt-3">
    <div>
      <h1 class="headline font-weight-light mb-4">
        <i>
          <v-icon size="30" class="px-3">mdi-file-document</v-icon>Contratos
        </i>
      </h1>
    </div>

    <contracts-main />
  </div>
</template>

<script>
import ContractsMain from '../../components/contracts/ContractsMain.vue'
export default {
  components: { ContractsMain },
}
</script>

<style>
</style>
