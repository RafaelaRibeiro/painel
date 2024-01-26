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

    <v-data-table
      :headers="headers"
      :items="contracts"
      :search="search"
      :footer-props="{
        itemsPerPageText: 'Resultados por página',
        itemsPerPageOptions: [1, 10, 15, 50, -1],
        showFirstLastPage: true,
        pageText: '{0}-{1} de {2}',
      }"
    >
      <template v-slot:[`item.initial_date`]="{ item }">
        <span>{{
          new Date(item.initial_date).toLocaleDateString('pt-br', options)
        }}</span>
      </template>
      <template v-slot:[`item.final_date`]="{ item }">
        <span>{{
          new Date(item.final_date).toLocaleDateString('pt-br', options)
        }}</span>
      </template>
      <template v-slot:[`item.type`]="{ item }">
        <span>{{ item.type === 'F' ? 'Fixo' : 'Hora' }}</span>
      </template>
      <template v-slot:[`item.price`]="{ item }">
        <span>{{ parseFloat(item.price).toFixed(2) }}</span>
      </template>
      <template v-slot:[`item.package_value`]="{ item }">
        <span>{{
          item.package_value
            ? parseFloat(item.package_value).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : 0
        }}</span>
      </template>
      <template v-slot:[`item.limit`]="{ item }">
        <span>{{ item.limit }}</span>
      </template>
      <template v-slot:[`item.actions`]>
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>

        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
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
      type: ['Hora', 'Fixo'],
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
          text: 'Pacote',
          align: 'start',
          value: 'package_value',
          sortable: true,
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
          text: 'Limite (H)',
          align: 'start',
          value: 'limit',
          sortable: false,
          width: '10%',
        },
        {
          text: 'Ações',
          align: 'start',
          value: 'actions',
          sortable: false,
          width: '10%',
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
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    async listContracts() {
      this.contracts = await this.$axios.$get(
        `/clients/${this.$route.params.id}/contracts`
      )
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
