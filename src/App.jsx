import { Routes,Route } from "react-router-dom"
import Register from "./pages/Register"
import { Toaster } from "react-hot-toast"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import PublicRoute from "./components/PublicRoutes"
import PublicLayout from "./layouts/PublicLayout"
import DashboardLayout from "./layouts/DashboardLayout"
import Profile from "./pages/Dashboard/Profile"
import MyLectures from "./pages/Dashboard/MyLectures"
import AllLectures from "./pages/Dashboard/AllLectures"
import { WalletProvider } from "./context/WalletContext";
import LectureDetails from "./components/dashboard/LectureDetails"
import NotificationsPage from "./pages/Dashboard/NotificationsPage"
import SystemPage from "./pages/SystemPage"
import AboutUsPage from "./pages/AboutPage"
import ContactUsPage from "./pages/ContactPage"

function App() {
  
  return(
    <WalletProvider>
      
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>

        {/* Public Layout */}
        <Route element={<PublicRoute><PublicLayout /></PublicRoute>}>
          <Route path="/" element={<Home />} />
          <Route path="/oursystem" element={<SystemPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected Pages */}

        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/lectures/:lectureId" element={<LectureDetails />} />
          {/* <Route path="/dashboard/courses" element={<Courses />} />
          <Route path="/dashboard/settings" element={<Settings />} /> */}
          <Route path="/dashboard/my-lectures" element={<MyLectures />} />
          <Route path="/dashboard/all-lectures" element={<AllLectures />} />
          <Route path="/dashboard/notifications" element={<NotificationsPage />} />
        </Route>
      </Routes>
    </WalletProvider>
  )
}

export default App
