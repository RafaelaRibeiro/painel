<template>
  <div>
    <v-navigation-drawer
      :mini-variant="mini"
      mini-variant-width="70"
      permanent
      app
    >
      <v-card flat height="20vh" class="d-flex justify-center">
        <v-img
          v-if="mini"
          class="my-3"
          contain
          :src="require('@/assets/icone-exato.png')"
          alt="The Exato icon"
        ></v-img>
        <v-img
          v-else
          class="my-3"
          contain
          :src="require('@/assets/logo-exato.png')"
          alt="The Exato logo"
        ></v-img>
      </v-card>
      <v-divider class="ma-0"></v-divider>

      <el-menu
        style="padding-left: 0"
        router
        :collapse="isCollapse"
        active-text-color=" rgba(140, 26, 27, 1)"
      >
        <el-menu-item
          v-for="item in items"
          :key="item.id"
          :index="item.id"
          :route="item.to"
        >
          <v-icon class="pr-6">{{ item.icon }} </v-icon>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
        <el-menu-item @click="logout">
          <v-icon class="pr-6"> mdi-logout </v-icon>
          <span slot="title">{{ exit }}</span>
        </el-menu-item>
      </el-menu>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mini: true,
      exit: 'Sair',
      isCollapse: true,
      items: [
        { id: '1', icon: 'mdi-view-dashboard', title: 'Dashboard', to: '/' },

        {
          id: '2',
          icon: 'mdi-ticket-confirmation',
          title: 'Tickets',
          to: '/tickets',
        },
        {
          id: '3',
          icon: 'mdi-calendar-clock',
          title: 'Registro de Horas',
          to: '/timesheets',
        },

        { id: '4', icon: 'mdi-poll', title: 'Relatórios', to: '/reports' },

        {
          id: '5',
          icon: 'mdi-file-document-multiple',
          title: 'Cadastros',
          items: [
            {
              icon: 'mdi-office-building-plus',
              title: 'Clientes',
              to: '/clients',
            },
            {
              icon: 'mdi-account-tie',
              title: 'Usuários',
              to: '/users',
            },
          ],
        },

        {
          id: '6',
          icon: 'mdi-office-building-plus',
          title: 'Clientes',
          to: '/clients',
        },
      ],
    }
  },

  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>

<style></style>
