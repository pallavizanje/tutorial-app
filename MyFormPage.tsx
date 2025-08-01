// pages/MyFormPage.tsx
import React, { useState } from 'react';
import { usePrompt } from '../hooks/usePrompt';
import ConfirmNavigationModal from '../components/ConfirmNavigationModal';

const MyFormPage: React.FC = () => {
  const [isFormDirty, setIsFormDirty] = useState(false);

  const {
    showModal,
    confirmNavigation,
    cancelNavigation
  } = usePrompt(isFormDirty);

  return (
    <>
      <h1>My Form</h1>
      <input
        type="text"
        onChange={() => setIsFormDirty(true)}
        placeholder="Type something..."
      />

      <ConfirmNavigationModal
        show={showModal}
        onConfirm={confirmNavigation}
        onCancel={cancelNavigation}
      />
    </>
  );
};

export default MyFormPage;
