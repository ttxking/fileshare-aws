import axios from 'axios'

const baseURL = 'https://e1cfkwgoec.execute-api.ap-southeast-1.amazonaws.com/prod/files'

const axiosFileAPI = axios.create({
  baseURL,
})

export { axiosFileAPI }
