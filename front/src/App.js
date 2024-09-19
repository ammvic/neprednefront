import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "@fontsource/montserrat";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import UserDash from "./pages/UserDash";
import EmployeeDash from "./pages/EmployeeDash";
import BookingForm from "./pages/BookingForm";
import PhotoGallery from "./components/photoDistribution/PhotoGallery";
import PhotoUpload from "./components/photoDistribution/PhotoUpload";
import AddEmployee from "./pages/AddEmployee";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/gallery" element={<UserDash />} />

        <Route path="/booking" element={<BookingForm />} />
        <Route path="/dashboard" element={<UserDash />} />
        <Route path="/upload-photo" element={<PhotoUpload />} />
        <Route path="/photo-gallery" element={<PhotoGallery />} />
        <Route path="/employeeDash" element={<EmployeeDash />} />
        <Route path="/addEmployee" element={<AddEmployee />} />
        <Route path="/pricing" element={<Pricing />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
