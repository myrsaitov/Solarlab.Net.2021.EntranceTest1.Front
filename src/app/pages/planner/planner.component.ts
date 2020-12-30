import {AuthService} from '../../services/auth.service';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MyEventService} from '../../services/myevent.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {IMyEvent} from '../../models/myevent/i-myevent';
import {CategoryService} from '../../services/category.service';
import {ICategory} from '../../models/category/category-model';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DashboardComponent implements OnInit {
  myevents$: Observable<IMyEvent[]>;
  categories$: Observable<ICategory[]>;
  isAuth = this.authService.isAuth;

  private myeventsFilterSubject$ = new BehaviorSubject({
    pageSize: 10,
    page: 1,
  });
  myeventsFilterChange$ = this.myeventsFilterSubject$.asObservable();

  private categoryFilterSubject$ = new BehaviorSubject({
    pageSize: 10,
    page: 1,
  });
  categoryFilterChange$ = this.categoryFilterSubject$.asObservable();

  constructor(private authService: AuthService,
              private myeventService: MyEventService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    
    this.myevents$ = this.myeventsFilterChange$.pipe(
      switchMap(myeventsFilter => this.myeventService.getMyEventsList(myeventsFilter)
      ));//*/

     /* 
     this.myevents$ = this.myeventsFilterChange$.pipe(
        switchMap(myeventsFilter => this.myeventService.getMyEventsTagList(myeventsFilter,106)
        ));//*/

        //this.myeventService.getMyEventsTagList(0).
     //this.myevents$ = this.myeventService.getMyEventsTagList(106);
 

    this.categories$ = this.categoryFilterChange$.pipe(
      switchMap(categoryFilter => this.categoryService.getCategoryList(categoryFilter))
    );
    //debugger;
  }

  get myeventsFilter() {
    return this.myeventsFilterSubject$.value;
  }

  updateMyEventsFilterPage(page) {
    this.myeventsFilterSubject$.next({
      ...this.myeventsFilter,
      page
    });
  }
}
