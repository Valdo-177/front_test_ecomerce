import { WithRole } from "@/components/layout/WithRole";
import { UserTable } from "@/components/UserTable";
import React from "react";

const page = () => {
  return (
    <main>
      <h1>Dashboard de Admin</h1>
      <UserTable />
    </main>
  );
};

export default page;
