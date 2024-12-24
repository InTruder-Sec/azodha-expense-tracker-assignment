import React from 'react'
import Cards from '../ui/Cards'
import { ArrowUpDown, HandCoins, PartyPopper, Wallet } from 'lucide-react'
import { ExpenseContext } from '@/App'
import { DollarSignIcon } from 'lucide-react'

function ExpenseStats() {
  const context = React.useContext(ExpenseContext)

  const { expenses } = context || { expenses: [] }

  // Generate total monthly expenses, total transactions, average transaction amount and highest transaction amount
  const stats = {
    totalMonthlyExpenses: 0,
    totalTransactions: 0,
    averageTransactionAmount: 0,
    highestTransactionAmount: 0
  }

  // Calculate expenses for the current month
  const currentMonth = new Date().getMonth() + 1
  expenses.forEach((expense) => {
    const expenseMonth = expense.date ? new Date(expense.date).getMonth() + 1 : 0;
    if (expenseMonth === currentMonth) {
      stats.totalMonthlyExpenses += expense.amount || 0
      stats.totalTransactions += 1
      stats.averageTransactionAmount = stats.totalMonthlyExpenses / stats.totalTransactions
      stats.highestTransactionAmount = Math.max(stats.highestTransactionAmount, expense.amount || 0)
    }
  })


  return (
    <div className=''>
      <div className='text-4xl sm:text-4xl leading-relaxed px-6 font-bold my-6 sm:my-12 text-center'>
        Here's what you did last month!
        <PartyPopper size={36} className='inline-block md:-mt-5 mx-4 scale-125 md:scale-120' />
      </div>
      <div className='flex flex-wrap mt-6 lg:w-4/6 mx-auto justify-center'>
        <Cards
          title="Total Monthly Expenses"
          amount={"$" + stats.totalMonthlyExpenses}
          logo={<Wallet />}
          description='Great going!'
        />
        <Cards
          title="Total Transactions"
          amount={stats.totalTransactions}
          logo={<ArrowUpDown />}
          description='Keep it up!'
        />
        <Cards
          title="Average Transaction Amount"
          amount={"$" + stats.averageTransactionAmount.toFixed(2)}
          logo={<DollarSignIcon />}
          description='Not bad!'
        />
        <Cards
          title="Highest Transaction Amount"
          amount={"$" + stats.highestTransactionAmount}
          logo={<HandCoins />}
          description='Wow!'
        />
      </div>
    </div>
  )
}

export default ExpenseStats