<template>
  <v-card flat class="pa-4">
    <v-form ref="form" class="mx-3" lazy-validation>
      <v-row justify="end">
        <v-btn dark color="primary" class="ma-4" @click="saveData">
          <v-icon left>mdi-check</v-icon> Salvar
        </v-btn>
        <v-btn color="grey lighten-5" class="ma-4 black--text" to="/clients">
          <v-icon left>mdi-close</v-icon> Cancelar
        </v-btn>
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
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'ClientAddress',
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
      cep: null,
      loading: false,
    }
  },

  methods: {
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

    async saveData() {
      try {
        await this.$axios.$put(`/clients/${this.$route.params.id}/update`, {
          cep: this.client.cep,
          address: this.client.address,
          number: parseInt(this.client.number),
          complement: this.client.complement,
          district: this.client.district,
          city: this.client.city,
          uf: this.client.uf,
        })
        // .then((response) => {
        //   this.$toast.success('Dados salvos com sucesso', {
        //     position: 'top-center',
        //   })
        // })
      } catch (error) {
        // const { data } = error.response
        // this.$toast.error(data.message, { position: 'top-center' })
      }
    },
  },
}
</script>

<style></style>
