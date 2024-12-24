import React from 'react'

type CardsProps = {
  title: string
  amount: number | string
  logo: React.ReactNode
  description?: string
}

function Cards(props: CardsProps) {
  return (
    <div className='w-80 bg-slate-100 border-[1px] border-slate-200 rounded-xl px-6 py-4 mx-4 mt-3 hover:scale-105 duration-75 hover:invert'>
      <div className='flex justify-between items-center'>
        <div className='text-xs font-semibold'>
          {props.title}
        </div>
        <div className=' '>
          {props.logo}
        </div>
      </div>
      <div className='value text-2xl pt-2 py-1 font-bold overflow-scroll no-scrollbar'>
        {props.amount}
      </div>
      <div className='text-xs text-slate-400'>
        {props.description}
      </div>
    </div>
  )
}

export default Cards