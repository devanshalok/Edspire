import React from 'react';
const Trigger = ({ triggerText, buttonRef, showModal }) => {
  return (
    <button style={{marginTop:"20px"}}
      className="btn btn-lg btn-danger center modal-button"
      ref={buttonRef}
      onClick={showModal}
    >
      {triggerText}
    </button>
  );
};
export default Trigger;
