import {AuthService} from '../../services/auth.service';
import {Component} from '@angular/core';
import {BaseService} from 'src/app/services/base.service';
import {ApiUrls} from 'src/app/shared/apiURLs';
import {Router} from '@angular/router';
import { TagModel } from 'src/app/models/tag/tag-model';
import {MyEventService} from '../../services/myevent.service';
import {IMyEvent} from '../../models/myevent/i-myevent';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
// ntcn
export class HeaderComponent {
  isAuth$ = this.authService.isAuth$;
  div_tag_div_str: string;
  myevent: IMyEvent;

  constructor(
    private authService: AuthService,
    private myeventService: MyEventService,
    private readonly baseService: BaseService,
    private readonly router: Router,
  ) {
  }


  ngOnInit() {



    this.myeventService.getMyEventGetAllTags().subscribe(myevent => {
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

    });



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
