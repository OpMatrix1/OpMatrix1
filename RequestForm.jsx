import React from 'react';

function RequestForm() {
  return (
    <div className="request-form">
      <h2>Request Information</h2>
      
      <form>
        <div className="form-group">
          <label>Request Title</label>
          <input type="text" />
        </div>
        
        <div className="form-group">
          <label>Submit of Status Lesson</label>
          <input type="text" />
        </div>
        
        <div className="form-group">
          <label>Request Information</label>
          <textarea rows="3"></textarea>
        </div>
        
        <div className="form-group">
          <label>Describe</label>
          <textarea rows="3"></textarea>
        </div>
        
        <div className="form-group">
          <label>Require</label>
          <textarea rows="3"></textarea>
        </div>
        
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default RequestForm;