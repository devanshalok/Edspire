import closeModal from './modal';
import React from 'react';
import Dropdown from './dropdown';



export const Form = ({ onSubmit }) => {
  return (
    <><h2 style={{textAlign:"center"}}> Add a Question</h2>

    <Dropdown />
    <form onSubmit={onSubmit}>
          <div className="form-group">
              <label style={{ marginBottom: "10px",marginTop:"15px" }} htmlFor="name">Title</label>
              <input className="form-control" id="name" />
          </div>
          <div className="form-group">
              <label style={{ marginBottom: "10px", marginTop: "15px" }} htmlFor="name">Ask Question</label>
              <textarea className="form-control" id="name" />
          </div>
          <div className="form-group">
              <button style={{ marginTop: "20px", width: "80px", float: "right" }} className="form-control btn btn-primary" type="submit">
                  Add
              </button>
              <button style={{ marginRight: "10px", marginTop: "20px", width: "80px", float: "right" }} className="form-control btn btn-primary close" onClick={closeModal}>
                  Cancel
              </button>
          </div>
      </form></>
  );
};
export default Form;