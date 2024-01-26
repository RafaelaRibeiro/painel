<template>
  <div class="mt-3 min-h-[80vh]">
    <!-- Cabeçalho -->
    <div>
      <h1 class="headline font-bold text-gray-700 mb-4">
        <i>
          <v-icon size="30" class="px-3">mdi-file-chart-outline</v-icon>Registro
          de Atividades por Data
        </i>
      </h1>
    </div>

    <!-- Fim ddo Cabeçalho -->
    <div class="bg-white min-h-[78vh] px-6 py-10">
      <div>
        <div class="flex">
          <div class="mr-4">
            <span class="text-sm">Data Inicial:</span>
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formattedStartDate"
                  prepend-inner-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
                  @click:clear="startDate = null"
                  dense
                  outlined
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="startDate"
                scrollable
                @change="menu1 = false"
                locale="pt-br"
              ></v-date-picker>
            </v-menu>
          </div>
          <div>
            <span class="text-sm">Data Final:</span>
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formattedEndDate"
                  prepend-inner-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
                  @click:clear="endDate = null"
                  dense
                  outlined
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="endDate"
                scrollable
                @change="menu2 = false"
                locale="pt-br"
              ></v-date-picker>
            </v-menu>
          </div>

          <div class="mx-4 w-[450px]">
            <span class="text-sm">Clientes:</span>
            <v-autocomplete
              v-model="selected"
              :items="clients"
              multiple
              placeholder="Selecione"
              item-text="trade_name"
              item-value="id"
              dense
              outlined
              @change="handleAutocompleteChange"
            >
              <template v-slot:selection="{ index, item }">
                <v-chip
                  v-if="index < 2 && item.id !== 999"
                  color="primary"
                  dark
                  label
                  small
                >
                  <span v-if="item.trade_name.length >= 15">
                    {{ item.trade_name.slice(0, 15) + '...' }}
                  </span>
                  <span v-else> {{ item.trade_name }} </span>
                </v-chip>

                <span
                  v-else-if="index === 2"
                  class="grey--text text--darken-3 mx-2 text-sm"
                >
                  +{{ selected.length - 2 }} cliente(s)
                </span>
              </template>
            </v-autocomplete>
          </div>
          <div class="mt-6">
            <v-btn color="primary" @click="reportTimesheetsByClients"
              >Buscar</v-btn
            >
          </div>
        </div>

        <div>
          <div class="flex">
            <div class="w-1/4">
              <v-text-field
                v-model="search"
                color="#323288"
                dense
                append-icon="mdi-magnify"
                label="Pesquisar dados"
                outlined
              ></v-text-field>
            </div>

            <v-btn icon>
              <v-icon>mdi-file-excel</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-printer</v-icon>
            </v-btn>
          </div>

          <div>
            <div class="grid grid-cols-12 my-3">
              <span
                class="col-span-2 text-gray-600 font-medium border-b-2 border-t-2 py-2 border-gray-800"
                >Atendente</span
              >
              <span
                class="col-span-3 text-gray-600 font-medium border-b-2 border-t-2 py-2 border-gray-800"
                >Cliente</span
              >
              <span
                class="col-span-1 text-gray-700 font-medium border-b-2 border-t-2 py-2 border-gray-800"
                >Data</span
              >

              <span
                class="col-span-1 text-gray-600 font-medium border-b-2 border-t-2 py-2 border-gray-800"
                >Início</span
              >
              <span
                class="col-span-1 text-gray-600 font-medium border-b-2 border-t-2 py-2 text-center border-gray-800"
                >Fim</span
              >
              <span
                class="col-span-1 text-gray-600 font-medium border-b-2 border-t-2 py-2 text-center border-gray-800"
                >Hora</span
              >
              <span
                class="col-span-1 text-gray-600 font-medium border-b-2 border-t-2 py-2 text-center border-gray-800"
                >Valor</span
              >
            </div>
            <div
              v-for="reportTimesheets in filteredData"
              :key="reportTimesheets.id"
            >
              <report-timesheets-item :reportTimesheets="reportTimesheets" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clientsService from '~/services/clientsService'
import reportsService from '~/services/reportsService'
import debounce from 'lodash/debounce'
import dayjs from 'dayjs'
import ReportTimesheetsItem from './ReportTimesheetsItem.vue'
export default {
  components: { ReportTimesheetsItem },
  data() {
    return {
      menu1: false,
      menu2: false,
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      selected: [],
      dataReport: [],
      loading: false,
      search: '',
      clients: [],
    }
  },

  computed: {
    formattedStartDate() {
      return this.formatDate(this.startDate)
    },
    formattedEndDate() {
      return this.formatDate(this.endDate)
    },

    filteredData() {
      return this.dataReport.filter((reportTimesheets) => {
        return Object.values(reportTimesheets).some((value) =>
          String(value).toLowerCase().includes(this.search.toLowerCase())
        )
      })
    },
  },

  methods: {
    formatDate(date) {
      return dayjs(date).format('DD/MM/YYYY')
    },

    async getClients() {
      try {
        const clientsData = await clientsService.findAllCLients()
        this.clients = clientsData
        this.clients.unshift({
          id: 99999,
          trade_name: 'Selecionar Todos',
        })
      } catch (error) {
        console.error(error)
      }
    },

    async reportTimesheetsByClients() {
      console.log('chamada')
      try {
        this.dataReport = await reportsService.getTimesheetsByClients(
          this.startDate,
          this.endDate,
          this.selected.map(Number)
        )
      } catch (error) {
        console.log(error)
      }
    },

    handleAutocompleteChange() {
      if (this.selected.includes(99999)) {
        this.selected = this.clients.map((item) => item.id)
      } else if (this.selected.length === this.clients.length - 1) {
        this.selected = []
      }
    },
  },

  mounted() {
    this.getClients()
  },
}
</script>

<style>
</style>
