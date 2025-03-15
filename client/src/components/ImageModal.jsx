import React from "react";

const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Student Image</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body text-center">
            <img src={imageUrl} alt="Profile" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
