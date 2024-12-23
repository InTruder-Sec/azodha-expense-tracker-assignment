import React from "react"
import Dashboard from "./components/dashboard"
import Navbar from "./components/ui/Navbar"
import Footer from "./components/ui/Footer"

function App() {

  return (
    <>
      <Navbar />
      <div className="text-4xl mt-20">
        <Dashboard />
      </div>
      <Footer />
    </>
  )
}

export default App
