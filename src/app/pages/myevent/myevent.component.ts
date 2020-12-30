import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {pluck, take} from 'rxjs/operators';
import {isNullOrUndefined} from 'util';
import {MyEventService} from '../../services/myevent.service';
import {IMyEvent} from '../../models/myevent/i-myevent';
import {AuthService} from '../../services/auth.service';
import {ToastService} from '../../services/toast.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {CategoryService} from '../../services/category.service';//
import {ICategory} from '../../models/category/category-model';//
import { TagModel } from 'src/app/models/tag/tag-model';

@Component({
  templateUrl: './myevent.component.html',
  styleUrls: ['./myevent.component.scss'],
})

export class MyEventComponent implements OnInit {
  myevent: IMyEvent;
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
  div_tag_div_str: string;
  isAuth = this.authService.isAuth;
  isEditable: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private myeventService: MyEventService,
              private authService: AuthService,
              private toastService: ToastService,
              private categoryService: CategoryService,//
              private modalService: NgbModal) {
  }




  ngOnInit() {




    this.route.params.pipe(pluck('id')).subscribe(myeventId => {

      this.myeventService.getMyEventById(myeventId).subscribe(myevent => {
        //debugger;
        if (isNullOrUndefined(myevent)) {
          //debugger;
          this.router.navigate(['/']);
          return;
        }

      this.div_tag_div_str = '';

        myevent.tags.forEach(function (value) 
        {
          
          this.div_tag_div_str += "<div class=\"badge badge-secondary\">" ;
          this.div_tag_div_str += value.tagText;
          this.div_tag_div_str += "</div>&nbsp;&nbsp;";

        },this);




        this.myevent = myevent;
        console.log("Get title from API");
        console.log(this.myevent.title);

        console.log("Get email from API");
        console.log(this.myevent.email);

        // Запрет редактировать чужое событие
        if(this.myevent.email == sessionStorage.getItem('currentUser'))
        {this.isEditable = true;}
          else
          {this.isEditable = false;}
          console.log("this.isEditable");
          console.log(this.isEditable);


          this.categoryService.getCategoryById(this.myevent.categoryId).subscribe(category => {
          if (isNullOrUndefined(category)) {
            this.router.navigate(['/']);
            return;
          }

          this.myevent.category = category;

          });

      });
    });

  


  }

  delete(id: number) {
    this.myeventService.delete(id).pipe(take(1)).subscribe(() => {
      this.toastService.show('Событие успешено удалено', {classname: 'bg-success text-light'});
      this.router.navigate(['/']);
    });
  }

  openDeleteModal(content: TemplateRef<any>) {
    this.modalService.open(content, {centered: true});
  }
}


