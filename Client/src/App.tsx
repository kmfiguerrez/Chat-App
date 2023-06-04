import { Link, Route, Routes, useRoutes } from "react-router-dom"
import RegisterForm from "./components/RegisterForm"
import LoginForm from "./components/LoginForm"
import Chat from "./components/Chat"


function App() {

  return (
    <>
      <div className="container">                                    
        <Routes>
          <Route path="/" element={<LoginForm />}></Route>
          <Route path="/register" element={<RegisterForm />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
        </Routes>
        
      </div>     
    </>
  )
}


export default App