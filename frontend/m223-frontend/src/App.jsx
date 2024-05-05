// src/App.jsx
import React, { useEffect, useState } from 'react';
import { fetchEvents, addEvent, updateEvent, deleteEvent } from './api';
import '@syncfusion/ej2-base/styles/material.css';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, ViewDirective, ViewsDirective } from '@syncfusion/ej2-react-schedule';

const App = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents().then(response => {
      setEvents(response.data.map(event => ({
        Id: event.id,
        Subject: event.title,
        StartTime: new Date(event.startTime),
        EndTime: new Date(event.endTime),
        IsAllDay: event.isAllDay
      })));
    }).catch(error => console.error('Error fetching events:', error));
  }, []);

  const onEventAdded = (e) => {
    // Logge die gesamten Event-Daten zur Überprüfung
    console.log('Event data:', e.data);
  
    // Extrahiere das Event-Objekt aus dem Array, wenn es vorhanden ist
    const event = e.data[0];
  
    if (!event) {
      console.error('Event data is missing or the structure is incorrect');
      return;
    }
  
    // Überprüfe weiterhin, ob alle notwendigen Daten vorhanden sind
    if (!event.Subject || !event.StartTime || !event.EndTime) {
      console.error('Event details are missing');
      return;
    }
  
    const eventData = {
      title: event.Subject,
      startTime: event.StartTime.toISOString(),
      endTime: event.EndTime.toISOString(),
      isAllDay: event.IsAllDay
    };
  
    addEvent(eventData)
      .then(response => {
        setEvents([...events, {
          Id: response.data.id,
          ...eventData
        }]);
      })
      .catch(error => console.error('Error creating event:', error));
  };
  

  const onEventChanged = (e) => {
    const { event } = e.data;
    const eventData = {
      title: event.Subject,
      startTime: event.StartTime.toISOString(),
      endTime: event.EndTime.toISOString(),
      isAllDay: event.IsAllDay
    };
    updateEvent(event.Id, eventData).then(response => {
      setEvents(events.map(evt => evt.Id === event.Id ? { ...evt, ...eventData } : evt));
    }).catch(error => console.error('Error updating event:', error));
  };

  const onEventRemoved = (e) => {
    // Zugriff auf das Event aus dem Datenpaket
    const event = e.data[0]; // Annahme, dass das Event-Objekt im ersten Element des Arrays liegt
  
    // Prüfe, ob das Event-Objekt und die Id vorhanden sind
    if (!event || !event.Id) {
      console.error('Event data is missing or incorrect:', e.data);
      return;
    }
  
    deleteEvent(event.Id).then(() => {
      // Entferne das Event aus dem State
      setEvents(events.filter(evt => evt.Id !== event.Id));
    }).catch(error => console.error('Error deleting event:', error));
  };
  

  return (
    <ScheduleComponent 
      height="550px" 
      eventSettings={{ dataSource: events }} 
      actionBegin={(e) => {
        if (e.requestType === "eventCreate") {
          onEventAdded(e);
        } else if (e.requestType === "eventChange") {
          onEventChanged(e);
        } else if (e.requestType === "eventRemove") {
          onEventRemoved(e);
        }
      }}
    >
      <ViewsDirective>
        <ViewDirective option='Day' />
        <ViewDirective option='Week' />
        <ViewDirective option='WorkWeek' />
        <ViewDirective option='Month' />
        <ViewDirective option='Agenda' />
      </ViewsDirective>
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