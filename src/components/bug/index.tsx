"use client";
import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState, memo, useMemo } from "react";

export const BugReport = memo(() => {
  const [bug, setBug] = useState<any>([]);
  const { data: session } = useSession();
  const user = session?.user;
  const isAdmin = user?.hierarquia === "ADM";

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const response = await fetch(`/api/bug_report`);
        const data = await response.json();
        if (isMounted) {
          setBug(data);
        }
      } catch (error) {
        console.error("Erro ao carregar bug reports:", error);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const bugList = useMemo(() => {
    return bug.map((item: any, index: number) => (
      <Box
        key={item.id || index}
        w={"100%"}
        borderRadius={"15px"}
        bg={"yellowgreen"}
        textAlign={"center"}
      >
        {item.message}
        {isAdmin && <p> - {item.createdAt}</p>}
      </Box>
    ));
  }, [bug, isAdmin]);

  return <>{bugList}</>;
});
