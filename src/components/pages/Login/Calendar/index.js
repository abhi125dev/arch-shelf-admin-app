import React, { useState } from 'react'
// import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
// import 'react-big-calendar/lib/sass/styles';
// import 'react-big-calendar/lib/addons/dragAndDrop/styles';


const events=[
    {
        id: 0,
        title: 'All Day Event very long title',
       
        start: new Date(moment()),
        end: new Date(moment().add(2, 'hour')),
      },
      {
        id: 1,
        title: 'Long Event',
        start: new Date(moment().add(3, 'hour')),
        end: new Date(moment().add(6, 'hour')),
      },
    
      {
        id: 2,
        title: 'DTS STARTS',
        start: new Date(2021, 2, 13, 0, 0, 0),
        end: new Date(2016, 2, 20, 0, 0, 0),
      },
    
      {
        id: 3,
        title: 'DTS ENDS',
        start: new Date(2016, 10, 6, 0, 0, 0),
        end: new Date(2016, 10, 13, 0, 0, 0),
      },
    
      {
        id: 4,
        title: 'Some Event',
        start: new Date(2021, 3, 9, 0, 0, 0),
        end: new Date(2021, 3, 10, 0, 0, 0),
      },
      {
        id: 5,
        title: 'Conference',
        start: new Date(2021, 3, 11),
        end: new Date(2021, 3, 13),
        desc: 'Big conference for important people',
      },
      {
        id: 6,
        title: 'Meeting',
        start: new Date(2021, 3, 12, 10, 30, 0, 0),
        end: new Date(2021, 3, 12, 12, 30, 0, 0),
        desc: 'Pre-meeting meeting, to prepare for the meeting',
      },
      {
        id: 7,
        title: 'Lunch',
        start: new Date(2021, 3, 12, 12, 0, 0, 0),
        end: new Date(2021, 3, 12, 13, 0, 0, 0),
        desc: 'Power lunch',
      },
]

const localizer = momentLocalizer(moment)

function Event({ event }) {
    return (
      <span >
        <strong>{event.title}</strong>
        {event.desc && ':  ' + event.desc}
      </span>
    )
  }
  
  function EventAgenda({ event }) {
    return (
      <span>
        <em style={{ color: 'magenta' }}>{event.title}</em>
        <p>{event.desc}</p>
      </span>
    )
  }

const customDayPropGetter = date => {

      return {
       
        style: {
          border: 'none',
        //   padding:10,

        },
      }
  }
  
  const customSlotPropGetter = date => {
   
      return {
        // className: 'special-day',
        style:{background:'#fff', }
      }
  }

const CalendarComponent = () => {

    
    return (
        <div style={{background:'#fff'}}>
           {/* <Calendar
        onChange={onChange}
        value={value}
      /> */}
       <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      formats={{timeGutterFormat:'HH:mm'}}
    //   timeslots={4}
      defaultView={Views.DAY}
      dayPropGetter={customDayPropGetter}
      slotPropGetter={customSlotPropGetter}
      style={{ height: 'calc(100vh-300px)', margin:'20px' }}
      components={{
        // eventWrapper: (el) => {
        //     const { children, event } = { ...el };
          
        //     return <div style={{background:'#e5f1ff', padding: 10, margin:2, borderRadius:5,}}><strong>Sandeep</strong></div>
        //   },
        // eventContainerWrapper:()=>(<div style={{overflow:'auto'}}>Sandeep</div>),
        event: Event,
        
        agenda: {
          event: EventAgenda,
        },
        day:()=><div></div>
      }}
    />
        </div>
    )
}

export default CalendarComponent
