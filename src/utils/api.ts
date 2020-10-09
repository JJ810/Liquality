import axios, { AxiosResponse } from 'axios'

const baseUrl = process.env.REACT_APP_API_URL

export const getData = async (): Promise<AxiosResponse<any>> =>
  await axios.get(`${baseUrl}/swap/marketinfo`)
