import { apiFetch } from '../lib/fetch'

export interface IAllRideTotals {
  count: number
  elapsed_time:number
  elevation_gain:number
  distance: number
  moving_time: number
}

export interface IStats {
  all_ride_totals: IAllRideTotals
  ytd_ride_totals: IAllRideTotals
}

export async function getAthletesStats(id: number): Promise<IStats> {
  const { all_ride_totals, ytd_ride_totals } = await apiFetch(`/athletes/${id}/stats`, {
    method: 'GET',
  })
  return {
    all_ride_totals,
    ytd_ride_totals
  }
}
