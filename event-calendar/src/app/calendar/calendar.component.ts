import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { Events } from '../interface/events.interface';
import { MatDialog } from '@angular/material/dialog';
import { EventDialogDetailsComponent } from '../event-dialog-details/event-dialog-details.component';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';

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

  constructor(private eventService: EventsService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.generateCalendars();
    this.loadEvents();
  }

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

    for(let i=lastDateofMonth.getDay()+1;i<=6;i++){
      dates.push(new Date(this.currentYear,this.currentMonth+1,i))
    }

    this.calenderDates = dates
    console.log(this.calenderDates)

  }

  previosMonth(){
    if(this.currentMonth==0){
      this.currentMonth = 11
      this.currentYear--;
    }
    else
      this.currentMonth--;
    this.generateCalendars()
  }
  nextMonth(){
    if(this.currentMonth==11){
      this.currentMonth = 0
      this.currentYear++;
    }
    else
      this.currentMonth++;
    this.generateCalendars()
  }

  loadEvents(){
    this.eventService.getAllEvents().subscribe(data => {
      this.events=data
      console.log(this.events);

    })
  }

  openEventDetailsDialog(event: Events,e:MouseEvent){
    e.stopPropagation();
    this.dialog.open(EventDialogDetailsComponent,{width: '500px',data: event})
  }

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

  getWeekStartDate(date: Date){
    const start = new Date(date)
    console.log(date.getDate())
    console.log(date.getDay());

    start.setDate(date.getDate() - date.getDay())
    return start
  }

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

  previousWeek(){
    this.weekStartDate.setDate(this.weekStartDate.getDate() - 7)
    this.generateWeekCalendar();
  }

  nextWeek(){
    this.weekStartDate.setDate(this.weekStartDate.getDate() + 7)
    this.generateWeekCalendar();
  }


  openFormDialog(){
    const dialogForm = this.dialog.open(EventDialogComponent,{width:'500px'})
    dialogForm.afterClosed().subscribe((result)=>{
      this.eventService.addEvent(result).subscribe({
        next: (response)=>{
          this.events.push(response)
        }
      })
    })
  }

}
