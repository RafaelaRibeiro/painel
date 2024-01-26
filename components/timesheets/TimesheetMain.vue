<template>
  <div class="mt-3">
    <div>
      <h1 class="headline font-weight-light mb-4">
        <i>
          <v-icon size="30" class="px-3">mdi-calendar-clock</v-icon>Registro de
          Horas
        </i>
      </h1>
    </div>

    <div class="min-h-[79vh] bg-white elevation-5 pt-6 px-4">
      <div class="justify-between grid grid-cols-2">
        <div>
          <v-btn
            class="ma-2 white--text"
            color="#1a5579"
            :to="'/timesheets/create'"
          >
            <v-icon left> mdi-plus </v-icon>

            Incluir</v-btn
          >
        </div>

        <div>
          <v-text-field
            v-model="search"
            class="ma-2"
            dense
            append-icon="mdi-magnify"
            label="Pesquisar"
            outlined
            color="indigo darken 3"
          ></v-text-field>
        </div>
      </div>

      <div class="flex items-center justify-center">
        <v-btn icon @click="selectPrevious"
          ><v-icon>mdi-chevron-left</v-icon></v-btn
        >
        <span class="font-medium text-lg text-gray-700"
          >{{ months[selectedMonth] }} {{ currentYear }}</span
        >
        <v-btn icon @click="selectNext"
          ><v-icon>mdi-chevron-right</v-icon></v-btn
        >
      </div>

      <div class="m-1">
        <v-data-table
          :headers="headers"
          :items="timesheets"
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
        </v-data-table>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'Timesheet',

  data() {
    return {
      search: '',
      months: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ],
      currentYear: null,
      selectedMonth: null,
      timesheets: [],
      clients: [],
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
          sortable: false,
          width: '5%',
        },
        {
          text: 'Cliente',
          align: 'start',
          value: 'trade_name',
          sortable: true,
          width: '20%',
        },
        {
          text: 'Data',
          align: 'center',
          value: 'date',
          sortable: true,
          width: '10%',
        },
        {
          text: 'Inicio',
          align: 'center',
          value: 'start_time',
          sortable: false,
          width: '10%',
        },
        {
          text: 'Fim',
          align: 'center',
          value: 'end_time',
          sortable: false,
          width: '10%',
        },
        {
          text: 'Intervalo',
          align: 'center',
          value: 'interval',
          sortable: false,
          width: '10%',
        },

        {
          text: 'Horas',
          align: 'start',
          value: 'timediff',
          sortable: false,
          width: '10%',
        },
        {
          text: 'Total',
          align: 'start',
          value: 'price',
          sortable: true,
          width: '10%',
        },
      ],
    }
  },

  computed: {
    years() {
      const currentYear = new Date().getFullYear()
      return Array.from({ length: 10 }, (v, k) => currentYear - k)
    },
  },

  mounted() {
    const selectedMonth =
      parseInt(localStorage.getItem('selectedMonth')) ?? undefined
    const selectedYear =
      parseInt(localStorage.getItem('selectedYear')) ?? undefined

    if (selectedMonth && selectedYear) {
      this.selectedMonth = selectedMonth
      this.currentYear = selectedYear
    } else {
      const currentDate = new Date()
      this.selectedMonth = currentDate.getMonth()
      this.currentYear = currentDate.getFullYear()
      this.saveSelectedMonthYear()
    }
    this.listTimesheets()
  },

  methods: {
    openDetails(value) {
      this.$router.push(`timesheets/${value.id}`)
    },

    saveSelectedMonthYear() {
      localStorage.setItem('selectedMonth', this.selectedMonth)
      localStorage.setItem('selectedYear', this.currentYear)
    },

    selectNext() {
      if (this.selectedMonth === 11) {
        this.selectedMonth = 0
        this.currentYear++
      } else {
        this.selectedMonth++
      }
      this.saveSelectedMonthYear()
      this.listTimesheets()
    },
    selectPrevious() {
      if (this.selectedMonth === 0) {
        this.selectedMonth = 11
        this.currentYear--
      } else {
        this.selectedMonth--
      }
      this.saveSelectedMonthYear()
      this.listTimesheets()
    },

    async listTimesheets() {
      const { selectedMonth, currentYear, $axios } = this
      this.timesheets = await $axios.$get('/timesheets', {
        params: {
          selectedMonth: selectedMonth + 1,
          selectedYear: currentYear,
        },
      })
    },
  },
}
</script>

<style scoped>
::v-deep(table th + th) {
  border-left: 1px solid #dddddd;
}
::v-deep(table td + td) {
  border-left: 1px solid #dddddd;
}

::v-deep(table) {
  border: 1px solid #dddddd;
}
</style>
