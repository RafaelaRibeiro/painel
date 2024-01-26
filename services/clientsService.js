import axiosInstance from './axios'

const clientsService = {
  async findAllCLients() {
    try {
      const response = await axiosInstance.get(`/clients`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  },

  async findOneClient(id) {
    try {
      const response = await axiosInstance.get(`/clients/${id}`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  },

  async findUsersByClient(client_id) {
    try {
      const response = await axiosInstance.get(
        `/users/${client_id}/users-by-client`
      )
      return response.data
    } catch (error) {}
  },
}

export default clientsService
