import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/ui/Layout'
import { Login } from './pages/Login'
import { Signup } from './pages/SignUp'

function App() {

  return (
    <Layout>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </Layout>
    )
}

export default App
