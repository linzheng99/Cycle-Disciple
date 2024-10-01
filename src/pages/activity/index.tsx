export function Activity() {
  return (
    <div className="flex size-full rounded-xl border shadow">
      <div className="flex w-60 flex-col border-r">
        <div className="border-b p-2">time search</div>
        <div className="flex-1 p-2">activity</div>
      </div>
      <div className="flex-1">
        <div className="border-b p-2">cards</div>
        <div className="p-2">map</div>
      </div>
    </div>
  )
}
