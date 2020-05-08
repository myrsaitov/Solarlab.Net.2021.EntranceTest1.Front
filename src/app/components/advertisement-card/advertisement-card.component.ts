import {Component, Input} from '@angular/core';
import {IAdvertisement} from '../../models/advertisement/i-advertisement';

@Component({
  selector: 'app-advertisement-card',
  templateUrl: './advertisement-card.component.html',
  styleUrls: ['./advertisement-card.component.scss']
})

export class AdvertisementCardComponent {
  @Input() advertisement: IAdvertisement;



}