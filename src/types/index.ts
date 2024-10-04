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
