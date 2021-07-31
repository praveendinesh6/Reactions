import axios from 'axios'

export const constructBaseURL = () => {
  let baseURL = 'https://artful-iudex.herokuapp.com/'

  if (process.env.APP_URL) {
    baseURL = process.env.APP_URL
  }

  return baseURL
}

axios.defaults.baseURL = constructBaseURL()

const rest = axios.create({
  withCredentials: true,
  headers: {
    'X-Device-Type': 'Web',
  },
})

rest.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    let response = error['response']

    // If no response, directly send error back to callee
    if (response) response = error
    return Promise.reject(response)
  }
)

export default rest;