import axiosInstance from './axios'

const reportsService = {
  async getTimesheetsByClients(startDate, endDate, clientsIds) {
    try {
      const response = await axiosInstance.post(
        `/reports/timesheets-by-clients`,
        {
          startDate,
          endDate,
          clientsIds,
        }
      )

      return response.data
    } catch (error) {
      console.error('An error occurred while fetching report:', error)
    }
  },
}

export default reportsService
