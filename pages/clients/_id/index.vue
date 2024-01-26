<template>
  <div class="mt-3">
    <v-row>
      <v-col>
        <h1 class="headline font-weight-light mb-4">
          <i>
            <v-icon size="30" class="px-3">mdi-office-building-plus</v-icon
            >{{ client.trade_name }}
          </i>
        </h1>
      </v-col>
    </v-row>
    <v-card>
      <v-tabs
        v-model="tab"
        background-color="deep-purple lighten-5"
        active-class=" primary font-weight-medium white--text shadow p-3 mb-2 rounded "
      >
        <v-tabs-slider color="white"></v-tabs-slider>
        <v-tab v-for="title in titles" :key="title.id">{{ title.text }} </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item :transition="false" :reverse-transition="false">
          <client-main-id :client="client" />
        </v-tab-item>
        <v-tab-item :transition="false" :reverse-transition="false">
          <client-address :client="client" />
        </v-tab-item>
        <v-tab-item :transition="false" :reverse-transition="false">
          <client-contract :client="client" />
        </v-tab-item>
        <v-tab-item :transition="false" :reverse-transition="false">
          <client-department :client="client" />
        </v-tab-item>
        <v-tab-item :transition="false" :reverse-transition="false">
          <client-users :client="client" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import ClientMainId from '../../../components/clients/ClientMainId.vue'
import ClientAddress from '~/components/clients/ClientAddress.vue'
import ClientContract from '~/components/clients/ClientContract.vue'
import ClientDepartment from '~/components/clients/ClientDepartment.vue'
import ClientUsers from '~/components/clients/ClientUsers.vue'

export default {
  components: {
    ClientMainId,
    ClientAddress,
    ClientContract,
    ClientDepartment,
    ClientUsers,
  },
  data() {
    return {
      client: {},
      tab: null,
      titles: [
        { id: 1, text: 'Dados Gerais', href: 'ClientData' },
        { id: 2, text: 'Endereço', href: 'ClientAddress' },
        { id: 3, text: 'Contratos', href: 'ClientContract' },
        { id: 4, text: 'Departamentos', href: 'ClientDepartment' },
        { id: 5, text: 'Funcionários', href: 'ClientUsers' },
      ],
    }
  },

  methods: {
    async getClientsById() {
      this.client = await this.$axios.$get(`/clients/${this.$route.params.id}`)
    },
  },

  created() {
    this.getClientsById()
  },
}
</script>

<style></style>
