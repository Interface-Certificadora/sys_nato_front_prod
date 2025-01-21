"use client";

import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { MdDashboard } from "react-icons/md";
export default function BotaoDashboard() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard");
  };

  return (
    <Button
      textColor={"white"}
      variant="link"
      size="sm"
      leftIcon={<MdDashboard />}
      onClick={handleClick}
    >
        DASHBOARD
    </Button>
  );
}
