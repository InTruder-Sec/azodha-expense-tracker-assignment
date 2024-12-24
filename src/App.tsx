import React from "react"
import Dashboard from "./components/dashboard"
import Navbar from "./components/ui/Navbar"
import Footer from "./components/ui/Footer"
import { expensesData } from "./data/data"
import dataType from "./data/type"
import { Toaster } from "./components/ui/toaster"


// export const ExpenseContext = React.createContext({
//   expenses: expensesData,
//   setExpenses: (expenses: dataType[]) => { },
// })

interface ExpenseContextType {
  expenses: dataType[]
  setExpenses: React.Dispatch<React.SetStateAction<dataType[]>>
}

export const ExpenseContext = React.createContext<ExpenseContextType | undefined>(undefined)


function App() {
  const [expenses, setExpenses] = React.useState(expensesData)

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses }}>
      <Navbar />
      <div className="text-4xl mt-20">
        <Dashboard />
      </div>
      <Footer />
      <Toaster />
    </ExpenseContext.Provider>
  )
}

export default App