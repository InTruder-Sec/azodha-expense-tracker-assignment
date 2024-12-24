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
import { ExpenseContext } from '@/App'
import dataType from '@/data/type'
import { Close } from '@radix-ui/react-dialog'
import { useToast } from '@/hooks/use-toast'

type ExpenseFormValues = {
    title: string | undefined
    amount: number | undefined
    date: Date
}


function ExpenseForm(props: dataType) {
    const { expenses, setExpenses } = React.useContext(ExpenseContext)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(props.date)
    const { toast } = useToast()

    const createExpenseSchema = (props: dataType) =>
        z.object({
            title: z.string().min(1, "Title is required").default(() => props.title || ""),
            amount: z
                .number()
                .min(0.01, "Amount must be greater than 0")
                .default(() => props.amount ?? 0),
            date: z
                .date()
                .refine((date) => date <= new Date(), "Date cannot be in the future")
                .default(() => props.date || new Date()),
        })

    const expenseSchema = createExpenseSchema(props)

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<ExpenseFormValues>({
        resolver: zodResolver(expenseSchema),
        defaultValues: {
            title: props.title || "",
            amount: props.amount ?? 0,
            date: props.date || new Date(),
        },
    })

    const onSubmit = (data: ExpenseFormValues) => {

        if (props.id === -1) {
            setExpenses([...expenses, { id: expenses.length + 1, ...data }]);
            toast({
                title: "Expense added successfully",
                description: `Your expense "${data.title}" of amount ${data.amount} has been added successfully`,
            })
            setValue("title", "")
            setValue("amount", 0)
        } else {
            const updatedExpenses = expenses.map((expense) => {
                if (expense.id === props.id) {
                    return { ...expense, ...data };
                }
                return expense;
            });
            setExpenses(updatedExpenses);
            toast({
                title: "Expense updated successfully",
                description: `Your expense has been updated successfully`,
            })
        }
    }

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader >
                <DialogTitle>{props.id === -1 ? "Add Expense" : "Edit Expense"}</DialogTitle>
                <DialogDescription>
                    {props.id === -1 ? "Add your new expense details!" : "Edit your expense details!"}
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
                <Close>
                    <Button type="submit" className='mt-4'>Submit</Button>
                </Close>
            </form>
        </DialogContent>
    )
}

export default ExpenseForm
