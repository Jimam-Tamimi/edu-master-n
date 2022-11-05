import LandingPage from "./pages/LandingPage/LandingPage";
import { Routes, Route } from "react-router-dom";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import Register from "./pages/auth/Register";
import { Login } from "./pages/auth/Login";
import TutorSignup from "./pages/auth/TurtorSignup";
import TutorProfile from "./pages/TutorProfile/TutorProfile";
import SearchPage from "./pages/SearchPage/SearchPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ControlledRoutes from "./ControlledRoutes";
import {useSelector} from 'react-redux'
import AlertComponent from "./components/Notification/Notification";

export default function App() {
  const auth = useSelector(state => state.auth)

  
  return (
    <>
  <AlertComponent/>
      <ControlledRoutes show={!auth.isAuthenticated} >
        <Route path="/password-recovery" element={<ForgotPassword />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </ControlledRoutes>

    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tutor-signup" element={<TutorSignup />} />
        <Route path="/tutor/:id/" element={<TutorProfile />} />
        <Route path="/search" element={<SearchPage />} />
      {/* <Route path="/admin" exact component={<Index/>} /> */}
    </Routes>

</>
  );
}
