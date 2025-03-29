import React from 'react';

function PreferencesForm() {
  return (
    <div className="preferences-form">
      <h2>Organization Preferences</h2>
      
      <form>
        <div className="form-group">
          <label>Organization Details</label>
          <textarea rows="3"></textarea>
        </div>
        
        <div className="form-group">
          <label>Attachment Preferences Question</label>
          <input type="text" />
        </div>
        
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
          <label>Describe Availability</label>
          <textarea rows="3"></textarea>
        </div>
        
        <div className="form-group">
          <label>Additional Requirements</label>
          <textarea rows="3"></textarea>
        </div>
        
        <div className="form-group">
          <label>Attachment</label>
          <input type="file" />
        </div>
        
        <button type="submit" className="submit-button">Send</button>
        <button type="button" className="secondary-button">Reconstructed</button>
        <button type="button" className="secondary-button">Initiate</button>
      </form>
    </div>
  );
}

export default PreferencesForm;