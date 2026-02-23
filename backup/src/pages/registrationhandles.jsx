import ProfileDetailF1 from "./registration/profiledetailF1.jsx";
import ProfileDetailF2 from "./registration/profiledetailF2.jsx";
import ProfileDetailF3 from "./registration/profiledetailF3.jsx";
import ChooseService from "./registration/services.jsx";
import { useState } from "react";

const RegistrationHandles = () => {
  const [currentpage, setCurrentPage] = useState(1);
  const switchPage = () => {
    switch (currentpage) {
      case 1:
        return <ChooseService setCurrentPage={setCurrentPage} />;
      case 2:
        return <ProfileDetailF1 setCurrentPage={setCurrentPage} />;
      case 3:
        return <ProfileDetailF2 setCurrentPage={setCurrentPage} />;
      case 4:
        return <ProfileDetailF3 setCurrentPage={setCurrentPage} />;
      default:
        return <ChooseService />;
    }
  };

  return (
    <div>
      {switchPage()}
    </div>
  );
};

export default RegistrationHandles;
