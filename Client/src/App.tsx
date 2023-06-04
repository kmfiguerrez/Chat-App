import { Link, Route, Routes, useRoutes } from "react-router-dom"
import RegisterForm from "./components/RegisterForm"
import LoginForm from "./components/LoginForm"


function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <LoginForm />
    },
    {
      path: '/register',
      element: <RegisterForm />
    }
  ])

  return (
    <>
      <div className="container">                                    
        {/* <nav>
          <ul>
            <li><Link to="/">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </nav>         */}
        <Routes>
          <Route path="/" element={<LoginForm />}></Route>
          <Route path="/register" element={<RegisterForm />}></Route>
        </Routes>
        
      </div>     
    </>
  )
}


export default App