import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdvertisementService} from '../../services/advertisement.service';
import {CreateAdvertisement, ICreateAdvertisement} from '../../models/advertisement/advertisement-create-model';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ToastService} from '../../services/toast.service';
import {CategoryService} from '../../services/category.service';
import {Observable} from 'rxjs';
import {ICategory} from '../../models/category/category-model';
import { TagModel } from 'src/app/models/tag/tag-model';

@Component({
  selector: 'app-create-advertisement',
  templateUrl: './create-advertisement.component.html',
  styleUrls: ['./create-advertisement.component.scss']
})
export class CreateAdvertisementComponent implements OnInit {
  form: FormGroup;
  categories$: Observable<ICategory[]>;
  _tags: TagModel[]; ///MKM

  constructor(private fb: FormBuilder,
              private advertisementService: AdvertisementService,
              private categoryService: CategoryService,
              private router: Router,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      tags: [null],
      categoryId: [null, Validators.required]
    });
    this.categories$ = this.categoryService.getCategoryList({
      pageSize: 1000,
      page: 1,
    });
    //debugger;
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

    const model: Partial<ICreateAdvertisement> = {
      title: this.title.value,
      body: this.body.value,
      tags: this._tags,
      email: sessionStorage.getItem('currentUser'),
      categoryId: +this.categoryId.value
    };

    this.advertisementService.create(new CreateAdvertisement(model)).pipe(take(1)).subscribe(() => {
      this.toastService.show('Объявление успешено добавлено', {classname: 'bg-success text-light'});
      this.router.navigate(['/']);
    });
  }
}

// Как сейчас выглядит отправка в UI
/*
 {
  body: "jh56rj65e",
  categoryId: 2,
  tags: Array(0),
  title: "y56yh56t",
  email: "user@test.ru"
}
*/

// Как выглядит в сваггере
/*
{
  body:"Продам квадрацикл",
  categoryId:1,
  tags:[{id:0,tagText:"квадроцикл"}]
  title:"Продам",
  email:"user@test.ru",
  deleted:true,
}
*/

/*
{\"title\":\"string\",\"body\":\"string\",\"email\":\"string\",\"deleted\":true,\"categoryId\":1,\"tags\":[{\"id\":0,\"tagText\":\"string\"}]}"
*/