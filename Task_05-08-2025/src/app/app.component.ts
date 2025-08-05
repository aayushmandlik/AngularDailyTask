import { Component } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  employees = [
    {id:1, name:'Aayush',email:'aayush@gmail.com',phone:'8963254756',gender:'Male',designation:'Developer'},
    {id:2, name:'Rahul',email:'rahul@gmail.com',phone:'9836521485',gender:'Male',designation:'Manager'},
    {id:3, name:'Amay',email:'amay@gmail.com',phone:'8635921458',gender:'Male',designation:'Accountant'},
    {id:4, name:'Ajay',email:'ajay@gmail.com',phone:'98562356585',gender:'Male',designation:'Sales'},
    {id:5, name:'Yash',email:'yash@gmail.com',phone:'5468254756',gender:'Male',designation:'HR'},

  ]

  emps$= of(this.employees)



  customers = [
    {id:1, name:'Ajay',email:'ajay@gmail.com',phone:'9862531485',gender:'Male',age:20,city:'Mumbai'},
    {id:2, name:'Amay',email:'amay@gmail.com',phone:'9563542863',gender:'Male',age:22,city:'Mumbai'},
    {id:3, name:'Vikas',email:'vikas@gmail.com',phone:'9865325832',gender:'Male',age:30,city:'Mumbai'},
    {id:4, name:'Jay',email:'jay@gmail.com',phone:'9862531485',gender:'Male',age:40,city:'Mumbai'},
    {id:5, name:'Rajesh',email:'rajesh@gmail.com',phone:'9862531485',gender:'Male',age:29,city:'Mumbai'},
    {id:6, name:'Sham',email:'sham@gmail.com',phone:'9862531485',gender:'Male',age:35,city:'Mumbai'}
  ]
}
