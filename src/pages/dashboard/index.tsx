import type { ICardData } from '~/components/ui/card';
import { Card } from '~/components/ui/card';

const cardData: ICardData[] = [
  {
    title: 'Total activity',
    icon: <i className='i-mingcute-riding-line' />,
    count: 9999
  },
  {
    title: 'Total time',
    icon: <i className='i-mingcute-time-duration-line' />,
    count: 9999
  },
  {
    title: 'Total mileage',
    icon: <i className='i-local-codicon-milestone' />,
    count: 9999
  },
  {
    title: 'Total climb',
    icon: <i className='i-mingcute-mountain-2-line' />,
    count: 9999
  },
]

export function Dashboard() {
  return (
    <div className='flex size-full flex-col'>
      <div className="text-3xl font-bold tracking-tight">Dashboard</div>
      <div className='mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4'>
        <Card data={cardData} />
      </div>
      <div className='mt-4 grid h-full gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <div className='rounded-xl border bg-card text-card-foreground shadow md:col-span-2 lg:col-span-4'>
          <div className='flex flex-col space-y-1.5 p-6'>
            <h3 className='font-semibold leading-none tracking-tight'>
              Overview
            </h3>
          </div>
          <div className='p-6 pl-2 pt-0' />
        </div>
        <div className='rounded-xl border bg-card text-card-foreground shadow md:col-span-2 lg:col-span-3'>
          <div className='flex flex-col space-y-1.5 p-6'>
            <h3 className='font-semibold leading-none tracking-tight'>Recent Activity</h3>
            <p className='text-sm text-muted-foreground'>You made 265 activity this month.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
