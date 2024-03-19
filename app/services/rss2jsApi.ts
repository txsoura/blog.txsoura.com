import axios from 'axios'

const baseURL = 'https://api.rss2json.com/v1/api.json'

export const rss2jsApi = axios.create({
  baseURL,
})
