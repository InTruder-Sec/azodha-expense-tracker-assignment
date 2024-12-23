import React from 'react'
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '../ui/button'
import { useState } from 'react'
import { CalendarIcon } from 'lucide-react'
import { Popover, PopoverTrigger } from '@radix-ui/react-popover'
import { PopoverContent } from '../ui/popover'
import { Calendar } from "@/components/ui/calendar"
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

type ExpenseFormValues = {
    title: string
    amount: number
    date: Date | undefined
}


const expenseSchema = z.object({
    title: z.string().min(1, "Title is required"),
    amount: z.number().min(0.01, "Amount must be greater than 0"),
    date: z.date().refine((date) => date <= new Date(), "Date cannot be in the future"),
})

function ExpenseForm() {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<ExpenseFormValues>({
        resolver: zodResolver(expenseSchema),
    })
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

    const onSubmit = (data: ExpenseFormValues) => {
        console.log(data)
        // Add your form submission logic here
    }


    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Add Expense</DialogTitle>
                <DialogDescription>
                    Add your new expense details!
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <Label htmlFor="title">Title:</Label>
                    <Input type="text" id="title" {...register("title")} />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>
                <div className='mb-4'>
                    <Label htmlFor="amount">Amount:</Label>
                    <Input type="number" step="0.01" id="amount" {...register("amount", { valueAsNumber: true })} />
                    {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
                </div>
                <div className='mb-4 justify-between items-center'>
                    <Label htmlFor="date">Date: </Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className={selectedDate ? "w-full justify-start text-left font-normal" : "w-full justify-start text-left font-normal text-muted-foreground"}>
                                {selectedDate ? selectedDate.toLocaleDateString() : "Pick a date"}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => {
                                    setSelectedDate(date)
                                    setValue("date", date)
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                </div>
                <Button type="submit" className='mt-4'>Submit</Button>
            </form>
        </DialogContent>

    )
}

export default ExpenseForm