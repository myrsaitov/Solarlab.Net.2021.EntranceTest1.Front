import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdvertisementService} from '../../services/advertisement.service';
import {pluck, switchMap, take, takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from '../../services/toast.service';
import {CategoryService} from '../../services/category.service';
import {Observable, Subject} from 'rxjs';
import {ICategory} from '../../models/category/category-model';
import {EditAdvertisement, IEditAdvertisement} from '../../models/advertisement/advertisement-edit-model';

@Component({
  selector: 'app-edit-advertisement',
  templateUrl: './edit-advertisement.component.html',
  styleUrls: ['./edit-advertisement.component.scss']
})
export class EditAdvertisementComponent implements OnInit, OnDestroy {
  form: FormGroup;
  categories$: Observable<ICategory[]>;
  advertisementId$ = this.route.params.pipe(pluck('id'));
  destroy$ = new Subject();
  tagstr_0: string;
  tagstr_1: string;
  tagstr_2: string;
  tagstr_3: string;
  tagstr_4: string;
  tagstr_5: string;
  tagstr_6: string;
  tagstr_7: string;
  tagstr_8: string;
  tagstr_9: string;

  constructor(private fb: FormBuilder,
              private advertisementService: AdvertisementService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategoryList({
      pageSize: 1000,
      page: 1,
    });
    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      tags: ['',Validators.required],
      categoryId: ['', Validators.required]
    });
    this.advertisementId$.pipe(switchMap(advertisementId => {
      return this.advertisementService.getAdvertisementById(advertisementId);
    }), takeUntil(this.destroy$)).subscribe(advertisement => {
      //Вписать значения в форму
      this.title.patchValue(advertisement.title);
      this.body.patchValue(advertisement.body);
      this.categoryId.patchValue(advertisement.categoryId);

      var tagindex = 0;

      this.tagstr_0 = "";
      this.tagstr_1 = "";
      this.tagstr_2 = "";
      this.tagstr_3 = "";
      this.tagstr_4 = "";
      this.tagstr_5 = "";
      this.tagstr_6 = "";
      this.tagstr_7 = "";
      this.tagstr_8 = "";
      this.tagstr_9 = "";

      advertisement.tags.forEach(function (value) 
      {
        
        if(tagindex == 0){this.tagstr_0 = value.tagText;}
        if(tagindex == 1){this.tagstr_1 = value.tagText;}
        if(tagindex == 2){this.tagstr_2 = value.tagText;}
        if(tagindex == 3){this.tagstr_3 = value.tagText;}
        if(tagindex == 4){this.tagstr_4 = value.tagText;}
        if(tagindex == 5){this.tagstr_5 = value.tagText;}
        if(tagindex == 6){this.tagstr_6 = value.tagText;}
        if(tagindex == 7){this.tagstr_7 = value.tagText;}
        if(tagindex == 8){this.tagstr_8 = value.tagText;}
        if(tagindex == 9){this.tagstr_9 = value.tagText;}

        tagindex++;
      },this);

      this.tags.patchValue(this.tagstr_0+' '+this.tagstr_1+' '+this.tagstr_2+' '+this.tagstr_3+' '+this.tagstr_4+' '+this.tagstr_5+' '+this.tagstr_6+' '+this.tagstr_7+' '+this.tagstr_8+' '+this.tagstr_9);


    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  get title() {
    return this.form.get('title');
  }

  get body() {
    return this.form.get('body');
  }

  get categoryId() {
    return this.form.get('categoryId');
  }

  get tags() {
    return this.form.get('tags');
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.advertisementId$.pipe(switchMap(id => {
      const model: Partial<IEditAdvertisement> = {
        id: +id,
        title: this.title.value,
        body: this.body.value,
        categoryId: +this.categoryId.value
      };

      return this.advertisementService.edit(new EditAdvertisement(model));
    }), take(1)).subscribe(() => {
      this.toastService.show('Объявление успешено обновлено', {classname: 'bg-success text-light'});
      this.router.navigate(['/']);
    });
  }
}
