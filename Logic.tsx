import React, { useState } from "react";
import ConfirmNavigation from "./ConfirmNavigation";

const FormPage = () => {
  const [isDirty, setIsDirty] = useState(true); // track unsaved changes

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Edit Form</h1>
      {/* Your form logic here */}
      <input
        type="text"
        className="border p-2"
        onChange={() => setIsDirty(true)}
      />

      <ConfirmNavigation when={isDirty} />
    </div>
  );
};

export default FormPage;
