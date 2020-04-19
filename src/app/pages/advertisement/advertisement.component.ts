import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {pluck, take} from 'rxjs/operators';
import {isNullOrUndefined} from 'util';
import {AdvertisementService} from '../../services/advertisement.service';
import {IAdvertisement} from '../../models/advertisement/i-advertisement';
import {AuthService} from '../../services/auth.service';
import {ToastService} from '../../services/toast.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss'],
})

export class AdvertisementComponent implements OnInit {
  advertisement: IAdvertisement;
  isAuth = this.authService.isAuth;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private advertisementService: AdvertisementService,
              private authService: AuthService,
              private toastService: ToastService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.route.params.pipe(pluck('id')).subscribe(advertisementId => {
      //debugger;
      this.advertisementService.getAdvertisementById(advertisementId).subscribe(advertisement => {
        //debugger;
        if (isNullOrUndefined(advertisement)) {
          //debugger;
          this.router.navigate(['/']);
          return;
        }
        this.advertisement = advertisement;
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
