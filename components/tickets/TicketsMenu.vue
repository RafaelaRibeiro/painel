<template>
  <div>
    Informações do ticket
    <!-- <v-navigation-drawer permanent right width="25vw" class="pa-2">
      <div class="ma-3 flex justify-center">
        <h2 class="text-xl font-weight-normal">
          <i> Detalhes do ticket </i>
        </h2>
      </div>
      <v-divider></v-divider>

      <div
        class="bg-gray-300 flex justify-center mx-1 my-2 pa-2 rounded-md border border-slate-300 font-medium"
      >
        Dados do contato
      </div>

      <div class="ma-2">
        <p class="text-sm">Usuário: {{ this.ticket?.user?.name }}</p>
        <p class="text-sm">
          Cliente: {{ this.ticket?.user?.client?.trade_name }}
        </p>
        <p class="text-sm">E-mail: {{ this.ticket?.user?.email }}</p>
      </div>
      <v-divider></v-divider>

      <div
        class="bg-gray-300 flex justify-center mx-1 my-3 pa-2 rounded-md border border-slate-300 font-medium"
      >
        Informações do ticket
      </div>

      <div class="mx-1 my-2">
        <p class="text-sm">Aprovador: {{ this.ticket?.approver?.name }}</p>
        <v-select
          v-model="ticket.category_id"
          :items="categories"
          item-text="name"
          item-value="id"
          label="Categoria"
          outlined
          dense
        ></v-select>
        <v-select
          v-model="ticket.priority_id"
          label="Prioridade"
          :items="priorities"
          item-text="name"
          item-value="id"
          required
          dense
          outlined
        >
          <template v-slot:selection="data">
            <v-card width="12" height="12" :color="data.item.colors"> </v-card>
            <span class="ml-2"> {{ data.item.name }}</span>
          </template>
        </v-select>

        <v-select label="Atendente" outlined dense></v-select>

        <div>
          <v-btn color="success" @click="updateTicket">Atualizar</v-btn>
        </div>
      </div>
    </v-navigation-drawer> -->
  </div>
</template>

<script>
export default {
  props: ['ticket', 'priorities', 'categories', 'situations'],
  data() {
    return {
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' },
      ],

      selectedColor: null,
      colorOptions: [
        { name: 'Vermelho', value: '#ff0000' },
        { name: 'Verde', value: '#00ff00' },
        { name: 'Azul', value: '#0000ff' },
      ],
    }
  },

  computed: {
    nameUser() {
      return this.ticket?.user?.name
    },
  },

  methods: {
    async updateTicket() {
      const { id } = this.$route.params
      const { category_id, priority_id, agent_id } = this.ticket
      const data = await this.$axios.$put(`tickets/${id}/update`, {
        category_id,
        priority_id,
        agent_id,
      })
      console.log(data)
    },
  },
}
</script>

<style scoped>
.v-input {
  font-size: 14px;
}

.v-input .v-label {
  font-size: 14px;
}
</style>
