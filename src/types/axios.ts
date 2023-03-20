import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
// import { notification } from 'antd'

// const TOKEN_KEY = `${process.env.REACT_APP_LOCALSTORAGE_KEY}`

// const openNotificationWithIcon = (type: "error"|"info", message: string, description: string) => {
//   notification[type]({
//     message,
//     description
//   });
// };

const handleError = async (error: AxiosError) => {
  try {
    const { response } = error
    if (!response) {
      console.log('hadleERR', { response })
      return Promise.reject(response)
    }

    const { status, statusText } = response
    if (401 === status) {
      //     localStorage.removeItem(TOKEN_KEY)
      window.location.reload()
    }
    // openNotificationWithIcon('error', statusCode, message)
    console.log({ statusText, status })
    return Promise.reject(response && response.data)
  } catch (error) {
//     console.log({ error })
  }
}

// const baseURL = `${process.env.REACT_APP_API_URL}`

const appAxios = axios.create({
  //baseURL
})

appAxios.interceptors.response.use((response: AxiosResponse) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log('logAxios',{ response })
  return response
}, handleError)
appAxios.interceptors.request.use((config: AxiosRequestConfig) => {
  const currentToken = localStorage.getItem('TOKEN_KEY')
  if (currentToken) {
    config.headers.Authorization = `Bearer ${currentToken}`
  }
  return config
})

export { appAxios }
