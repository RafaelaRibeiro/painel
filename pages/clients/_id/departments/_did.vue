<template>
  <div>
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
    <v-row>
      <v-col>
        <v-card flat class="pa-4">
          <v-form ref="form" v-model="valid" class="mx-3" lazy-validation>
            <v-row justify="end">
              <v-btn :disabled="!valid" dark color="primary" class="ma-4">
                <v-icon left>mdi-check</v-icon> Salvar
              </v-btn>
              <v-btn
                color="grey lighten-5"
                class="ma-4 black--text"
                to="/clients"
              >
                <v-icon left>mdi-close</v-icon> Cancelar
              </v-btn>
            </v-row>
            <v-row class="mt-5">
              <v-col cols="12" md="3" class="my-n4 ml-n2">
                <span class="my-3 mr-3">Nome: </span>
                <v-text-field
                  v-model="department.name"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" class="my-n4 ml-n2">
                <span class="my-3 mr-3">Responsável: </span>
                <v-autocomplete
                  v-model="department.manager_id"
                  :items="users"
                  item-value="id"
                  item-text="name"
                  outlined
                  dense
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="2" class="my-n4 ml-n2">
                <span class="my-3 mr-3">Responsável: </span>
                <v-select
                  v-model="department.status"
                  :items="status"
                  item-value="id"
                  item-text="text"
                  outlined
                  dense
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'DepartmentById',

  data() {
    return {
      department: {},
      client: {},
      users: [],
      valid: true,
      status: [
        {
          id: 'A',
          text: 'Ativo',
        },
        {
          id: 'I',
          text: 'Inativo',
        },
      ],
    }
  },

  created() {
    this.getDepartmentById()
    this.getUsersByClient()
  },

  methods: {
    async getDepartmentById() {
      const department = await this.$axios.$get(
        `/clients/${this.$route.params.id}/departments/${this.$route.params.did}`
      )
      this.department = department
      this.client = department.client
    },
    async getUsersByClient() {
      this.users = await this.$axios.$get(
        `/clients/${this.$route.params.id}/users`
      )
    },
  },
}
</script>

<style></style>
