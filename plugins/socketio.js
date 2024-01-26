import Vue from 'vue'
import io from 'socket.io-client'

const socket = io(process.env.API_URL) // substitua pela URL do seu servidor WebSocket

Vue.prototype.$socket = socket
