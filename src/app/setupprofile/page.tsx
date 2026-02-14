"use client";

import { useState } from "react";
import ProfileDetailF1 from "@/components/registration/profiledetailF1";
import ProfileDetailF2 from "@/components/registration/profiledetailF2";
import ProfileDetailF3 from "@/components/registration/profiledetailF3";
import ChooseService from "@/components/registration/services";

export default function SetupProfilePage() {
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
        return <ChooseService setCurrentPage={setCurrentPage} />;
    }
  };

  return <div>{switchPage()}</div>;
}
