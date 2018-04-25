import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../event';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: Event;
  id: number;
  private sub: any;

  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
      this.getEvent(String(this.id));

   });
  }
  getEvent(id: string): void {
    this.eventService.getEvent(id)
      .subscribe(event => {
        console.log(event[0]);
        this.event = event[0];
      });
  }

}
