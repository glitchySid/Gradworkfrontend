"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProfileDetailF1 from "@/components/registration/profiledetailF1";
import ProfileDetailF3 from "@/components/registration/profiledetailF3";
import ChooseService from "@/components/registration/services";

export default function SetupProfilePage() {
  const router = useRouter();
  const [currentpage, setCurrentPage] = useState(1);
  const [selectedRole, setSelectedRole] = useState<"client" | "freelancer" | null>(
    null,
  );

  const handleSkip = () => {
    router.push("/");
  };

  const switchPage = () => {
    switch (currentpage) {
      case 1:
        return (
          <ChooseService
            setCurrentPage={setCurrentPage}
            setSelectedRole={setSelectedRole}
            onSkip={handleSkip}
          />
        );
      case 2:
        return (
          <ProfileDetailF1
            setCurrentPage={setCurrentPage}
            selectedRole={selectedRole}
          />
        );
      case 3:
        return <ProfileDetailF3 setCurrentPage={setCurrentPage} />;
      default:
        return (
          <ChooseService
            setCurrentPage={setCurrentPage}
            setSelectedRole={setSelectedRole}
            onSkip={handleSkip}
          />
        );
    }
  };

  return <div>{switchPage()}</div>;
}
