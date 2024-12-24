import React from 'react'
import ExpenseStats from './ExpenseStats'
import ExpenseList from './ExpenseList'
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import Header from '../ui/Header'
import ExpenseForm from './ExpenseForm'


function Dashboard() {

    return (
        <div className='mt-1 sm:mt-6 lg:w-10/12 mx-auto'>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='fixed bottom-4 left-0 right-0 mx-auto w-fit text-base font-semibold p-5 px-8 bg-black hover:bg-white hover:text-black z-20 border-2 border-black'>Add Expense</Button>
                </DialogTrigger>
                <ExpenseForm
                    id={-1}
                    title={undefined}
                    amount={undefined}
                    date={undefined}
                />
            </Dialog>
            <Header title="Your Dashboard" class='' />
            <ExpenseStats />
            <ExpenseList />
        </div>
    )
}

export default Dashboard