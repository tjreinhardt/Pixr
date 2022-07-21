import { useState, useEffect } from "react";
import AddToCollectionModal from "./AddToCollectionModal";
import './AddToCollectionButton.css'

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
    <div className="add-to-collection-wrapper">
      <button className='create-collection-styling' style={{ fontSize: "12px" }} onClick={openModal}>Add to Collection</button>
      {showModal && (
        <AddToCollectionModal />
      )}
    </div>
  )
}

export default AddToCollectionButton;
