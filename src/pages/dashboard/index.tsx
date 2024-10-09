import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

import type { IAllRideTotals } from '~/api/athlete';
import { getAthletesStats } from '~/api/athlete';
import { ActivityCard } from '~/components/ui/activityCard';
import { ScrollAreaWrapper } from '~/components/ui/scrollAreaWrapper'
import type { ICardData } from '~/components/ui/viewCard';
import { ViewCard } from '~/components/ui/viewCard';
import { apiFetch } from '~/lib/fetch';
import { useUserStore } from '~/store';
import type { IActivity } from '~/types';

import { OverViewEcharts } from './components/OverViewEcharts';

const createCardData = (stats: IAllRideTotals | null) => [
  {
    title: 'Total activity',
    icon: <i className='i-mingcute-riding-line' />,
    count: stats?.count || 0
  },
  {
    title: 'Total time',
    icon: <i className='i-mingcute-time-duration-line' />,
    count: stats?.elapsed_time ? `${(stats?.elapsed_time / 3600).toFixed(2)}h` : '??'
  },
  {
    title: 'Total mileage',
    icon: <i className='i-local-codicon-milestone' />,
    count: stats?.distance ? `${(stats?.distance / 1000).toFixed(2)}km` : '??'
  },
  {
    title: 'Total climb',
    icon: <i className='i-mingcute-mountain-2-line' />,
    count: stats?.elevation_gain ? `${stats?.elevation_gain}m` : '??'
  },
]


export function Dashboard() {
  const store = useUserStore()
  const [activities, setActivities] = useState<IActivity[]>([])
  const [stats, setStats] = useState<IAllRideTotals | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const cardData = useMemo<ICardData[]>(() => createCardData(stats), [stats]);
  async function getAthlete() {
    if (!store?.user?.id) return
    const { all_ride_totals } = await getAthletesStats(store?.user?.id)
    setStats(all_ride_totals)
  }
  async function getActivity() {
    setIsLoading(true)
    const res = await apiFetch('/athlete/activities', {
      method: 'GET',
      params: {
        // TODO
        before: dayjs('2024-09-30').endOf('day').unix(),
        after: dayjs('2024-09-01').startOf('day').unix(),
      }
    })
    setActivities(res)
    setIsLoading(false)
    return res
  }
  useEffect(() => {
    getActivity()
  }, [])
  useEffect(() => {
    getAthlete()
  }, [store?.user?.id])

  return (
    <div className='flex size-full flex-col'>
      <div className="text-3xl font-bold tracking-tight">Dashboard</div>
      <div className='mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4'>
        <ViewCard data={cardData} />
      </div>
      <div className='mt-4 grid h-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <div className='rounded-xl border bg-card text-card-foreground shadow md:col-span-2 lg:col-span-5'>
          <div className='flex flex-col justify-between space-y-1.5 p-6'>
            <h3 className='font-semibold leading-none tracking-tight'>
              Overview
            </h3>
            <div className='flex items-center gap-2'>
              <p className='text-sm'>
                Recent activity data
              </p>
              <p className='flex items-center text-sm text-theme-accent'>
                <i className='i-mingcute-calendar-line' />
                {dayjs().subtract(5, 'month').startOf('day').format('YYYY-MM-DD')} - {dayjs().endOf('day').format('YYYY-MM-DD')}
              </p>
            </div>
          </div>
          <div className='p-6 pl-2 pt-0' >
            <OverViewEcharts />
          </div>
        </div>
        <div className='rounded-xl border bg-card text-card-foreground shadow md:col-span-2 lg:col-span-2'>
          <div className='flex flex-col space-y-1.5 p-6'>
            <div className='flex justify-between'>
              <h3 className='font-semibold leading-none tracking-tight'>Recent Activity</h3>
              <p className='text-sm text-muted-foreground'>
                more
              </p>
            </div>
            <p className='text-sm text-muted-foreground'>
              You made
              <span className='p-1 text-theme-accent'>
                {activities.length}
              </span>
              activity this month.
            </p>
            {
              isLoading ? <div className='center h-[630px]'><i className="i-mingcute-loading-fill size-8 animate-spin" /></div> : (
                <ScrollAreaWrapper className='h-[636px] max-h-[636px]'>
                  <div className='flex flex-col gap-2'>
                    {
                      activities.map((activity) => (
                        <ActivityCard key={activity.id} activity={activity} />
                      ))
                    }
                  </div>
                </ScrollAreaWrapper>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
