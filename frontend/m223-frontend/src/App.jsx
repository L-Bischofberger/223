import React, { useEffect, useState } from 'react';
import { fetchEvents, addEvent, updateEvent, deleteEvent, togglePublic } from './api';
import '@syncfusion/ej2-base/styles/material.css';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, ViewDirective, ViewsDirective } from '@syncfusion/ej2-react-schedule';

const App = () => {
  const [isPublic, setIsPublic] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents().then(response => {
      setEvents(response.data.map(event => ({
        Id: event.id,
        Subject: event.title,
        StartTime: new Date(event.startTime),
        EndTime: new Date(event.endTime),
        IsAllDay: event.isAllDay,
        IsPublic: event.isPublic,
        Description: event.description,
        Location: event.location
      })));
    }).catch(error => console.error('Error fetching events:', error));
  }, []);

  const togglePublicState = () => {
    setIsPublic(!isPublic);  
  };

  const onEventAdded = (e) => {
    const event = e.data[0]; 
    if (!event) {
      console.error('Event data is missing or the structure is incorrect');
      return;
    }
  
    const eventData = {
      title: event.Subject,
      startTime: event.StartTime.toISOString(),
      endTime: event.EndTime.toISOString(),
      isAllDay: event.IsAllDay,
      public: isPublic,
      description: event.Description,
      location: event.Location
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
    const event = e.data;
    const eventData = {
      title: event.Subject,
      startTime: event.StartTime.toISOString(),
      endTime: event.EndTime.toISOString(),
      isAllDay: event.IsAllDay,
      description: event.Description,
      location: event.Location
    };
    updateEvent(event.Id, eventData).then(response => {
      setEvents(events.map(evt => evt.Id === event.Id ? { ...evt, ...eventData } : evt));
    }).catch(error => console.error('Error updating event:', error));
  };

  const onEventRemoved = (e) => {
    const event = e.data[0]; 
    if (!event || !event.Id) {
      console.error('Event data is missing or incorrect:', e.data);
      return;
    }
  
    deleteEvent(event.Id).then(() => {
      setEvents(events.filter(evt => evt.Id !== event.Id));
    }).catch(error => console.error('Error deleting event:', error));
  };

  return (
    <div>
      <button onClick={togglePublicState}>
        {isPublic ? "Public" : "Private"}
      </button>
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
    </div>
  );
};

export default App;
