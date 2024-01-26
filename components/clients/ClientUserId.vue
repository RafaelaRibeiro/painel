<template></template>

<script>
export default {
  data() {
    return {
      user: {},
    }
  },

  methods: {
    async getUserById() {
      this.user = await this.$axios.$get(
        `/clients/${this.$route.params.id}/users/${this.$route.params.uid}`
      )
    },
  },
}
</script>

<style></style>
