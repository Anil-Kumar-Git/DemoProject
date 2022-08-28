
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Pages/loginPages/Login";
import ForgotPassword from "./Pages/loginPages/ForgotPassword";
import ForgotMessage from "./Pages/loginPages/forgotMessage";
import Dashboard from "./Pages/Main";
import List from "./Pages/List";
import EditUser from "./Pages/EditUser";
import Register from "./Pages/Register";
import MyProfile from "./Pages/profilePage/MyProfile";
import ContactUsers from "./Pages/ContactUsers";
import Error from "./Pages/Error";
import ResetPwd from "./Pages/loginPages/ResetPwd"
import Footer from "./Components/layoutPages/Footer";
import Layout from "./Components/layoutPages/Layout";
import PrivetComponent from "./Routes/privetRoute/PrivetComponent";
import ProtectedComponent from "./Routes/protectedRoutes/protectedComponent";


function App() {
  const [login, setLogin] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  },[login]);

  const pageLogin = (event) => {
    const log = event;
    setLogin(log);
  };

  return (
    <div>
      <BrowserRouter>
        {login ? "" : <Layout />}
        <div className="background-dark">
          <Routes>
            <Route element={<ProtectedComponent />}>
              <Route path="/login" element={<Login login={pageLogin} />} />
              <Route
                path="/forgot-password"
                element={<ForgotPassword login={pageLogin} />}
              />
              <Route
                path="/reset-password/:token"
                element={<ResetPwd login={pageLogin} />}
              />
              <Route
                path="/forgot-message"
                element={<ForgotMessage login={pageLogin} />}
              />
            </Route>
            <Route element={<PrivetComponent />}>
              <Route path="/" element={<Dashboard login={pageLogin} />} />
              <Route path="/list" element={<List />} />
              <Route path="/edit-user" element={<EditUser />} />
              <Route path="/add-user" element={<Register />} />
              <Route path="/myprofile" element={<MyProfile />} />
              <Route path="/user-contact/" element={<ContactUsers />} />
            </Route>
            <Route path="/*" element={<Error login={pageLogin} />} />
          </Routes>
        </div>
        {login ? "" : <Footer />}
      </BrowserRouter>
    </div>
  );
}

export default App;
