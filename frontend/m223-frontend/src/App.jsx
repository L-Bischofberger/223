// src/App.jsx
// src/App.jsx
import React, { useEffect, useState, useContext } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import axios from 'axios';
import { AuthContext, AuthProvider } from './AuthProvider.jsx';


const API_URL = "http://localhost:8080/api/events";

const App = () => {
    const [events, setEvents] = useState([]);
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated) {
            fetchEvents();
        }
    }, [isAuthenticated]);

    const fetchEvents = () => {
        const token = localStorage.getItem('jwt_token');
        axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            const mappedEvents = response.data.map(event => ({
                Id: event.id,
                Subject: event.title,
                StartTime: new Date(event.start),
                EndTime: new Date(event.end),
                IsAllDay: false
            }));
            setEvents(mappedEvents);
        })
        .catch(error => {
            console.error('Fehler beim Laden der Events:', error);
        });
    };

    if (!isAuthenticated) {
        return <div>Bitte einloggen, um den Kalender zu sehen.</div>;
    }

    return (
        <ScheduleComponent height='650px' eventSettings={{ dataSource: events }}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
    );
};

export default App;

/*
//das sit der code der als 3 hiert gestanden ist (21:46  1.5.2024)
import React, { useEffect } from 'react';
import axios from 'axios';

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('jwt_token');
      console.log("Token for API call:", token);
      try {
        const response = await axios.get('http://localhost:8080/api/protected-data', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Protected data:', response.data);
      } catch (error) {
        console.error('Error fetching protected data', error);
      }
    };

    fetchData();
  }, []);

  return <div><h1>Protected Data Page</h1></div>;
};

export default App;*/

/*
//das sit der code der als 2 hiert gestanden ist (15:10  1.5.2024)
import React, { useEffect } from 'react';
import axios from 'axios';

const App = () => {
  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    console.log("Token for API call:", token); // Token-Ausgabe zur Überprüfung
    fetchData(token);
  }, []);

  const fetchData = (token) => {
    axios.get("http://localhost:8080/api/protected-data", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Protected data:', response.data);
    })
    .catch(error => {
      console.error('Error fetching protected data', error);
    });
  };

  return (
    <div>
      <h1>Protected Data Page</h1>
    </div>
  );
};

export default App;*/

  

/*const fetchData = () => {
    const token = localStorage.getItem('jwt_token');
    axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })    
    .then(response => {
        console.log('Daten erfolgreich abgerufen', response.data);
    })
    .catch(error => {
        console.error('Fehler beim Abrufen der Daten', error);
    });
};*/






/*
//das sit der code der zuerst hiert gestanden ist
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import axios from 'axios';
import './App.css';

const API_URL = "http://localhost:8080/api/events";

const App = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        if (!token) {
            console.error('Kein Token gefunden. Bitte einloggen.');
            navigate('/login');
            return;
        }

        axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            const mappedEvents = response.data.map(event => ({
                Id: event.id,
                Subject: event.title,
                StartTime: new Date(event.start),
                EndTime: new Date(event.end),
                IsAllDay: false
            }));
            setEvents(mappedEvents);
        })
        .catch(error => {
            console.error('Fehler beim Laden der Events:', error);
        });
    }, [navigate]);

    return (
        <ScheduleComponent height='650px' eventSettings={{ dataSource: events }}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
    );
};

export default App;*/







/*import React, { useEffect, useState } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import axios from 'axios';
import './App.css';

// Importieren Sie die Syncfusion CSS direkt in Ihrer React-Komponente
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-calendars/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';
import '@syncfusion/ej2-react-schedule/styles/material.css';

const API_URL = "http://localhost:8080/api/events";

const App = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = () => {
        const token = localStorage.getItem('jwt_token');
        if (!token) {
            console.error('Kein Token gefunden. Bitte einloggen.');
            return;
        }

        axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            const mappedEvents = response.data.map(event => ({
                Id: event.id,
                Subject: event.title,
                StartTime: new Date(event.start),
                EndTime: new Date(event.end),
                IsAllDay: false // Dies hängt von Ihrer Eventstruktur ab
            }));
            setEvents(mappedEvents);
        })
        .catch(error => {
            console.error('Fehler beim Laden der Events:', error);
        });
    };

    return (
        <ScheduleComponent height='650px' eventSettings={{ dataSource: events }}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
    );
};

export default App;*/