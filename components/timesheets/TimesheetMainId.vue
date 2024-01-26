<template>
  <div class="mt-3">
    <div>
      <h1 class="headline font-weight-light mb-4">
        <i>
          <v-icon size="30" class="px-3">mdi-calendar-clock</v-icon>Registro de
          horas
        </i>
      </h1>
    </div>
    <div>
      <v-card flat>
        <v-form ref="form" v-model="valid" class="mx-1 my-3" lazy-validation>
          <div class="grid grid-cols-12 gap-2 px-2">
            <div class="col-span-4">
              <span> Cliente:<sub>*</sub> </span>
              <v-text-field
                v-model="timesheet.client.trade_name"
                readonly
                outlined
                dense
              ></v-text-field>
            </div>
            <div class="col-span-2">
              <span> Data:<sub>*</sub> </span>
              <el-date-picker
                v-model="timesheet.date"
                type="date"
                placeholder="Dia"
                :picker-options="pickerOptions"
                format="dd/MM/yyyy"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </div>

            <div class="col-span-2">
              <span> Início:<sub>*</sub></span>
              <el-time-select
                v-model="timesheet.start_time"
                placeholder="Início"
                :picker-options="{
                  start: '06:00',
                  step: '00:15',
                  end: '23:45',
                }"
              >
              </el-time-select>
            </div>

            <div class="col-span-2">
              <span> Término: </span>
              <el-time-select
                placeholder="Fim"
                v-model="timesheet.end_time"
                :picker-options="{
                  start: '06:00',
                  step: '00:15',
                  end: '23:00',
                }"
              >
              </el-time-select>
            </div>
            <div class="col-span-2">
              <span> Intervalo: </span>
              <input
                v-model="timesheet.interval"
                class="rounded px-4 py-2 text-base block w-full text-gray-700 leading-tight bg-white border border-solid border-gray-500 focus:border-2 focus:outline-none focus:border-colorButton hover:border-colorButton"
                type="number"
              />
            </div>
          </div>
          <div class="grid grid-cols-1 px-2">
            <span> Atividades: </span>
            <no-ssr>
              <vue-editor
                placeholder="Escreva aqui..."
                v-model="timesheet.activities"
              ></vue-editor>
            </no-ssr>
          </div>
          <div class="flex justify-between mt-1">
            <small>*Indica campo obrigatório</small>

            <div>
              <v-btn
                color="grey lighten-5"
                class="ma-4 black--text"
                to="/timesheets"
              >
                <v-icon left>mdi-arrow-left</v-icon> Voltar
              </v-btn>
              <v-btn color="primary" dark @click="updateTimesheet">
                <v-icon left>mdi-check</v-icon> Salvar
              </v-btn>
              <u-dialog :deleteTimesheet="deleteTimesheet" />
            </div>
          </div>
        </v-form>
      </v-card>
    </div>
  </div>
</template>

<script>
import UDialog from '../UI/UDialog.vue'
export default {
  components: { UDialog },
  data() {
    return {
      valid: true,

      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      timesheet: {
        client: {
          trade_name: '',
        },
      },
    }
  },

  created() {
    this.getTimesheetById()
  },

  methods: {
    async updateTimesheet() {
      const { id } = this.$route.params
      const { client_id, date, start_time, end_time, interval, activities } =
        this.timesheet

      try {
        await this.$axios
          .$put(`timesheets/${id}`, {
            client_id,
            date,
            start_time,
            end_time,
            interval: Number(interval),
            activities,
          })
          .then(() => {
            this.$toast.success('Dados salvos com sucesso', {
              position: 'top-right',
            })
          })
      } catch (error) {
        const { data } = error.response

        this.$toast.error(data.message, { position: 'top-right' })
      }
    },

    async deleteTimesheet() {
      const { id } = this.$route.params
      try {
        await this.$axios.$delete(`/timesheets/${id}`)
        this.$router.push({
          path: `/timesheets`,
        })

        this.$toast.success('Registro excluído com sucesso', {
          position: 'top-right',
        })
      } catch (error) {
        const { data } = error.response

        this.$toast.error(data.message, { position: 'top-right' })
      }
    },

    async getTimesheetById() {
      this.timesheet = await this.$axios.$get(
        `/timesheets/${this.$route.params.id}`
      )
    },
  },
}
</script>

<style></style>
