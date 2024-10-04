import * as ScrollArea from '@radix-ui/react-scroll-area';
import React from 'react'

import { cn } from '../../lib/utils';

export function ScrollAreaWrapper({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <>
      <ScrollArea.Root className={cn('overflow-hidden', className)}>
        <ScrollArea.Viewport className='flex h-full flex-col'>
          {children}
          <ScrollArea.Scrollbar
            className="bg-#d9d9d9 hover:bg-#b2b2b2 flex touch-none select-none p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-[#83828d] before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-[44px] before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Scrollbar
            className="flex touch-none select-none bg-black p-0.5 transition-colors duration-[160ms] ease-out hover:bg-black data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
            orientation="horizontal"
          >
            <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-black before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-[44px] before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner className="bg-blackA5" />
        </ScrollArea.Viewport>
      </ScrollArea.Root>
    </>
  )
}
