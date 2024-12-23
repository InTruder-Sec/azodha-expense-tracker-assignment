import React from 'react'

function Footer() {
    return (
        <div className='h-36 absolute z-20 text-xs w-full bg-black text-white mt-32'>
            <div className=''>
                <div className='text-4xl pt-10 w-fit mx-auto'>
                    Expense Tracker
                </div>
                <div className='w-fit mx-auto mt-4'>
                    © 2024 Expense Tracker. All rights reserved.
                </div>
            </div>
        </div>
    )
}

export default Footer