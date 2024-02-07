<template>
  <div class="grid grid-cols-5 gap-4 mt-4 min-h-[83vh]">
    <div class="col-span-1 bg-white">
      <ticket-info-client :ticket="ticket" :client="client" />
    </div>
    <div class="col-span-3 bg-white min-h-[83vh] max-h-[80vh] overflow-y-auto">
      <div class="bg-white px-2 py-4 flex items-center justify-between">
        <h1 class="headline font-weight-light mb-4">
          <i>
            <v-icon size="30" class="px-3">mdi-ticket-confirmation</v-icon>
            #{{ ticket.id }} - {{ ticket.subject }}
          </i>
        </h1>
        <div v-if="!edit" class="my-4">
          <v-btn
            class="ma-2 white--text"
            color="primary"
            @click="showEditor = true"
          >
            <v-icon left> mdi-reply </v-icon> <span>Responder</span></v-btn
          >

          <v-btn
            class="ma-2 white--text"
            color="#004011"
            @click="showAnnotation = true"
          >
            <v-icon left> mdi-note-text </v-icon><span> Anotações</span></v-btn
          >
        </div>
      </div>

      <div class="bg-white px-3 py-3">
        <div v-show="showEditor" class="my-3">
          <no-ssr>
            <vue-editor
              placeholder="Escreva aqui..."
              v-model="reply.content"
            ></vue-editor>
          </no-ssr>
          <div class="grid grid-cols-3 m-2">
            <div class="col-span-2">
              <v-file-input
                v-model="files"
                placeholder="Anexe seus documentos"
                label="Anexos"
                multiple
                prepend-icon="mdi-paperclip"
                outlined
                counter
                dense
                show-size
              >
                <template v-slot:selection="{ text }">
                  <v-chip small label color="primary">
                    {{ text }}
                  </v-chip>
                </template>
              </v-file-input>
            </div>
            <div class="justify-self-end">
              <v-btn @click="showEditor = false">Cancelar</v-btn>
              <v-btn
                @click="saveReply"
                color="primary"
                :disabled="!isContentValid"
              >
                <v-icon left> mdi-send </v-icon> Enviar</v-btn
              >
            </div>
          </div>
        </div>

        <div v-show="showAnnotation" class="my-3">
          <no-ssr>
            <vue-editor
              placeholder="Escreva aqui..."
              v-model="annotation.content"
              :editorOptions="{ breaks: false }"
            ></vue-editor>
          </no-ssr>
          <div class="grid grid-cols-3 m-2">
            <div class="col-span-2">
              <v-file-input
                v-model="files"
                placeholder="Anexe seus documentos"
                label="Anexos"
                multiple
                prepend-icon="mdi-paperclip"
                outlined
                counter
                dense
                show-size
              >
                <template v-slot:selection="{ text }">
                  <v-chip small label color="primary">
                    {{ text }}
                  </v-chip>
                </template>
              </v-file-input>
            </div>
            <div class="justify-self-end">
              <v-btn @click="showAnnotation = false">Cancelar</v-btn>
              <v-btn
                @click="saveAnnotation"
                color="primary"
                :disabled="!isAnnotationValid"
              >
                <v-icon left> mdi-send </v-icon> Enviar</v-btn
              >
            </div>
          </div>
        </div>

        <div
          v-for="c in content"
          :key="c.id"
          class="max-w-sm w-full lg:max-w-full lg:flex rounded border border-solid border-gray-500 px-4 py-4 mb-2 elevation-5"
          :class="{
            'bg-blue-100': c.type === 'A',
            'bg-white': c.type !== 'A',
          }"
        >
          <ticket-main-id-item :content="c" @edit="editChild" />
        </div>
      </div>
    </div>

    <div class="col-span-1 bg-white">
      <ticket-info-ticket
        :ticket="ticket"
        :priorities="priorities"
        :categories="categories"
        :situations="situations"
        :agents="agents"
        :approvers="approvers"
      />
    </div>
  </div>
</template>

<script>
import TicketInfoClient from './TicketInfoClient.vue'
import TicketInfoTicket from './TicketInfoTicket.vue'
import TicketMainIdItem from './TicketMainIdItem.vue'
import ticketsService from '~/services/ticketsService'
export default {
  components: { TicketInfoClient, TicketInfoTicket, TicketMainIdItem },
  data() {
    return {
      icon: 'mdi-ticket-confirmation',
      files: [],
      reply: {},
      edit: false,
      annotation: {},
      showEditor: false,
      showAnnotation: false,
      ticket: {
        category_id: null,
        deadline: new Date().toISOString().substring(0, 10),
      },
      client: {},

      content: [],
      priorities: [],
      categories: [],
      situations: [],
      agents: [],
      approvers: [],
      customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ['bold', 'italic', 'underline', 'strike'],
        [
          'align',
          { align: 'center' },
          { align: 'right' },
          { align: 'justify' },
        ],
        [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
        [{ script: 'sub' }, { script: 'super' }],

        [{ indent: '-1' }, { indent: '+1' }],
        [{ color: [] }, { background: [] }],
        ['image', 'code-block'],
      ],

      rules: {
        required: (value) => !!value || 'Campo obrigatório.',
      },
    }
  },

  computed: {
    ticketId() {
      return `#${this.ticket.id} - ${this.ticket.subject}`
    },

    isContentValid() {
      const isValid = this.rules.required(this.reply.content) === true

      return isValid
    },
    isAnnotationValid() {
      const isValid = this.rules.required(this.annotation.content) === true

      return isValid
    },
  },

  async mounted() {
    await this.getTicketById()
    await this.fetchData()
  },

  methods: {
    async saveReply() {
      try {
        const response = await this.$axios.$post(
          `/tickets/${this.$route.params.id}/reply`,
          {
            content: this.reply.content,
            user_id: this.$auth.user.id,
            type: 'R',
          }
        )

        this.ticket_content_id = response.id
        await this.sendFile()
        this.showEditor = false
        this.reply.content = null
        this.getTicketById()
        this.$toast.success('Resposta enviada', {
          position: 'top-center',
        })
      } catch (error) {
        console.error(error)
        this.$toast.error('Erro ao enviar resposta', {
          position: 'top-center',
        })
      }
    },

    async saveAnnotation() {
      try {
        const response = await this.$axios.$post(
          `/tickets/${this.$route.params.id}/reply`,
          {
            content: this.annotation.content,
            user_id: this.$auth.user.id,
            type: 'A',
          }
        )

        this.ticket_content_id = response.id
        await this.sendFile()
        this.showAnnotation = false
        this.annotation.content = null
        this.getTicketById()
        this.$toast.success('Anotação criada', {
          position: 'top-center',
        })
      } catch (error) {
        console.error(error)
        this.$toast.error('Erro ao enviar resposta', {
          position: 'top-center',
        })
      }
    },

    async sendFile() {
      if (!this.files.length) {
        return
      }

      const formData = new FormData()
      for (const file of this.files) {
        formData.append('files', file)
      }

      this.snackbar = {
        show: true,
        text: 'Enviando arquivo...',
        color: 'info',
      }

      this.isUploading = true

      try {
        await ticketsService.uploadFile(this.ticket_content_id, formData)
        this.files = []
      } catch (error) {
        console.error('Falha ao enviar arquivo:', error)
        this.snackbar = {
          show: true,
          text: 'Erro ao enviar arquivo.',
          color: 'error',
        }
      } finally {
        this.isUploading = false
      }
    },
    async getTicketById() {
      try {
        const ticket = await ticketsService.findOne(`${this.$route.params.id}`)
        this.ticket = ticket.ticket
        this.content = ticket.content
        this.client = ticket.client
      } catch (error) {}
    },

    async fetchData() {
      const [
        prioritiesResponse,
        categoriesResponse,
        situationsResponse,
        approversResponse,
        agentsResponse,
      ] = await Promise.all([
        this.$axios.$get('/priorities/'),
        this.$axios.$get('/categories/'),
        this.$axios.$get('/situations/'),
        this.$axios.$get(`/clients/${this.client.id}/approvers`),
        this.$axios.get('/users/agents/'),
      ])

      this.priorities = prioritiesResponse
      this.categories = categoriesResponse
      this.situations = situationsResponse
      this.approvers = approversResponse
      this.agents = agentsResponse.data
    },

    editChild(edit) {
      this.edit = edit
    },
  },
}
</script>

<style></style>
