import { DollarSignIcon } from 'lucide-react'
import React from 'react'

function Cards() {
  return (
    <div className='w-80 bg-slate-100 border-[1px] border-slate-200 rounded-xl px-6 py-4 mx-4 mt-3 hover:scale-105 duration-75 hover:invert'>
      <div className='flex justify-between items-center'>
        <div className='text-xs font-semibold'>Total Expenses</div>
        <div className=' '>
          <DollarSignIcon size={18} className='' />
        </div>
      </div>
      <div className='value text-2xl pt-2 py-1 font-bold overflow-scroll no-scrollbar'>$45231.1</div>
      <div className='text-xs text-slate-400'>This month</div>
    </div>
  )
}

export default Cards