import dayjs from "dayjs"

import type { IActivity } from "~/types"

export interface Props {
  activity: IActivity
}

export function ActivityCard({ activity }: Props) {
  return (
    <div className='flex cursor-pointer gap-4 rounded-xl border p-4 transition-all hover:border-accent'>
      <div className='flex flex-1 flex-col flex-wrap gap-2'>
        <div className='flex flex-row justify-between'>
          <h3 className='font-semibold leading-none tracking-tight'>{activity.name}</h3>
          <div className="flex items-center gap-2 text-accent">
            {
              activity.type.toLowerCase() === 'ride' ? (
                <i className='i-local-bicycle-outdoor text-accent' />
              ) : (
                <i className='i-local-bicycle-indoor text-accent' />
              )
            }
            <p className='text-sm'>{activity.type}</p>
          </div>
        </div>
        <div className='flex flex-wrap gap-2 text-muted-foreground'>
          <p className='center rounded-xl border px-1 text-sm'>
            <i className='i-mingcute-ruler-line' />
            {`${(activity.distance / 1000).toFixed(2)}km`}
          </p>
          <p className='center rounded-xl border px-1 text-sm'>
            <i className='i-mingcute-time-duration-line' />
            {`${(activity.moving_time / 60).toFixed(2)}min`}
          </p>
          <p className='center rounded-xl border px-1 text-sm'>
            <i className='i-mingcute-mountain-2-line' />
            {`${activity.total_elevation_gain}m`}
          </p>
          <p className='center rounded-xl border px-1 text-sm'>
            <i className='i-mingcute-lightning-line' />
            {`${activity.average_watts ? `${activity.average_watts.toFixed(0)}w` : '??'}`}
          </p>
          <p className='center rounded-xl border px-1 text-sm'>
            <i className='i-mingcute-heartbeat-2-line' />
            {`${activity.average_heartrate ? `${activity.average_heartrate.toFixed(0)}bpm` : '??'}`}
          </p>
        </div>
        <div className='flex justify-end'>
          <p className='flex items-center gap-1 text-sm text-muted-foreground'>
            <i className='i-mingcute-calendar-line' />
            {dayjs(activity.start_date).format('YYYY-MM-DD HH:mm:ss')}
          </p>
        </div>
      </div>
    </div>
  )
}
