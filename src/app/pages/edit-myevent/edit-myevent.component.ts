import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyEventService} from '../../services/myevent.service';
import {pluck, switchMap, take, takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from '../../services/toast.service';
import {CategoryService} from '../../services/category.service';
import {Observable, Subject} from 'rxjs';
import {ICategory} from '../../models/category/category-model';
import {EditMyEvent, IEditMyEvent} from '../../models/myevent/myevent-edit-model';
import { TagModel } from 'src/app/models/tag/tag-model';

@Component({
  selector: 'app-edit-myevent',
  templateUrl: './edit-myevent.component.html',
  styleUrls: ['./edit-myevent.component.scss']
})
export class EditMyEventComponent implements OnInit, OnDestroy {
  form: FormGroup;
  categories$: Observable<ICategory[]>;
  myeventId$ = this.route.params.pipe(pluck('id'));
  destroy$ = new Subject();
  tagstr: string;
  _tags: TagModel[];


  constructor(private fb: FormBuilder,
              private myeventService: MyEventService,
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
      categoryId: ['', Validators.required],
      myDateTime: ['']
    });
    this.myeventId$.pipe(switchMap(myeventId => {
      return this.myeventService.getMyEventById(myeventId);
    }), takeUntil(this.destroy$)).subscribe(myevent => {
      //Вписать значения в форму
      this.title.patchValue(myevent.title);
      this.body.patchValue(myevent.body);
      this.categoryId.patchValue(myevent.categoryId);
      this.myDateTime.patchValue(myevent.myDateTime);
      this.tagstr = "";
      myevent.tags.forEach(function (value) 
      {
        
        this.tagstr +=' ' + value.tagText;

      },this);

      this.tags.patchValue(this.tagstr);


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

  get myDateTime() {
    return this.form.get('myDateTime');
  }

  get tags() {
    return this.form.get('tags');
  }

  submit() {
    if (this.form.invalid) {
      return;
    }


// Взяли строку с тагами с формы
var TagStr = this.tags.value;

if(TagStr != null)
{

  console.log("TAG string:");
  console.log(TagStr);

  //Убрали все лишние символы, кроме букв и цифр
  //https://stackoverflow.com/questions/1862130/strip-all-non-numeric-characters-from-string-in-javascript
  //https://www.exlab.net/files/tools/sheets/regexp/regexp.pdf
  var TagStr_ = TagStr.replace(/[~!@"'#$%^:;&?*()+=\s]/g, ' ');

  console.log("TAG string with removed non-car symbols:");
  console.log(TagStr_);

  // Разбираем эту строку в массив
  //https://stackoverflow.com/questions/650022/how-do-i-split-a-string-with-multiple-separators-in-javascript
  var arrayOfStrings = TagStr_.split(/[\s,]+/);
  console.log("Splitted TAG string:");
  console.log(arrayOfStrings);
  let loopid = 0;

  arrayOfStrings.forEach(function (value) 
  {
    if((value.length>0)&&(value.length<31)) // Убираем "нулевые строки"
    {
      const tagmodel_loop: TagModel = {
        id: loopid,
        tagText: value  
      }
   
      if(loopid++ == 0)
      {
        // Самый первый элемент массива, а потом работаем пушами
        this._tags = [tagmodel_loop];
      }
      else
      {
        this._tags.push(tagmodel_loop);
      }
    }
  },this); 
  // },this); т.к. this не виден внутри этого цикла !
  //https://stackoverflow.com/questions/15013016/variable-is-not-accessible-in-angular-foreach
}












    this.myeventId$.pipe(switchMap(id => {
      const model: Partial<IEditMyEvent> = {
        id: +id,
        title: this.title.value,
        body: this.body.value,
        tags: this._tags,
        email: sessionStorage.getItem('currentUser'),
        myDateTime: this.myDateTime.value,
        categoryId: +this.categoryId.value
      };

      return this.myeventService.edit(new EditMyEvent(model));
    }), take(1)).subscribe(() => {
      this.toastService.show('Событие успешено обновлено', {classname: 'bg-success text-light'});
      this.router.navigate(['/']);
    });
  }
}
