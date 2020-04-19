import {AuthService} from '../../services/auth.service';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AdvertisementService} from '../../services/advertisement.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {IAdvertisement} from '../../models/advertisement/i-advertisement';
import {CategoryService} from '../../services/category.service';
import {ICategory} from '../../models/category/category-model';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DashboardComponent implements OnInit {
  advertisements$: Observable<IAdvertisement[]>;
  categories$: Observable<ICategory[]>;
  isAuth = this.authService.isAuth;

  private advertisementsFilterSubject$ = new BehaviorSubject({
    pageSize: 10,
    page: 1,
  });
  advertisementsFilterChange$ = this.advertisementsFilterSubject$.asObservable();

  private categoryFilterSubject$ = new BehaviorSubject({
    pageSize: 10,
    page: 1,
  });
  categoryFilterChange$ = this.categoryFilterSubject$.asObservable();

  constructor(private authService: AuthService,
              private advertisementService: AdvertisementService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.advertisements$ = this.advertisementsFilterChange$.pipe(
      switchMap(advertisementsFilter => this.advertisementService.getAdvertisementsList(advertisementsFilter)
      ));
    this.categories$ = this.categoryFilterChange$.pipe(
      switchMap(categoryFilter => this.categoryService.getCategoryList(categoryFilter))
    );
    //debugger;
  }

  get advertisementsFilter() {
    return this.advertisementsFilterSubject$.value;
  }

  updateAdvertisementsFilterPage(page) {
    this.advertisementsFilterSubject$.next({
      ...this.advertisementsFilter,
      page
    });
  }
}
