import { useState } from 'react'
import reactLogo from './assets/react.svg'

import AdminDashboard from './Admin_Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <AdminDashboard/>
    </>
  )
}

export default App
