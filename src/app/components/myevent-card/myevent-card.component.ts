import {Component, Input} from '@angular/core';
import {IMyEvent} from '../../models/myevent/i-myevent';


@Component({
  selector: 'app-myevent-card',
  templateUrl: './myevent-card.component.html',
  styleUrls: ['./myevent-card.component.scss']
})

export class MyEventCardComponent {
  @Input() myevent: IMyEvent;



}








