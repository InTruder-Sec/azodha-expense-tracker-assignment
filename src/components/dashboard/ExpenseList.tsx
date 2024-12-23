import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { expenses } from '../../data/data'
import Header from '../ui/Header'
import { CircleMinus, EditIcon } from 'lucide-react'
import { Button } from '../ui/button'
import ExpenseForm from './ExpenseForm'
import { Dialog, DialogTrigger } from '../ui/dialog'

const ITEMS_PER_PAGE = 10;

function ExpenseList() {
    const [currentPage, setCurrentPage] = useState(1);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentExpenses = expenses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className='lg:w-8/12 mx-auto text-lg mt-20'>
            <Header title='Your recent expenses' class="text-base my-10" />
            <div className='list px-4 sm:w-10/12 mx-auto'>
                <Table>
                    <TableHeader>
                        <TableRow className=''>
                            <TableHead>Title</TableHead>
                            <TableHead className="w-[100px]">Amount</TableHead>
                            <TableHead className="w-[100px]">Edit</TableHead>
                            <TableHead className="w-[50px]">Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentExpenses.map((expense, index) => (
                            <TableRow key={index} className='hover:bg-slate-300 '>
                                <TableCell>{expense.title}</TableCell>
                                <TableCell>{expense.amount}</TableCell>
                                <TableCell className='cursor-pointer'>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <EditIcon size={18} />
                                        </DialogTrigger>
                                        <ExpenseForm />
                                    </Dialog>
                                </TableCell>
                                <TableCell className='cursor-pointer'>
                                    <AlertDialog>
                                        <AlertDialogTrigger>
                                            <CircleMinus size={18} className='mx-auto' />
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete your expense.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex justify-between items-center mt-4 border-t-2 border-t-slate-300 pt-4">
                    <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
                        Previous
                    </Button>
                    <span className="mx-2 text-xs">Page {currentPage}</span>
                    <Button onClick={handleNextPage} disabled={startIndex + ITEMS_PER_PAGE >= expenses.length}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ExpenseList;