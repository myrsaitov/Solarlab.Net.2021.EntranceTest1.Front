import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { IAdvertisementModel } from 'src/app/models/advertisement/advertisement-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  advertisements: IAdvertisementModel[];

  constructor(private advertisementService: AdvertisementService) { }

  ngOnInit() {
    this.advertisementService.getAdertisementList().subscribe(response => {
      this.advertisements = response;
    })
  }

}
