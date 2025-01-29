import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/registration.jsx";
import GradWorkLanding from "./pages/homepage.jsx";
import ElegantProfileForm from "./pages/registration/profiledetailF1.jsx";
import RegistrationHandles from "./pages/registrationhandles.jsx";
import SellerSetupPage from "./pages/profile/profilesetup.jsx";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<GradWorkLanding />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/setupprofile" element={<RegistrationHandles />} />
          <Route path="/setupprofile" element={<ElegantProfileForm/>} />
          <Route path="/sellersetupprofile" element={<SellerSetupPage/>}/>
          <Route path="*" element={<GradWorkLanding />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
