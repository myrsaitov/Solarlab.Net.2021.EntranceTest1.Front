import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {pluck, take} from 'rxjs/operators';
import {isNullOrUndefined} from 'util';
import {AdvertisementService} from '../../services/advertisement.service';
import {IAdvertisement} from '../../models/advertisement/i-advertisement';
import {AuthService} from '../../services/auth.service';
import {ToastService} from '../../services/toast.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {CategoryService} from '../../services/category.service';//
import {ICategory} from '../../models/category/category-model';//

@Component({
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss'],
})

export class AdvertisementComponent implements OnInit {
  advertisement: IAdvertisement;
  isAuth = this.authService.isAuth;
  isEditable: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private advertisementService: AdvertisementService,
              private authService: AuthService,
              private toastService: ToastService,
              private categoryService: CategoryService,//
              private modalService: NgbModal) {
  }

  ngOnInit() {


    this.route.params.pipe(pluck('id')).subscribe(advertisementId => {

      this.advertisementService.getAdvertisementById(advertisementId).subscribe(advertisement => {
        //debugger;
        if (isNullOrUndefined(advertisement)) {
          //debugger;
          this.router.navigate(['/']);
          return;
        }

        this.advertisement = advertisement;
        console.log("Get title from API");
        console.log(this.advertisement.title);

        console.log("Get email from API");
        console.log(this.advertisement.email);

        // Запрет редактировать чужое объявление
        if(this.advertisement.email == sessionStorage.getItem('currentUser'))
        {this.isEditable = true;}
          else
          {this.isEditable = false;}
          console.log("this.isEditable");
          console.log(this.isEditable);


          this.categoryService.getCategoryById(this.advertisement.categoryId).subscribe(category => {
          if (isNullOrUndefined(category)) {
            this.router.navigate(['/']);
            return;
          }

          this.advertisement.category = category;

          });

      });
    });

  


  }

  delete(id: number) {
    this.advertisementService.delete(id).pipe(take(1)).subscribe(() => {
      this.toastService.show('Объявление успешено удалено', {classname: 'bg-success text-light'});
      this.router.navigate(['/']);
    });
  }

  openDeleteModal(content: TemplateRef<any>) {
    this.modalService.open(content, {centered: true});
  }
}
