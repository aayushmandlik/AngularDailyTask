import { Component, ElementRef, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../events.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Events } from '../interface/events.interface';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css']
})
export class EventDialogComponent implements OnInit {
  eventForm!: FormGroup
  isEdit = false
  constructor(private fb:FormBuilder, private eventService: EventsService, private dialog:MatDialogRef<EventDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Events){

  }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      title: ['',Validators.required],
      description: ['',Validators.required],
      date: ['',Validators.required],
      time: ['',Validators.required],
      id: ['']
    })
    if(this.data){
      this.isEdit = true
      this.eventForm.patchValue({...this.data, date: new Date(this.data.date)})
    }
  }

  onSubmit(){
    if(this.eventForm.valid){
      const data: Events = {
        title: this.eventForm.value.title,
        description: this.eventForm.value.description,
        date: this.eventForm.value.date.toDateString(),
        time: this.eventForm.value.time
      }
      if(this.isEdit){
        data.id = this.eventForm.value.id
      }
      this.dialog.close(data)
    }
  }

  onDelete(id?:number){
    if(confirm('Are you Sure ?')){
      this.eventService.deleteEvent(id).subscribe(()=>this.dialog.close(true))
    }
  }
}


// import { Component, ElementRef } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { EventsService } from '../events.service';
// import { MatDialogRef } from '@angular/material/dialog';

// @Component({
//   selector: 'app-event-dialog',
//   templateUrl: './event-dialog.component.html',
//   styleUrls: ['./event-dialog.component.css']
// })
// export class EventDialogComponent {
//   eventForm: FormGroup
//   constructor(private fb:FormBuilder, private eventService: EventsService, private dialog:MatDialogRef<EventDialogComponent>){
//     this.eventForm = this.fb.group({
//       title: ['',Validators.required],
//       description: ['',Validators.required],
//       date: ['',Validators.required],
//       time: ['',Validators.required],
//     })
//   }

//   onSubmit(){
//     if(this.eventForm.valid){
//       const data = {
//         title: this.eventForm.value.title,
//         description: this.eventForm.value.description,
//         date: this.eventForm.value.date.toDateString(),
//         time: this.eventForm.value.time
//       }
//       this.dialog.close(data)
//     }
//   }
// }
