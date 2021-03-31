import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import frLocale from '@fullcalendar/core/locales/fr';
import { window } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  options: any;
  eventsModel: any;
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;
  @ViewChild('external') external: ElementRef;
  ngOnInit() {
    // Don't use FullcalendarOption interface
    this.options = {
      editable: true,
      customButtons: {
        myCustomButton: {
          text: 'custom!',
          click: function () {
            alert('clicked the custom button!');
          }
        }
      },
      theme: 'standart', // default view, may be bootstrap
      header: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      columnHeaderHtml: () => {
          return '<b>Friday!</b>';
      },
      locales: [ esLocale, frLocale ],
      locale: 'en',
      // add other plugins
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin]
    };
    new Draggable(this.external.nativeElement, {
      itemSelector: '.fc-event',
      eventData: function(eventEl) {
        return {
          title: eventEl.innerText
        };
      }
  });
  }
  eventClick(model) {
    alert('event click');
  }
  eventDragStop(model) {
    console.log(model);
  }
  dateClick(model) {
    alert('date click');
  }
  updateHeader() {
    this.options.header = {
      left: 'prev,next myCustomButton',
      center: 'title',
      right: ''
    };
  }
  updateEvents() {
    this.eventsModel = [{
      title: 'Updaten Event',
      start: this.yearMonth + '-08',
      end: this.yearMonth + '-10'
    }];
  }
  get yearMonth(): string {
    const dateObj = new Date();
    return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
  }
  dayRender(ev){
    ev.el.addEventListener('dblclick', () => {
       alert('double click!');
    });
  }
}