import axios from 'axios'

import { Urls } from '../constants'

export const AuthRequest = axios.create({
    baseURL: Urls.BASE_URI,
})

export const Request = axios.create({
    baseURL: Urls.BASE_URI,
})