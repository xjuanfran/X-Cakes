import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import CupCakes from "./pages/CupCakes";
import CustomCupCakes from "./pages/CustomCupCakes";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import Buy from "./pages/Buy";
import ShoppingCar from "./pages/ShoppingCar";
import RecoveryPass from "./pages/RecoveryPass";
import ConfirmPass from "./pages/PassConfirm";
import UploadCake from "./pages/UploadCake";

import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<h1>about</h1>} />
          <Route path="/catalogo" element={<CupCakes />} />
          <Route path="/buy" element={<Buy/>} />
          <Route path="/customCupCakes" element={<CustomCupCakes />} />
          <Route path="/recoveryPass" element={<RecoveryPass />} />
          <Route path="/confirmPass" element={<ConfirmPass />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/shoppingCar" element={<ShoppingCar/>} />
            <Route path="create-cake" element={<UploadCake />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
