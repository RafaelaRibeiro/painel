<template>
  <div>
    <div class="grid grid-cols-6 md:gap-6 2xl:gap-4 my-4">
      <div
        v-for="(card, index) in cards"
        :key="index"
        :class="[
          'h-28',
          'bg-white',
          'pa-4',
          'shadow-lg',
          'rounded-md',
          'flex',
          'flex-col',
          'justify-between',
          'items-center',
          'text-center',
          'cursor-pointer',

          {
            'bg-gradient-to-r from-[#bdeaf9] to-[#7bd4f3]':
              card.isActive || activeCard === card.id,
          },
        ]"
        @click="showTickets(card.id, card)"
      >
        <div class="text-[#1a5579] font-medium">
          {{ card.name ? card.name : 'Nome Indefinido' }}
        </div>

        <div>
          <span class="text-3xl text-[#1a5579]">{{ card.ticketCount }}</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3 bg-white px-3 py-3 m-0">
      <div>
        <v-btn class="ma-2 white--text" color="#1a5579" @click="openDialog">
          <v-icon left> mdi-plus </v-icon>

          Novo chamado</v-btn
        >
      </div>

      <div class="col-start-3">
        <v-text-field
          v-model="search"
          dense
          append-icon="mdi-magnify"
          label="Pesquisar"
          outlined
        ></v-text-field>
      </div>
    </div>
    <div class="bg-white px-4 m-0 flex justify-between">
      <v-select
        :items="itemsType"
        item-text="text"
        item-value="id"
        v-model="type"
        @change="getTickets"
        outlined
        dense
        class="custom-select"
      ></v-select>
      <v-btn
        v-show="selectedIds.length"
        small
        @click="deleteTickets"
        color="error"
        class="mx-6"
        >excluir</v-btn
      >
    </div>

    <v-data-table
      :headers="headers"
      :items="filteredTickets"
      v-model="selectedItems"
      :search="search"
      style="cursor: pointer"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      @page-count="pageCount = $event"
      show-select
      hide-default-footer
      @click:row="openDetails"
    >
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.id="{ item }">
        <span class="text-xs">#{{ item.id }}</span>
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.subject="{ item }">
        <span class="text-xs">{{ item.subject }}</span>
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.client.trade_name="{ item }">
        <span class="text-xs">{{ item.client.trade_name }}</span>
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.category.name="{ item }">
        <span class="text-xs">{{ item.category.name }}</span>
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.situation.name="{ item }">
        <v-chip label small :color="item.situation.colors" dark>
          <span> {{ item.situation.name }}</span>
        </v-chip>
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.priority.name="{ item }">
        <v-chip label small :color="getColorPriority(item.priority.name)" dark>
          {{ item.priority.name }}
        </v-chip>
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.agent?.name="{ item }">
        <span class="text-xs"> {{ item.agent?.name }}</span>
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.created_at="{ item }">
        <span>
          {{ new Date(item.created_at).toLocaleDateString('pt-br', options) }}
        </span>
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.updated_at="{ item }">
        <span>{{
          new Date(item.updated_at).toLocaleDateString('pt-br', options)
        }}</span>
      </template>
    </v-data-table>
    <div class="bg-white py-4">
      <v-pagination
        :length="pageCount"
        :total-visible="7"
        v-model="page"
      ></v-pagination>
    </div>
    <v-dialog
      v-model="dialogCreate"
      max-width="50vw"
      persistent
      transition="dialog-transition"
    >
      <v-card>
        <ticket-create
          @dialogCreate="dialogChild"
          :users="users"
          :categories="categories"
          :priorities="priorities"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import BaseCard from '../UI/BaseCard.vue'
import TicketCreate from './TicketCreate.vue'

export default {
  components: { BaseCard, TicketCreate },
  data() {
    return {
      dialogCreate: false,
      icon: 'mdi-ticket-confirmation',
      text: 'Tickets',

      tickets: [],
      users: [],
      selectedItems: [],
      categories: [],
      itemsType: [
        { id: 'O', text: 'Abertos' },
        { id: 'C', text: 'Concluídos' },
        { id: 'T', text: 'Todos' },
        { id: 'A', text: 'Aguardando Aprovação' },
        { id: 'P', text: 'Pendente de autorização' },
      ],
      type: 'O',
      situations: [],
      priorities: [],
      cards: [],
      filter: null,
      activeCard: null,
      socket: null,
      newTicket: [],
      page: 1,
      itemsPerPage: 10, // ou o tamanho de página desejado
      pageCount: 0,

      search: '',
      options: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      },

      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
          sortable: false,
          width: '5%',
        },

        {
          text: 'Assunto',
          align: 'start',
          value: 'subject',
          sortable: false,
          width: '13%',
        },
        {
          text: 'Cliente',
          align: 'start',
          value: 'client.trade_name',
          sortable: true,
          width: '12%',
        },
        {
          text: 'Categoria',
          align: 'start',
          value: 'category.name',
          sortable: true,
          width: '15%',
        },

        {
          text: 'Prioridade',
          align: 'start',
          value: 'priority.name',
          sortable: true,
          width: '11%',
        },
        {
          text: 'Atendente',
          align: 'start',
          value: 'agent.name',
          sortable: true,
          width: '12%',
        },
        {
          text: 'Data',
          align: 'start',
          value: 'created_at',
          sortable: true,
          width: '11%',
        },
        {
          text: 'Atualizado',
          align: 'start',
          value: 'updated_at',
          sortable: true,
          width: '11%',
        },
        {
          text: 'Status',
          align: 'start',
          value: 'situation.name',
          sortable: true,
          width: '10%',
        },
      ],
    }
  },

  mounted() {
    this.getData(), this.getTickets()
    // this.$socket.on('ticketCriado', (newTicket) => {
    //   console.log('Ticket recebido:', newTicket)
    //   this.newTicket.unshift(newTicket)
    // })
  },

  // beforeDestroy() {
  //   // Desconectar o socket quando o componente for destruído
  //   if (this.socket) {
  //     this.socket.disconnect()
  //   }
  // },

  computed: {
    selectedIds() {
      return this.selectedItems.map((item) => item.id)
    },
    filteredTickets() {
      let tickets = this.tickets
      if (this.filter) {
        tickets = tickets.filter(
          (ticket) => ticket.situation_id === this.filter
        )
      }

      let concat = this.newTicket.concat(tickets)
      return concat
    },
  },

  methods: {
    showTickets(id, card) {
      if (this.activeCard === id) {
        this.activeCard = null
        this.cards.forEach((card) => {
          card.isActive = false
        })
        this.filter = null
      } else {
        this.activeCard = id
        this.cards.forEach((c) => {
          c.isActive = c.id === card.id

          this.filter = id
        })
      }
    },

    openDialog() {
      this.dialogCreate = true
      this.getUsers()
    },

    async deleteTickets() {
      await this.$axios.delete('/tickets/delete', {
        params: { ids: this.selectedIds },
      })

      this.getData()
    },

    async getData() {
      const [priorities, categories, situations, cards] = await Promise.all([
        this.$axios.$get('/priorities/'),
        this.$axios.$get('/categories/'),
        this.$axios.$get('/situations/'),
        this.$axios.$get('/tickets/cards'),
      ])

      this.priorities = priorities
      this.categories = categories
      this.situations = situations
      this.cards = cards
    },
    async getTickets() {
      const tickets = await this.$axios.$get(`/tickets/byType/${this.type}`)
      this.tickets = tickets
    },

    async getUsers() {
      try {
        const response = await this.$axios.$get('/users')
        this.users = response || []

        console.log(this.users)
      } catch (error) {
        console.log(error)
      }
    },
    dialogChild(dialogCreate) {
      this.dialogCreate = dialogCreate
    },
    openDetails(value) {
      this.$router.push(`tickets/${value.id}`)
    },
    getColorPriority(priority) {
      switch (priority) {
        case 'Baixa':
          return 'green'
          break
        case 'Alta':
          return 'orange'
          break
        case 'Urgente':
          return 'red'
          break

        default:
          return 'blue'
          break
      }
    },
  },
}
</script>

<style>
.custom-select {
  max-width: 200px !important;
}
.custom-select >>> .v-input {
  font-size: 12px !important; /* Tamanho de fonte menor */
}
</style>
