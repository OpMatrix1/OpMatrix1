import React from 'react';

function StudentSignUp() {
  return (
    <div className="signup-card student">
      <h2>Student</h2>
      <h3>Create your account today</h3>
      
      <button className="signup-button">Sign up</button>
      
      <form className="signup-form">
        <div className="form-group">
          <label>Signature</label>
          <input type="text" />
        </div>
        
        <div className="form-group">
          <label>Name</label>
          <input type="text" />
        </div>
        
        <div className="form-group">
          <label>Date</label>
          <input type="date" />
        </div>
        
        <div className="form-group">
          <label>Content</label>
          <textarea rows="3"></textarea>
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea rows="3"></textarea>
        </div>
      </form>
    </div>
  );
}

export default StudentSignUp;