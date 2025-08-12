import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { Events } from '../interface/events.interface';
import { MatDialog } from '@angular/material/dialog';
import { EventDialogDetailsComponent } from '../event-dialog-details/event-dialog-details.component';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currenDate = new Date()
  currentYear = new Date().getFullYear()
  currentMonth = new Date().getMonth()
  calenderDates: Date[] = []
  months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  weekStartDate:Date = new Date()
  weekEndDate:Date = new Date()
  calenderMode: 'Month'|'Week' = 'Month'

  events: Events[] = []

  constructor(private eventService: EventsService, private dialog: MatDialog, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.generateCalendars();
    this.loadEvents();
  }

  /** Generate dates of calendar in month view containing trailing and leading dates of previous and next month to fill the calendar grid
   * @returns {void}
   */
  generateCalendars(){
    const dates = []
    const firstDateofMonth = new Date(this.currentYear,this.currentMonth,1)
    const lastDateofMonth = new Date(this.currentYear,this.currentMonth+1,0)
    const startDayofMonth = firstDateofMonth.getDay()

    console.log(firstDateofMonth)
    console.log(lastDateofMonth)
    console.log(startDayofMonth)

    for(let i=startDayofMonth-1;i>=0;i--){
      dates.push(new Date(this.currentYear,this.currentMonth,-i))
    }

    for(let i=1;i<=lastDateofMonth.getDate();i++){
      dates.push(new Date(this.currentYear,this.currentMonth,i))
    }

    for(let i=1;i<=6-lastDateofMonth.getDay();i++){
      dates.push(new Date(this.currentYear,this.currentMonth+1,i))
    }

    this.calenderDates = dates
    console.log(this.calenderDates)

  }
  /** Navigate to previous month and generate the calendar of that month
   * @returns {void}
   */
  previosMonth(){
    if(this.currentMonth==0){
      this.currentMonth = 11
      this.currentYear--;
    }
    else
      this.currentMonth--;
    this.generateCalendars()
  }

  /** Navigate to next month and generate the calendar of that month
   * @returns {void}
   */
  nextMonth(){
    if(this.currentMonth==11){
      this.currentMonth = 0
      this.currentYear++;
    }
    else
      this.currentMonth++;
    this.generateCalendars()
  }

  /**Load all events from db.json on the date of calendar for which it was created */
  loadEvents(){
    this.eventService.getAllEvents().subscribe(data => {
      this.events=data
      console.log(this.events);

    })
  }

  /** Open dialog to show the event details of that particular date
   * @param {Events} event The specific event object in array to display
   * @param {MouseEvent} e Mouse event to stop propagation
   * @returns {void}
   */

  openEventDetailsDialog(event: Events,e:MouseEvent){
    e.stopPropagation();
    const updateForm = this.dialog.open(EventDialogComponent,{width: '500px',data: event})
    updateForm.afterClosed().subscribe((result)=>{
      this.eventService.updateEvent(result).subscribe({
        next : (response) => {
          const index = this.events.findIndex(e => e.id === response.id)
          this.events[index] = response
          this.snackBar.open(`Event Updated Successfully on ${response.date} at ${response.time}`,'Close',{duration: 5000})
        }
      })
    })
  }

  /** Switch the view between Month view and Week View
   * @returns {void}
   */
  toggleButton(){
    this.calenderMode = this.calenderMode === "Month" ? "Week" : "Month"
    if(this.calenderMode==="Week")
    {
      const todayMonth = new Date()
      if(this.currentMonth===todayMonth.getMonth()){
        this.weekStartDate = this.getWeekStartDate(new Date());
        this.generateWeekCalendar()
      }
      else{
        this.weekStartDate = this.getWeekStartDate(new Date(this.currentYear,this.currentMonth,1));
        this.generateWeekCalendar()
      }
    }
    else{
      this.generateCalendars()
    }
  }

  /**
   *
   * @param {Date} date Switch to Week view of the selected date week
   * @returns {void}
   */
  toggleCard(date: Date){
    this.calenderMode = this.calenderMode === "Month" ? "Week" : "Month"
    if(this.calenderMode==="Week")
    {
      this.weekStartDate = this.getWeekStartDate(new Date(date));
      this.generateWeekCalendar()
    }
    else{
      this.generateCalendars()
    }
  }

  /**
   *
   * @param date
   * @returns {Date} The start date of the selected week dates
   */
  getWeekStartDate(date: Date){
    const start = new Date(date)
    console.log(date.getDate())
    console.log(date.getDay());

    start.setDate(date.getDate() - date.getDay())
    return start
  }

  /**
   * Generate Calendar dates in week view
   * @returns {void}
   */
  generateWeekCalendar(){
    const datesinWeek = []
    const start = new Date(this.weekStartDate)
    for(let i=0;i<7;i++){
      const date = new Date(start)
      date.setDate(start.getDate() + i)
      console.log(date);

      datesinWeek.push(date)
    }

    const end = new Date(this.weekStartDate)
    end.setDate(end.getDate()+6)
    this.weekEndDate = end
    console.log(this.weekEndDate);

    this.calenderDates = datesinWeek
  }

  /**
   * Navigates to previous week and generate calendar of that week
   * @returns {void}
   */
  previousWeek(){
    this.weekStartDate.setDate(this.weekStartDate.getDate() - 7)
    this.generateWeekCalendar();
  }

  /**
   * Navigates to next week and generates calendar of that week
   * @returns {void}
   */
  nextWeek(){
    this.weekStartDate.setDate(this.weekStartDate.getDate() + 7)
    this.generateWeekCalendar();
  }

  /**
   * Opens a dialog containing form to add event on a specific date in calendar
   * @returns {void}
   */
  openFormDialog(){
    const dialogForm = this.dialog.open(EventDialogComponent,{width:'500px'})
    dialogForm.afterClosed().subscribe((result)=>{
      this.eventService.addEvent(result).subscribe({
        next: (response)=>{
          this.events.push(response)
          if(response.date!=undefined)
          this.snackBar.open(`Event Added Successfully on ${response.date} at ${response.time}`,'Close',{duration: 5000})
        }
      })
    })
  }

  openEventList(){
    this.dialog.open(EventDialogDetailsComponent,{width:'1800px',data: this.events})
  }

  getUpcomingEvents(){
    const now = new Date();
    const upcomingEvents = this.events.filter((event)=>new Date(event.date)>now)
    upcomingEvents.sort((a,b)=> new Date(a.date).getTime() - new Date(b.date).getTime())
    // console.log(upcomingEvents);
    return upcomingEvents[0];
  }

  getTodaysEvent(){
    const now = new Date();
    const todaysEvent = this.events.filter((event)=>new Date(event.date).toDateString()==now.toDateString())
    console.log(todaysEvent)
    return todaysEvent
  }

  goToToday(){
    if(this.calenderMode==="Month"){
      this.currentMonth = new Date().getMonth()
      this.generateCalendars()
    }
    else if(this.calenderMode==='Week'){
      this.currenDate = new Date()
      this.generateWeekCalendar
    }
  }

}
