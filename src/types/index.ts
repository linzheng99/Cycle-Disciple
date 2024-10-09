export interface IActivity {
  id: number
  type: string
  name: string
  start_date: string
  distance: number
  moving_time: number
  elapsed_time: number
  total_elevation_gain: number
  kilojoules: number
  device_watts: boolean
  average_watts: number
  average_cadence: number
  has_heartrate: boolean
  average_heartrate: number
  max_heartrate: number
  achievement_count: number
}

export interface IStravaUser {
  id: number
  name: string
  firstname: string
  lastname: string
  weight?: number
  city?: string
  country?: string
}

export interface IUser {
  id: number
  name: string
  weight?: number
  city?: string
  country?: string
}
