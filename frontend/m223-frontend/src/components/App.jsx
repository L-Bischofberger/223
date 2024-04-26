import React, { useState } from 'react';
import Login from './login.jsx';
import Register from './register.jsx';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  
  const handleLogin = () => {
    setLoggedIn(true);
    // Weitere Aktionen nach erfolgreicher Anmeldung
  };

  const handleRegister = () => {
    setLoggedIn(true);
    // Optional: Automatisches Einloggen nach erfolgreicher Registrierung
  };

  return (
    <div>
      <h1>Welcome to My App</h1>
      { loggedIn ? <LoggedInContent /> : (
        <>
          <Login onLogin={handleLogin} />
          <Register onRegister={handleRegister} />
        </>
      )}
    </div>
  );
}

export default App;
// App.jsx   für kalender
/*import React from 'react';
import { ScheduleComponent, Inject, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-react-schedule';
import { withRouter } from 'react-router-dom'; // Importiere withRouter aus react-router-dom
import '../App.css';

class App extends React.Component {
  render() {
    const { isLoggedIn } = this.props; // hole isLoggedIn vom Router
    if (!isLoggedIn) {
      // Weiterleitung zum Login, wenn der Benutzer nicht angemeldet ist
      this.props.history.push('/login');
      return null;
    }

    return (
      <ScheduleComponent>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
      </ScheduleComponent>
    );
  }
}

export default withRouter(App); // Exportiere withRouter(App), um Zugriff auf Router-Props zu erhalten*/
