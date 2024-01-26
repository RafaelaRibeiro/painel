<template>
  <div class="mt-3">
    <div>
      <div>
        <h1 class="headline font-weight-light mb-4">
          <i>
            <v-icon size="30" class="px-3">mdi-office-building-plus</v-icon
            >Cadastro de Clientes
          </i>
        </h1>
      </div>
    </div>

    <client-main :clients="clients" />
  </div>
</template>

<script>
import ClientMain from '../../components/clients/ClientMain.vue'
export default {
  components: { ClientMain },
  data() {
    return {
      clients: [],
    }
  },

  created() {
    this.listClients()
  },

  methods: {
    async listClients() {
      this.clients = await this.$axios.$get('/clients')
    },
  },
}
</script>

<style></style>
