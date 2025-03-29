import React from 'react';
import StudentSignUp from './StudentSignUp.jsx';
import OrganizationSignUp from './OrganizationSignUp.jsx';
import PreferencesForm from './PreferencesForm.jsx';
import RequestForm from './RequestForm.jsx';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Welcome to IAS</h1>
      </header>
      
      <main>
        <section className="signup-section">
          <StudentSignUp />
          <OrganizationSignUp />
        </section>
        
        <section className="organization-forms">
          <PreferencesForm />
          <RequestForm />
        </section>
      </main>
      
      <footer>
        <p>© 2025 CSI341. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;