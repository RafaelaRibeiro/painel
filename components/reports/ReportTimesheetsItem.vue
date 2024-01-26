<template>
  <div class="grid grid-cols-12 gap-1">
    <div class="col-span-2 my-2">
      <span class="text-sm"> {{ reportTimesheets.name }}</span>
    </div>
    <div class="col-span-3 my-2">
      <span class="text-sm"> {{ reportTimesheets.trade_name }}</span>
    </div>
    <div class="col-span-1 my-2">
      <span class="text-sm"> {{ reportTimesheets.date }}</span>
    </div>
    <div class="col-span-1 my-2">
      <span class="text-sm">{{ reportTimesheets.start_time }}</span>
    </div>
    <div class="col-span-1 my-2 text-center">
      <span class="text-sm"> {{ reportTimesheets.end_time }}</span>
    </div>
    <div class="col-span-1 my-2 text-center">
      <span class="text-sm"> {{ reportTimesheets.tempo }}</span>
    </div>
    <div class="col-span-1 my-2 text-center">
      <span class="text-sm"> {{ reportTimesheets.price }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['reportTimesheets'],
}
</script>

<style>
</style>
