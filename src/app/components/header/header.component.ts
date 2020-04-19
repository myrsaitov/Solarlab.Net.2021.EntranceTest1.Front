import {AuthService} from '../../services/auth.service';
import {Component} from '@angular/core';
import {BaseService} from 'src/app/services/base.service';
import {ApiUrls} from 'src/app/shared/apiURLs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  isAuth$ = this.authService.isAuth$;


  constructor(
    private authService: AuthService,
    private readonly baseService: BaseService,
    private readonly router: Router,
  ) {
  }


  userName(){

    return this.authService.getUsername();

  }


  logout() {
    this.baseService.post(ApiUrls.logout)
      .then(() => {
        this.router.navigate(['/', 'login']);
      })
      .finally(() => {
        this.authService.deleteSession();
      });
  }

}
