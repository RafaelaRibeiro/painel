<template>
  <div class="h-full bg-white ma-5 border border-gray-200 px-2">
    <v-row justify="space-between">
      <v-col cols="6" md="4">
        <v-btn class="ma-2 white--text" color="primary" @click="dialog = true">
          <v-icon left> mdi-plus </v-icon>

          Incluir
        </v-btn>
      </v-col>
      <v-col cols="6" md="4">
        <v-text-field
          v-model="search"
          class="ma-2"
          dense
          append-icon="mdi-magnify"
          label="Pesquisar"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>

    <div class="px-4">
      <v-data-table
        :headers="headers"
        :items="contracts"
        :search="search"
        style="cursor: pointer"
        :footer-props="{
          itemsPerPageText: 'Resultados por página',
          itemsPerPageOptions: [1, 10, 15, 50, -1],
          showFirstLastPage: true,
          pageText: '{0}-{1} de {2}',
        }"
        @click:row="openDetails"
      >
        <template v-slot:[`item.id`]="{ item }">
          <span>{{ item.id }}</span>
        </template>
        <template v-slot:[`item.client.trade_name`]="{ item }">
          <span class="text-[11px]">{{ item.client.trade_name }}</span>
        </template>
        <template v-slot:[`item.initial_date`]="{ item }">
          <span class="text-xs">{{
            new Date(item.initial_date).toLocaleDateString('pt-br', options)
          }}</span>
        </template>
        <template v-slot:[`item.final_date`]="{ item }">
          <span class="text-xs">{{
            new Date(item.final_date).toLocaleDateString('pt-br', options)
          }}</span>
        </template>
        <template v-slot:[`item.type`]="{ item }">
          <span class="text-xs">{{
            item.type === 'F' ? 'Mensal' : 'Hora'
          }}</span>
        </template>
        <template v-slot:[`item.price`]="{ item }">
          <span class="text-xs">{{
            parseFloat(item.price).toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          }}</span>
        </template>

        <template v-slot:[`item.due_day`]="{ item }">
          <div class="flex justify-center w-1/2">
            <span class="text-xs">{{
              item.due_day.toLocaleString('pt-BR', { minimumIntegerDigits: 2 })
            }}</span>
          </div>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <span class="text-xs">{{
            item.status === 'A' ? 'Ativo' : 'Inativo'
          }}</span>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClientContract',

  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      contracts: [],
      options: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      },
      type: ['Hora', 'Mensal'],
      status: [
        { id: 'A', text: 'Ativo' },
        { id: 'I', text: 'Inativo' },
      ],
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
          sortable: false,
          width: '5%',
        },

        {
          text: 'Nome Fanstasia',
          align: 'start',
          value: 'client.trade_name',
          sortable: true,
          width: '20%',
        },
        {
          text: 'Inicio',
          align: 'start',
          value: 'initial_date',
          sortable: false,
          width: '10%',
        },
        {
          text: 'Final',
          align: 'start',
          value: 'final_date',
          sortable: false,
          width: '10%',
        },
        {
          text: 'Tipo',
          align: 'start',
          value: 'type',
          sortable: false,
          width: '10%',
        },

        {
          text: 'Preço',
          align: 'start',
          value: 'price',
          sortable: false,
          width: '10%',
        },
        {
          text: 'Dia do Venc.',
          align: 'start',
          value: 'due_day',
          sortable: false,
          width: '5%',
        },
        {
          text: 'Situação',
          align: 'start',
          value: 'status',
          sortable: false,
          width: '5%',
        },
      ],
    }
  },

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.inicial_date)
    },
  },

  created() {
    this.listContracts()
  },

  methods: {
    openDetails(value) {
      this.$router.push(`contracts/${value.id}`)
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    async listContracts() {
      const response = await this.$axios.$get(`/contracts`)
      this.contracts = response
    },

    editItem(item) {
      this.editedIndex = this.contracts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
  },
}
</script>

<style scoped>
.centered-input >>> input {
  text-align: center;
}
</style>
