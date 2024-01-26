<template>
  <div class="mx-2">
    <div
      class="bg-gray-300 flex justify-center mx-1 my-2 pa-2 rounded-md border border-slate-300 font-medium"
    >
      Dados do contato
    </div>

    <div class="ma-2">
      <p class="text-sm">
        <span>Usuário: {{ ticket?.user?.name }}</span>
      </p>
      <p class="text-sm">
        <span> Cliente: {{ client?.trade_name }}</span>
      </p>
      <p class="text-sm break-all">
        <span>E-mail: {{ ticket?.user?.email }}</span>
      </p>
      <p class="text-sm">
        <span>
          <a
            :href="
              'https://api.whatsapp.com/send?phone=' + ticket?.user?.mobile
            "
          >
            Celular: {{ ticket?.user?.mobile }}
          </a>
          <i class="mdi mdi-whatsapp"></i
        ></span>
      </p>
    </div>

    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  props: ['ticket', 'client'],
}
</script>

<style></style>
