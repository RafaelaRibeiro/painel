<template>
  <div class="m-0 p-0">
    <div class="m-4 flex items-center">
      <span class="text-2xl">Novo chamado</span>
      <v-spacer></v-spacer>
      <v-btn color="#2271a1" icon @click="$emit('dialogCreate', false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <div class="m-6">
      <div class="-mb-4 flex">
        <div class="w-1/2 mr-4">
          <span> Usuário: </span>
          <v-autocomplete
            v-model="ticket.user_id"
            :items="users"
            item-text="name"
            item-value="id"
            outlined
            dense
            @change="getOrganization"
          >
          </v-autocomplete>
        </div>
        <div class="w-1/2">
          <span> Organização: </span>
          <v-autocomplete
            v-model="ticket.client_id"
            :items="clients"
            item-text="client_name"
            item-value="client_id"
            outlined
            dense
          >
          </v-autocomplete>
        </div>
      </div>
      <div class="-mb-4 flex">
        <div class="w-1/2 mr-4">
          <span> Categoria: </span>
          <v-autocomplete
            v-model="ticket.category_id"
            :items="categories"
            item-text="name"
            item-value="id"
            outlined
            dense
          >
          </v-autocomplete>
        </div>
        <div class="w-1/2">
          <span> Prioridade: </span>
          <v-autocomplete
            v-model="ticket.priority_id"
            :items="priorities"
            item-text="name"
            item-value="id"
            outlined
            dense
          >
          </v-autocomplete>
        </div>
      </div>

      <div>
        <span>Assunto:</span>
        <v-text-field v-model="ticket.subject" outlined dense></v-text-field>
      </div>
      <div>
        <!-- <no-ssr>
          <vue-editor
            placeholder="Escreva aqui..."
            v-model="ticket.content"
          ></vue-editor>
        </no-ssr> -->
        <quill-editor v-model="ticket.content" />
      </div>
      <div class="mt-3">
        <upload @fileInputRef="onFileInputRef" />
      </div>

      <div class="w-1/2">
        <span> Aprovador: </span>
        <v-autocomplete
          v-model="ticket.approver_id"
          :items="users"
          item-text="name"
          item-value="id"
          outlined
          dense
        >
        </v-autocomplete>
      </div>
      <div>
        <v-btn color="primary" @click="saveTicket"><span>Enviar</span></v-btn>
        <v-btn @click="$emit('dialogCreate', false)" color="error"
          ><span>Cancelar</span></v-btn
        >
      </div>
      <v-snackbar v-model="snackbar.show" :color="snackbar.color">
        {{ snackbar.text }}
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import BaseCard from '../UI/BaseCard.vue'
import QuillEditor from '../UI/QuillEditor.vue'
import Upload from '../UI/Upload.vue'

export default {
  components: { BaseCard, Upload, QuillEditor },

  props: ['users', 'priorities', 'categories'],

  data() {
    return {
      icon: 'mdi-ticket-confirmation',
      text: 'Tickets',
      clients: [],
      ticket: {
        priority_id: 2,
        content: '',
      },
      editedContent: '',
      fileInputRef: null,
      ticket_content_id: null,
      snackbar: {
        show: false,
        text: '',
        color: '',
      },
    }
  },

  methods: {
    onFileInputRef(ref) {
      this.fileInputRef = ref
    },
    async saveTicket() {
      const response = await this.$axios.post('/tickets', {
        user_id: this.ticket.user_id,
        client_id: this.ticket.client_id,
        category_id: this.ticket.category_id,
        priority_id: this.ticket.priority_id,
        subject: this.ticket.subject,
        approver_id: this.ticket.approver_id,
        content: this.ticket.content,
      })

      console.log(response.data.TicketContent?.id)
      this.ticket_content_id = response.data.TicketContent?.id
      this.sendFile()
      this.$emit('dialogCreate', false)
      this.$router.push({
        path: `/tickets/${response.data.id}`,
      })
    },

    async sendFile() {
      const { ticket_content_id } = this
      const { fileInputRef } = this

      if (!fileInputRef || !fileInputRef.files.length) {
        console.log('No file selected')
        return
      }

      const formData = new FormData()
      for (const file of fileInputRef.files) {
        formData.append('file', file)
      }

      this.snackbar.show = true
      this.snackbar.text = 'Enviando arquivo...'
      this.snackbar.color = 'info'

      this.isUploading = true

      try {
        await this.$axios.post(`/tickets/${ticket_content_id}/upload`, formData)
        this.selectedFiles = []
        fileInputRef.value = null
        this.$emit('upload')
      } catch (error) {
        console.error(error)
      } finally {
        this.isUploading = false
      }
    },

    async getOrganization() {
      try {
        const response = await this.$axios.$get(
          `users/${this.ticket.user_id}/clients`
        )
        this.clients = response
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
