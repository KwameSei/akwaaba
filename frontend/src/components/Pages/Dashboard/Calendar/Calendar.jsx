import { useState, useEffect } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import { Box, List, ListItem, useTheme, ListItemText, ListItemIcon, ListItemSecondaryAction, IconButton, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { PageHeader } from "../../../partials/pageHeader";
import { tokens } from "../../../partials/theme";

import { useGetEventsQuery} from '../../../features/FeaturedEvents/eventsApi';
import { formatDate } from '@fullcalendar/core'
import './calendar.css';

export const Calendar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { data, error, isLoading } = useGetEventsQuery();
    const [currentEvents, setCurrentEvents] = useState([]);

    useEffect(() => {
        if (data && Array.isArray(data)) {
          setCurrentEvents(
            data.map((event) => ({
              id: event.id,
              title: event.title,
              start_date: new Date(event.start),
              end_date: new Date(event.end),
              allDay: event.allDay,
            }))
          );
        }
      }, [data]);

    const handleDateClick = (selected) => {
        const title = prompt('Please enter a new title for your event');
        const calendarApi = selected.view.calendar;
        calendarApi.unselect(); // clear date selection

        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay
            });
        }
    }

    const handleEventClick = (selected) => {
        if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)) {
            selected.event.remove();
        }
    }

    return (
        <Box className="sidebar" m="20px">
              <PageHeader title="Calendar" subTitle="Showing all events at a glance" />

              <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
                {/* CELENDAR SIDEBAR */}
                <Box className="side-calendar">
                {isLoading ? ( 
                <p>Loading...</p> 
                ) : error ? ( 
                <p>Something went wrong... {error.data}</p> 
                ) : (
                    <>
                    <Typography variant="h6" mb="20px">Events</Typography>
                    <List>
                        {data.map((event) => (
                            <ListItem key={event.id} className="list-item">
                                <ListItemText 
                                    primary={event.title} 
                                    secondary={
                                        <Typography>
                                            {formatDate(event.start_date, 
                                                {year: 'numeric', 
                                                month: 'long', 
                                                day: 'numeric'}
                                            )}
                                        </Typography>
                                    } />
                            </ListItem>
                        ))}
                    </List>     
                    </>
                )}
                </Box>
                {/* Main calendar */}
                <Box className="main-calendar">
                    <FullCalendar
                        plugins={[
                            dayGridPlugin, 
                            timeGridPlugin, 
                            interactionPlugin, 
                            listPlugin
                        ]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                        }}
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={true}
                        events={currentEvents}
                        select={handleDateClick}
                        eventClick={handleEventClick}
                    />
                </Box>
            </Box>
        </Box>
    )
}