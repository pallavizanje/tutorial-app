// hooks/useBlocker.ts
import React, { useState } from "react";
import ConfirmNavigation from "./ConfirmNavigation";

const FormPage = () => {
  const [isDirty, setIsDirty] = useState(true); // Set to true when form is edited

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">My Form Page</h1>
      {/* Your form content here */}
      <ConfirmNavigation when={isDirty} />
    </>
  );
};

export default FormPage;
