<template>
  <header class="bg-white headerDefault h-16 clipped-right sticky top-0 z-10">
    <nav class="px-2 h-full relative">
      <div class="grid grid-cols-12 h-full content-center">
        <div class="col-span-2">
          <img src="~/assets/logo.jpg" alt="" class="w-48" />
        </div>

        <div class="col-span-7">
          <ul
            class="hidden md:flex md:items-center w-full h-full justify-start"
          >
            <li
              class="text-base hover:text-gray-30"
              v-for="item in items"
              :key="item.id"
            >
              <template v-if="item.subItems">
                <v-menu offset-y bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="#2271a1" text link v-bind="attrs" v-on="on">
                      <span class="font-semibold text-xs">{{
                        item.title
                      }}</span>
                    </v-btn>
                  </template>
                  <v-list class="flex-column">
                    <v-list-item
                      v-for="subItem in item.subItems"
                      :key="subItem.id"
                      :to="subItem.to"
                    >
                      <v-list-item-title>
                        <v-icon small>{{ subItem.icon }}</v-icon>
                        <span class="text-sm">{{ subItem.title }}</span>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
              <v-btn v-else color="#2271a1" text link :to="item.to">
                <span class="font-semibold text-xs">{{ item.title }}</span>
              </v-btn>
            </li>
          </ul>
        </div>
        <div class="col-start-10 col-span-3 flex justify-end items-center">
          <div class="mr-2.5">
            <v-btn icon small><v-icon>mdi-cog</v-icon></v-btn>
          </div>

          <div class="mr-6">
            <span class="relative inline-block">
              <v-btn x-small icon> <v-icon>mdi-bell</v-icon></v-btn>
              <span
                class="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
                >6</span
              >
            </span>
          </div>
          <span
            class="mr-2 uppercase text-xs text-default leading-normal font-semibold tracking-wider whitespace-nowrap"
            >{{ loggedUser }}</span
          >

          <v-menu transition="scale-transition" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="#2271a1" icon v-bind="attrs" v-on="on">
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item :to="'/account'">
                <v-list-item-title>
                  <v-icon left>mdi-account</v-icon>
                  Minha Conta</v-list-item-title
                >
              </v-list-item>

              <v-list-item @click="logout">
                <v-list-item-title>
                  <v-icon left>mdi-logout</v-icon>
                  Sair</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
          <!-- <div class="mr-2.5">
            <v-btn icon small><v-icon>mdi-cog</v-icon></v-btn>
          </div>
          <div>
            <v-btn icon small><v-icon>mdi-logout</v-icon></v-btn>
          </div> -->
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      title: 'Exato Consultoria',
      user: null,

      items: [
        {
          id: '1',
          icon: 'mdi-view-dashboard',
          title: 'Dashboards',
          to: '/dashboards',
        },
        {
          id: '2',
          icon: 'mdi-ticket-confirmation',
          title: 'Chamados',
          to: '/tickets',
        },
        {
          id: '3',
          icon: 'mdi-calendar-clock',
          title: 'Registro de Horas',
          to: '/timesheets',
        },

        {
          id: '4',
          icon: 'mdi-calendar-clock',
          title: 'Negócios',
          subItems: [
            {
              id: '4-1',
              icon: 'mdi-file-document',
              title: 'Contratos',
              to: '/contracts',
            },
            {
              id: '4-2',
              icon: 'mdi-file-chart',
              title: 'Propostas',
              to: '/proposals',
            },
            {
              id: '4-3',
              icon: 'mdi-filter-variant',
              title: 'Funil de Vendas',
              to: '/proposals',
            },
          ],
        },

        { id: '5', icon: 'mdi-poll', title: 'Relatórios', to: '/reports' },

        {
          id: '6',
          icon: 'mdi-file-document-multiple',
          title: 'Cadastros',
          subItems: [
            {
              id: '6-1',
              icon: 'mdi-office-building-plus',
              title: 'Clientes',
              to: '/clients',
            },
            {
              id: '6-',
              icon: 'mdi-account-plus',
              title: 'Usuários',
              to: '/users',
            },
            {
              id: '6-3',
              icon: 'mdi-account-plus',
              title: 'Produtos',
              to: '/products',
            },
          ],
        },
      ],

      menu: [
        { title: 'Minha Conta', icon: 'mdi-account' },
        { title: 'Sair', icon: 'mdi-logout' },
      ],
    }
  },
  computed: {
    loggedUser() {
      return this.$auth.user.name
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>

<style>
</style>
