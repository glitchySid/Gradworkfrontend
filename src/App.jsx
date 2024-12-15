import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/registration.jsx";
import GradWorkLanding from "./pages/homepage.jsx";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<GradWorkLanding />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
