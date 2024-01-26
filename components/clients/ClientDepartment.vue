<!-- eslint-disable vue/no-lone-template -->
<template>
  <!-- eslint-disable-next-line vue/max-attributes-per-line -->
  <div>
    <v-card flat outlined class="pa-5">
      <v-row justify="space-between">
        <v-col cols="6" md="4">
          <v-btn
            class="ma-2 white--text"
            color="primary"
            @click="dialog = true"
          >
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
        :items="departments"
        :search="search"
        style="cursor: pointer"
        no-data-text="Sem departamentos cadastrados"
        :footer-props="{
          itemsPerPageText: 'Resultados por página',
          itemsPerPageOptions: [5, 10, 15, 50, -1],
          showFirstLastPage: true,
          pageText: '{0}-{1} de {2}',
        }"
        @click:row="openDetails"
      >
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      departments: [],
      search: '',
      headers: [
        {
          text: 'Cod',
          align: 'Start',
          value: 'id',
          sortable: true,
          width: '7%',
        },
        {
          text: 'Nome',
          align: 'Start',
          value: 'name',
          sortable: true,
        },
        {
          text: 'Responsável',
          align: 'Start',
          value: 'manager',
          sortable: true,
        },
      ],
    }
  },

  mounted() {
    this.getDepartments()
  },

  methods: {
    async getDepartments() {
      const { id } = this.$route.params
      this.departments = await this.$axios.$get(`/clients/${id}/departments`)
    },

    openDetails(value) {
      this.$router.push(
        `/clients/${this.$route.params.id}/departments/${value.id}`
      )
    },
  },
}
</script>

<style></style>
