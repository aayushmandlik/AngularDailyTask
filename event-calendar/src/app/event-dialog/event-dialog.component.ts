import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../events.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css']
})
export class EventDialogComponent {
  eventForm: FormGroup
  constructor(private fb:FormBuilder, private eventService: EventsService, private dialog:MatDialogRef<EventDialogComponent>){
    this.eventForm = this.fb.group({
      title: ['',Validators.required],
      description: ['',Validators.required],
      date: ['',Validators.required],
      time: ['',Validators.required],
    })
  }

  onSubmit(){
    if(this.eventForm.valid){
      const data = {
        title: this.eventForm.value.title,
        description: this.eventForm.value.description,
        date: this.eventForm.value.date.toDateString(),
        time: this.eventForm.value.time
      }
      this.eventService.addEvent(data).subscribe(()=>{
        this.dialog.close(true)
      })
    }
  }
}
