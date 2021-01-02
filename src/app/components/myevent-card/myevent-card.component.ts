import {Component, Input} from '@angular/core';
import {IMyEvent} from '../../models/myevent/i-myevent';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {pluck, switchMap, take, takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {MyEventService} from '../../services/myevent.service';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-myevent-card',
  templateUrl: './myevent-card.component.html',
  styleUrls: ['./myevent-card.component.scss']
})

export class MyEventCardComponent {
  @Input() myevent: IMyEvent;
  form: FormGroup;
  myeventId$ = this.route.params.pipe(pluck('id'));
  destroy$ = new Subject();

  constructor(private fb: FormBuilder,
              private myeventService: MyEventService,
              private route: ActivatedRoute) {
}



ngOnInit() {
  this.form = this.fb.group({
    myDateTime: ['']
  });

  this.myeventId$.pipe(switchMap(myeventId => {
    return this.myeventService.getMyEventById(myeventId);
  }), takeUntil(this.destroy$)).subscribe(myevent => {
    //Вписать значения в форму

    this.myDateTime.patchValue(myevent.myDateTime);
    

   


  });



}

get myDateTime() {
  return this.form.get('myDateTime');
}


}

