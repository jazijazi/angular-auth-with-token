import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import {Router} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents = [];
  currentUserEmail = "" ;
  constructor(private _eventService: EventService , private _router:Router) { }

  ngOnInit(): void {
    this._eventService.getSpecialEvents().subscribe(
      res => { 
        this.specialEvents = res.events;
        this.currentUserEmail = res.useremail ;
       },
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this._router.navigate(['/login']);
          }
          if(err.status === 248){
            //console.log("wwwwwwwwww");
            //this._router.navigate(['/login']);
          }
        }
      }
    );
  }

}
