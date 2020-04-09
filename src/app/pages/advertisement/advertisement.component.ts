import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { IAdvertisementModel } from 'src/app/models/advertisement/advertisement-model';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {
  id: number;
  advertisement: IAdvertisementModel;

  constructor(private activatedRoute: ActivatedRoute, private advertisementService: AdvertisementService) { }

  ngOnInit() {
    this.id = +this.activatedRoute.snapshot.params['id'];
    this.advertisementService.getAdertisementById(this.id).subscribe(response => {
      this.advertisement = response;
    });
  }

}
