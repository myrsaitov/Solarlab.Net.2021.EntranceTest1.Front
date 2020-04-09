import { Component, OnInit, Input } from '@angular/core';
import { IAdvertisementModel } from 'src/app/models/advertisement/advertisement-model';

@Component({
  selector: 'app-advertisement-card',
  templateUrl: './advertisement-card.component.html',
  styleUrls: ['./advertisement-card.component.scss']
})
export class AdvertisementCardComponent implements OnInit {

  @Input() advertisement: IAdvertisementModel;

  constructor() { }

  ngOnInit() {
  }

}
