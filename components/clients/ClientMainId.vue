<template>
  <v-card flat class="pa-4">
    <v-form ref="form" v-model="valid" class="mx-3" lazy-validation>
      <v-row justify="end">
        <v-btn
          :disabled="!valid"
          dark
          color="primary"
          class="ma-4"
          @click="validate"
        >
          <v-icon left>mdi-check</v-icon> Salvar
        </v-btn>
        <v-btn color="grey lighten-5" class="ma-4 black--text" to="/clients">
          <v-icon left>mdi-close</v-icon> Cancelar
        </v-btn>
      </v-row>

      <v-row class="mt-5">
        <v-col cols="12" md="3" class="my-n4 ml-n2">
          <span class="my-3">CNPJ:<sub>*</sub> </span>
          <v-text-field
            v-model="client.cgc"
            :rules="rules.cnpj"
            required
            dense
            outlined
          >
            <the-mask
              :mask="['###.###.###-##', '##.###.###/####-##']"
              :value="client.cgc"
            ></the-mask>
          </v-text-field>
        </v-col>

        <v-col cols="12" md="3" class="my-n4 ml-n2">
          <span class="my-3">Insc. Municipal: </span>

          <v-text-field v-model="client.municipal_registration" dense outlined>
          </v-text-field>
        </v-col>
        <v-col cols="12" md="3" class="my-n4 ml-n2">
          <span class="my-3">Insc. Estadual: </span>
          <v-text-field v-model="client.state_registration" dense outlined>
          </v-text-field>
        </v-col>

        <v-col cols="12" md="2" class="my-n4 ml-n2">
          <span class="my-3">Status </span>
          <v-select
            v-model="client.status"
            item-text="text"
            item-value="value"
            :items="items"
            dense
            outlined
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" class="my-n4 ml-n2">
          <span class="my-3">Razão Social:<sub>*</sub> </span>
          <v-text-field
            v-model="client.corporate_name"
            :rules="rules.name"
            required
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="my-n4 ml-n2">
          <span class="my-3 mr-3">Nome Fantasia: </span>
          <v-text-field
            v-model="client.trade_name"
            outlined
            dense
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" class="my-n4 ml-n2">
          <span class="my-3">Responsável </span>
          <v-text-field v-model="client.head" dense outlined></v-text-field>
        </v-col>
        <v-col cols="12" md="4" class="my-n4 ml-n2">
          <span class="my-3 mr-3">Telefone </span>
          <v-text-field v-model="client.fone" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12" md="4" class="my-n4 ml-n2">
          <span class="my-3 mr-3">Ramal </span>
          <v-text-field v-model="client.ramal" outlined dense></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" class="my-n4 ml-n2">
          <span class="my-3">E-mail </span>
          <v-text-field v-model="client.email" dense outlined></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="my-n4 ml-n2">
          <span class="my-3 mr-3">Site </span>
          <v-text-field v-model="client.site" outlined dense></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-5">
        <v-col cols="12" md="4" class="my-n4 ml-n2">
          <span class="my-3">CEP:<sub>*</sub> </span>
          <v-text-field
            v-model="client.cep"
            dense
            outlined
            :loading="loading"
            append-icon="mdi-magnify"
            @click:append="getDataCep"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" class="my-n4 ml-n2">
          <span class="my-3">Logradouro:<sub>*</sub> </span>
          <v-text-field v-model="client.address" dense outlined></v-text-field>
        </v-col>
        <v-col cols="12" md="2" class="my-n4 ml-n2">
          <span class="my-3 mr-3">Numero: </span>
          <v-text-field v-model="client.number" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12" md="4" class="my-n4 ml-n2">
          <span class="my-3 mr-3">Complemento: </span>
          <v-text-field
            v-model="client.complement"
            outlined
            dense
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" class="my-n4 ml-n2">
          <span class="my-3">Bairro </span>
          <v-text-field v-model="client.district" dense outlined></v-text-field>
        </v-col>
        <v-col cols="12" md="4" class="my-n4 ml-n2">
          <span class="my-3 mr-3">Cidade </span>
          <v-text-field v-model="client.city" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12" md="2" class="my-n4 ml-n2">
          <span class="my-3 mr-3">UF </span>
          <v-text-field v-model="client.uf" outlined dense></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" class="my-n4 ml-n2">
          <span class="my-3 mr-3">Observações </span>
          <v-textarea
            v-model="client.observation"
            outlined
            name="input-7-4"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import { TheMask } from 'vue-the-mask'
export default {
  name: 'ClientById',
  components: { TheMask },

  props: {
    client: {
      type: Object,
      default() {
        return {}
      },
    },
  },

  data() {
    return {
      cnpj: null,
      loading: false,
      valid: true,

      items: [
        { value: 'A', text: 'Ativo' },
        { value: 'I', text: 'Inativo' },
      ],

      rules: {
        name: [(v) => !!v || 'Nome Inválido'],
        cnpj: [(v) => !!v || 'CNPJ Inválido'],
      },
    }
  },

  // computed: {
  //   clientId() {
  //     return this.$store.state.clients.clients.filter(
  //       (e) => e.id == this.$route.params.id
  //     )
  //   },
  // },

  methods: {
    validate() {
      this.$refs.form.validate()
      this.updateClient()
    },

    async updateClient() {
      const { id } = this.$route.params
      const {
        cgc,
        corporate_name,
        trade_name,
        municipal_registration,
        state_registration,
        status,
        head,
        fone,
        ramal,
        email,
        site,
        observation,
      } = this.client

      try {
        await this.$axios.put(`clients/${id}/update`, {
          cgc,
          corporate_name,
          trade_name,
          municipal_registration,
          state_registration,
          status,
          head,
          fone,
          ramal,
          email,
          site,
          observation,
        })

        this.$toast.success('Dados salvos com sucesso', {
          position: 'top-right',
        })
      } catch (error) {
        const { data } = error.response

        this.$toast.error(data.message, { position: 'top-right' })
      }
    },

    async getDataCep() {
      try {
        this.loading = true
        const response = await this.$axios.$get(
          `https://viacep.com.br/ws/${this.client.cep}/json/`
        )

        this.client.address = response.logradouro

        this.client.city = response.localidade

        this.client.district = response.bairro

        this.client.uf = response.uf
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    },
  },
}
</script>

<style></style>
