import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Events } from '../interface/events.interface';
@Component({
  selector: 'app-event-dialog-details',
  templateUrl: './event-dialog-details.component.html',
  styleUrls: ['./event-dialog-details.component.css']
})
export class EventDialogDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Events){}
}
