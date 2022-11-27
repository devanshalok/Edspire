import React from 'react';

export const Form = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label style={{marginBottom:"10px"}} htmlFor="name">Ask Question</label>
        <textarea className="form-control" id="name" />
      </div>
      <div className="form-group">
        <button style={{marginTop:"20px",width:"80px",float:"right"}} className="form-control btn btn-primary" type="submit">
          Submit
        </button>
        <button style={{marginRight:"10px",marginTop:"20px",width:"80px",float:"right"}} className="form-control btn btn-primary" >
          Cancel
        </button>
      </div>
    </form>
  );
};
export default Form;