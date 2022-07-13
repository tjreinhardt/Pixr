import { useState, useEffect } from "react";
import AddToCollectionModal from "./AddToCollectionModal";


function AddToCollectionButton({ imageId }) {
  const [showModal, setShowModal] = useState(false);


  const openModal = () => {
    if (showModal) return;
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!showModal) return;


  }, [showModal]);

  return (
    <div>
      <button onClick={openModal}>Add to Collection</button>
      {showModal && (
        <AddToCollectionModal imageId={imageId} closeModal={closeModal} />
      )}
    </div>
  )
}

export default AddToCollectionButton;
