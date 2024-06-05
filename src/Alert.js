import React, { useState } from 'react';

function Alert(props) {
  const [isVisible, setIsVisible] = useState(true); // Initially visible

  const handleClose = () => {
    setIsVisible(false);
    if (props.onClose) {
      props.onClose(); // Call provided onClose function if available
    }
  };

  return (
    isVisible && (
      <div className="custom-alert">
        <p>{props.message}</p>
        <button onClick={handleClose}>X</button>
      </div>
    )
  );
}

export default Alert;
