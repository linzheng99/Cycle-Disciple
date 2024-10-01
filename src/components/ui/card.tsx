import { cloneElement } from "react"

export interface ICardData {
  title: string
  icon: React.JSX.Element
  count: number | string
}

interface Props {
  data: ICardData[]
}

export function Card(props: Props) {
  const { data } = props
  return (
    <>
      {
        data.map(item => {
          return (
            <div className="rounded-xl border bg-card text-card-foreground shadow" key={item.title}>
              <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                <h3>
                  {item.title}
                </h3>
                {cloneElement(item.icon, { className: `size-4 ${item.icon.props.className}` })}
              </div>
              <div className="p-6 pt-0">
                <span className="text-2xl font-bold"> {item.count} </span>
              </div>
            </div>
          )
        })
      }
    </>
  )
}
