<template>
  <div>
    <v-card class="pa-5">
      <v-card flat outlined>
        <v-row justify="space-between">
          <v-col cols="6" md="4">
            <v-btn
              class="ma-2 white--text"
              color="primary"
              @click="dialog = true"
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
          :items="users"
          :search="search"
          :loading="loading"
          loading-text="Carregando"
          style="cursor: pointer"
          no-data-text="Sem usuários cadastrados"
          :footer-props="{
            itemsPerPageText: 'Resultados por página',
            itemsPerPageOptions: [5, 10, 15, 50, -1],
            showFirstLastPage: true,
            pageText: '{0}-{1} de {2}',
          }"
          @click:row="openDetails"
        >
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-slot:item.user.profile="{ item }">
            <span> {{ getProfileLabel(item.user.profile) }}</span>
          </template>
        </v-data-table>
      </v-card>
    </v-card>
    <v-dialog
      v-model="dialog"
      persistent
      :overlay="false"
      max-width="800px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title>
          <i class="text-h5">Cadastro de Funcionários</i>
        </v-card-title>
        <v-card-text>
          <v-row class="mt-5">
            <v-col cols="12" md="6" class="my-n4">
              <span class="my-3">Nome:<sub>*</sub> </span>
              <v-text-field v-model="user.name" required dense outlined>
              </v-text-field>
            </v-col>

            <v-col cols="12" md="6" class="my-n4">
              <span class="my-3">E-mail:<sub>*</sub> </span>
              <v-text-field v-model="user.email" required dense outlined>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" class="my-n4">
              <span class="my-3">Password:<sub>*</sub> </span>
              <v-text-field
                v-model="user.password"
                type="password"
                required
                dense
                outlined
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="my-n4">
              <span class="my-3">Setor:<sub>*</sub> </span>
              <v-select
                v-model="user.department_id"
                :items="departments"
                item-text="name"
                item-value="id"
                required
                dense
                outlined
              >
              </v-select>
            </v-col>
          </v-row>

          <small>*Indica campo obrigatório</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveUser"> Salvar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'UsersPage',
  data() {
    return {
      loading: false,
      clients: [],
      user: {},
      users: [],
      search: '',
      dialog: false,
      departments: [],

      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
          sortable: false,
          width: '5%',
        },

        {
          text: 'Nome',
          align: 'start',
          value: 'user.name',
          sortable: true,
          width: '18%',
        },

        {
          text: 'Setor',
          align: 'start',
          value: 'user.department.name',
          sortable: true,
          width: '10%',
        },
        {
          text: 'Email',
          align: 'start',
          value: 'user.email',
          sortable: true,
          width: '15%',
        },
        {
          text: 'Telefone',
          align: 'start',
          value: 'user.fone',
          sortable: true,
          width: '10%',
        },
        {
          text: 'Perfil',
          align: 'start',
          value: 'user.profile',
          sortable: true,
          width: '10%',
        },
      ],
    }
  },

  mounted() {
    this.usersByClient()
  },

  methods: {
    async saveUser() {
      try {
        await this.$axios
          .$post(`/clients/${this.$route.params.id}/users/create`, {
            name: this.user.name,
            email: this.user.email,
            password: this.user.password,
            department_id: this.user.department_id,
          })
          .then((response) => {
            this.$toast.success('Dados salvos com sucesso', {
              position: 'top-center',
            })
            this.dialog = false
            this.usersByClient()
          })
      } catch (error) {
        const { data } = error.response

        this.$toast.error(data.message, { position: 'top-center' })
      }
    },

    async usersByClient() {
      this.loading = true
      const { id } = this.$route.params
      const response = (this.users = await this.$axios.$get(
        `/users/${id}/users-by-client`
      ))
      this.users = response

      this.loading = false
    },

    openDetails(value) {
      this.$router.push(`/clients/${this.$route.params.id}/users/${value.id}`)
    },

    getProfileLabel(profile) {
      switch (profile.toLowerCase()) {
        case 'u':
          return 'Usuário'

        case 'm':
          return 'Gerente'

        case 's':
          return 'Supervisor'

        case 'o':
          return 'Dono da Conta'

        default:
          return 'Desconhecido'
      }
    },
  },

  computed: {},
}
</script>

<style>
sub {
  vertical-align: super;
  font-size: medium;
  color: red;
}

/* input {
  text-transform: uppercase;
} */
</style>
