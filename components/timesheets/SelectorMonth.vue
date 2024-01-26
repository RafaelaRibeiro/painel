<template>
  <div class="flex justify-center">
    <v-btn text @click="selectPrevious">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <span class="py-2 px-4"> {{ selectedMonth }}</span>
    <v-btn text @click="selectNext">
      <v-icon>mdi-arrow-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'SelectorMonth',
  props: {
    selectedDate: {
      type: Object,
      required: true,
      default: new Date(),
    },
  },

  computed: {
    selectedMonth() {
      return this.$dayjs(this.selectedDate).format('MMMM YYYY')
    },
    month() {
      return this.$dayjs(this.selectedDate).month()
    },
    year() {
      return this.$dayjs(this.selectedDate).year()
    },
  },

  methods: {
    selectPrevious() {
      const newSelectedDate = dayjs(this.selectedDate).subtract(1, 'month')
      this.$emit('dateSelected', newSelectedDate)
      this.saveSelectedDate()
    },
    selectCurrent() {
      const newSelectedDate = dayjs(this.currentDate)
      this.$emit('dateSelected', newSelectedDate)
      this.saveSelectedDate()
    },
    selectNext() {
      const newSelectedDate = dayjs(this.selectedDate).add(1, 'month')
      this.$emit('dateSelected', newSelectedDate)
      this.saveSelectedDate()
    },
    saveSelectedDate() {
      localStorage.setItem('selectedDate', JSON.stringify(this.selectedDate))
    },
  },

  watch: {
    selectedDate() {
      this.saveSelectedDate()
    },
  },
}
</script>

<style></style>
