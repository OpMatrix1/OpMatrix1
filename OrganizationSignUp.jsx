import React from 'react';

function OrganizationSignUp() {
  return (
    <div className="signup-card organization">
      <h2>Organization</h2>
      <h3>Register your organization</h3>
      
      <button className="signup-button">Sign up</button>
      
      <form className="signup-form">
        <div className="form-group">
          <label>Organization Name</label>
          <input type="text" />
        </div>
        
        <div className="form-group">
          <label>Contact Person</label>
          <input type="text" />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input type="email" />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea rows="3"></textarea>
        </div>
        
        <div className="form-group">
          <label>Requirements</label>
          <textarea rows="3"></textarea>
        </div>
      </form>
    </div>
  );
}

export default OrganizationSignUp;