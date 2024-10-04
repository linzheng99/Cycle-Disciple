import { ofetch } from "ofetch"

import { getLocalStorage } from "./local"

export const apiFetch = ofetch.create({
  baseURL: 'https://www.strava.com/api/v3',
  headers: {
    Authorization: `Bearer ${getLocalStorage('access_token')}`,
  },
})
