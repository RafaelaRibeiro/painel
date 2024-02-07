<template>
  <div>
    <v-card>
      <v-row justify="space-between">
        <v-col cols="6" md="4">
          <v-btn
            @click="dialog = true"
            class="ma-2 white--text"
            color="primary"
          >
            <v-icon left> mdi-plus </v-icon>

            Incluir</v-btn
          >
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
        :items="clients"
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
        <template v-slot:[`item.cgc`]="{ item }">
          <span>
            {{ item.cgc | cnpj }}
          </span>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog
      v-model="dialog"
      max-width="70vw"
      persistent
      transition="dialog-transition"
    >
      <v-card> <client-create @dialog="dialogChild" /> </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ClientCreate from './ClientCreate.vue'
import { TheMask } from 'vue-the-mask'
export default {
  props: ['clients'],
  components: { ClientCreate, TheMask },
  data() {
    return {
      search: '',
      dialog: false,
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
          sortable: false,
          width: '5%',
        },

        {
          text: 'CNPJ',
          align: 'start',
          value: 'cgc',
          sortable: false,
          width: '15%',
        },
        {
          text: 'Nome Fantasia',
          align: 'start',
          value: 'trade_name',
          sortable: true,
          width: '22%',
        },
        {
          text: 'Razão Social',
          align: 'start',
          value: 'corporate_name',
          sortable: true,
          width: '23%',
        },

        {
          text: 'Responsável',
          align: 'start',
          value: 'head',
          sortable: true,
          width: '15%',
        },
        {
          text: 'Telefone',
          align: 'start',
          value: 'fone',
          sortable: true,
          width: '10%',
        },
      ],
    }
  },

  methods: {
    openDetails(value) {
      this.$router.push(`clients/${value.id}`)
    },
    dialogChild(dialog) {
      this.dialog = dialog
    },
  },
}
</script>

<style scope>
::v-deep(.v-dialog) {
  height: 350px !important;
}
</style>
