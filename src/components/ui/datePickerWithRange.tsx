import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import * as React from "react"
import type { DateRange } from "react-day-picker"

import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

export function DatePickerWithRange({
  className,
  onDateChange, // 新增属性
}: React.HTMLAttributes<HTMLDivElement> & { onDateChange?: (date: DateRange | undefined) => void }) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // 默认当前月开始
    to: addDays(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), 0), // 默认当前月结束
  })

  React.useEffect(() => {
    if (onDateChange && date?.from && date?.to) {
      onDateChange(date);
    }
  }, [date]);

  const handleDateSelect = (newDate: DateRange | undefined) => {
    if (newDate && (newDate.from !== date?.from || newDate.to !== date?.to)) {
      setDate(newDate);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 size-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect} // 使用新的处理函数
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
