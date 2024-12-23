import React from 'react'
import Cards from '../ui/Cards'
import { PartyPopper } from 'lucide-react'

function ExpenseStats() {
  return (
    <div className=''>

      <div className='text-4xl sm:text-4xl leading-relaxed px-6 font-bold my-6 sm:my-12 text-center'>
        Here's what you did last month!
        {/* <PartyPopper size={48} className='inline-block md:-mt-5 mx-4 scale-150 md:scale-120' /> */}
      </div>
      <div className='flex flex-wrap mt-6 lg:w-4/6 mx-auto justify-center'>
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </div>
    </div>
  )
}

export default ExpenseStats