<template>
  <v-row justify="center" align="center" class="ma-0">
    <v-col cols="12">
      <v-card flat class="pa-4">
        <v-form ref="form" v-model="valid" class="mx-3" lazy-validation>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="col-span-1">
              <span>CNPJ: <sub class="">*</sub> </span>

              <v-text-field
                v-model="company.cgc"
                :rules="rules.cnpj"
                required
                dense
                outlined
                :loading="loading"
                append-icon="mdi-magnify"
                @click:append="getDataCnpj"
                @keyup.tab="getDataCnpj"
              >
              </v-text-field>
            </div>
            <div class="col-span-1">
              <span>Insc. Municipal: </span>
              <v-text-field v-model="company.state_registration" dense outlined>
              </v-text-field>
            </div>

            <div class="col-span-2"></div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-1">
              <span>Razão Social:<sub>*</sub> </span>
              <v-text-field
                v-model="company.corporate_name"
                :rules="rules.name"
                required
                dense
                outlined
              ></v-text-field>
            </div>
            <div class="col-span-1">
              <span>Nome Fantasia: </span>
              <v-text-field
                v-model="company.trade_name"
                outlined
                dense
              ></v-text-field>
            </div>
          </div>

          <v-btn
            color="primary"
            :disabled="!valid"
            class="mr-4"
            @click="validate"
          >
            <v-icon left>mdi-check</v-icon> Salvar
          </v-btn>

          <v-btn
            color="grey lighten-5"
            class="ma-4 black--text"
            @click="$emit('dialog', false)"
          >
            <v-icon left>mdi-close</v-icon> Cancelar
          </v-btn>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CreateClientPage',

  data() {
    return {
      cnpj: null,
      loading: false,
      dataCompany: {},
      company: {},
      valid: true,
      status: { value: 'A', text: 'Ativo' },
      items: [
        { value: 'A', text: 'Ativo' },
        { value: 'I', text: 'Inativo' },
      ],

      rules: {
        name: [(v) => !!v || 'Name is required'],
        cnpj: [(v) => !!v || 'cnpj is required'],
      },
    }
  },

  methods: {
    validate() {
      this.$refs.form.validate()
      this.saveClient()
    },

    cnpjNotification(text = null, color) {
      this.$vs.notification({
        flat: true,
        position: 'top-center',
        progress: 'auto',
        text,
        color,
      })
    },

    async getDataCnpj() {
      try {
        this.loading = true
        const dataCompany = await this.$axios.$get(
          `https://publica.cnpj.ws/cnpj/${this.company.cgc}`
        )

        this.company.corporate_name = dataCompany.razao_social
        this.company.trade_name = dataCompany.razao_social
        this.loading = false
      } catch (err) {
        this.$toast.error('CNPJ Inválido', { position: 'top-center' })
        this.loading = false
      }
    },

    async saveClient() {
      const {
        cgc,
        corporate_name,
        trade_name,
        municipal_registration,
        state_registration,
      } = this.company
      try {
        await this.$axios
          .$post('/clients/create', {
            cgc,
            corporate_name,
            trade_name,
            municipal_registration,
            state_registration,
          })
          .then((response) => {
            const id = response.id
            this.$router.push({
              path: `/clients/${id}`,
            })
          })
      } catch (err) {}
    },
  },
}
</script>

<style>
/* sub {
  vertical-align: super;
  font-size: medium;
  color: red;
} */
</style>
