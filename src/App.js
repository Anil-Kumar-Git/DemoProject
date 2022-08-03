import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./adminPanel/layoutPages/Layout";
import ForgotPassword from "./adminPanel/pages/loginPages/ForgotPassword";
import Dashboard from "./adminPanel/pages/Main";
import List from "./adminPanel/pages/List";
import EditUser from "./adminPanel/pages/EditUser";
import Register from "./adminPanel/pages/Register";
import Login from "./adminPanel/pages/loginPages/Login";
import PrivetComponent from "./adminPanel/components/PrivetComponent";
import MyProfile from "./adminPanel/pages/profilePage/MyProfile";
import Footer from "./adminPanel/layoutPages/Footer";
import Error from "./adminPanel/pages/Error";
import SingUP from "./adminPanel/pages/loginPages/Singup";
import ResetPwd from "./adminPanel/pages/loginPages/ResetPwd"
import ContactUsers from "./adminPanel/pages/ContactUsers";
import ForgotMessage from "./adminPanel/pages/loginPages/forgotMessage";
import LogError from "./adminPanel/pages/loginPages/logError";


function App() {
  // const navigate=useNavigate();
  const [state, setState] = useState([]);
  const [login, setLogin] = useState(false);
  const [islogin,setIslogin]=useState(true)
  const token=localStorage.getItem("token")

  useEffect(()=>{
    if(token){
      setIslogin(false)
      // navigate("/")
    }else{
      setIslogin(true)
    }
  })

   const id="hello"
  const data = (id, result) => {
    const newid = id;
    setState(newid);
  };

  const pageLogin=(event)=>{
  const log=event;
  setLogin(log)
  }

  const pageNotLogin=(event)=>{
    const log=event;
    setLogin(log)
    }


  return (
    <div >
      <BrowserRouter>
        {login?(""):(<Layout />)}
        <div className="background-dark">
        <Routes>
      
       <Route path="/login" element={<Login login={pageLogin}/>} />
        <Route path="/forgot-password" element={<ForgotPassword login={pageLogin}/>}/>
        <Route path="/singup" element={<SingUP login={pageLogin}/>}/>
        <Route path="/reset-password/:token" element={<ResetPwd login={pageLogin}/>}/>
        <Route path="/forgot-message" element={<ForgotMessage login={pageLogin}/>}/>
        <Route path="/*" element={<LogError login={pageLogin}/>} />
           
          <Route element={<PrivetComponent />}>
            <Route path="/" element={<Dashboard loginNot={pageNotLogin} />} />
            <Route path="/list" element={<List data={data} />} />
            <Route path="/edit-user" element={<EditUser State={state} />} />
            <Route path="/add-user" element={<Register />} />
            <Route path="/myprofile" element={<MyProfile/>}/>
            <Route path="/user-contact/" element={<ContactUsers/>}/>
            <Route path="/*" element={<Error />} />
        
          </Route>
          
        </Routes>
        </div>
        {login?(""):(<Footer/>)}
      </BrowserRouter>
    </div>
  );
}

export default App;
