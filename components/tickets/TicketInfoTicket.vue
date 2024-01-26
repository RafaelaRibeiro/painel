<template>
  <div class="mx-2">
    <div
      class="bg-gray-300 flex justify-center mx-1 my-3 pa-3 rounded-md border border-slate-300 font-medium"
    >
      Informações do chamado
    </div>

    <div class="mx-1 my-2">
      <v-select
        v-model="ticket.situation_id"
        :items="situations"
        item-text="name"
        item-value="id"
        label="Situação"
        outlined
        dense
      ></v-select>
      <v-autocomplete
        v-model="ticket.approver_id"
        :items="approvers"
        item-text="name"
        item-value="id"
        label="Aprovador"
        outlined
        dense
      ></v-autocomplete>
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

      <v-select
        v-model="ticket.agent_id"
        label="Atendente"
        :items="agents"
        item-text="name"
        item-value="id"
        required
        dense
        outlined
      ></v-select>

      <div class="mb-2">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="formattedDeadline"
              label="Prazo"
              append-icon="mdi-calendar"
              readonly
              outlined
              dense
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="ticket.deadline"
            no-title
            scrollable
            @input="menu = false"
          ></v-date-picker>
        </v-menu>
      </div>

      <div>
        <v-btn dark color="#004011" @click="updateTicket">Atualizar</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localizedFormat)

export default {
  props: [
    'ticket',
    'priorities',
    'categories',
    'situations',
    'agents',
    'approvers',
  ],

  data() {
    return {
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' },
      ],
      date: null,
      menu: false,

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

    formattedDeadline() {
      if (this.ticket.deadline) {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

        const zonedDeadline = dayjs(this.ticket.deadline).tz(userTimeZone)

        const adjustedDeadline = zonedDeadline
          .add(23, 'hours')
          .add(59, 'minutes')
          .add(59, 'seconds')

        return adjustedDeadline.format('DD/MM/YYYY')
      } else {
        return null
      }
    },
  },

  methods: {
    async updateTicket() {
      const { id } = this.$route.params
      const {
        category_id,
        priority_id,
        agent_id,
        approver_id,
        situation_id,
        deadline,
      } = this.ticket
      const defaultDeadline = new Date()
      defaultDeadline.setDate(defaultDeadline.getDate() + 2)

      const formattedDeadline = deadline ? deadline : defaultDeadline

      try {
        await this.$axios.$put(`tickets/${id}`, {
          category_id,
          priority_id,
          agent_id,
          approver_id,
          situation_id,
          deadline: formattedDeadline,
        })

        const updatedTicket = await this.$axios.$get(`tickets/${id}`)

        // Atualize o componente com as novas informações
        this.ticket = updatedTicket.ticket

        this.$toast.success('Dados atualizados', {
          position: 'top-center',
        })
      } catch (error) {
        // Adicione logs para depurar
        console.error('Erro ao atualizar os dados:', error)

        this.$toast.error('Erro ao atualizar os dados', {
          position: 'top-center',
        })
      }
    },
  },
}
</script>

<style scoped>
::v-deep(.v-input) {
  font-size: 14px;
}

.el-input {
  width: 257.45px !important;
}

::v-deep(.v-input .v-label) {
  font-size: 14px;
}
</style>
