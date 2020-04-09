import { Injectable } from '@angular/core';
import { IAdvertisementModel } from '../models/advertisement/advertisement-model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  fakeAdertisementList: IAdvertisementModel[] = JSON.parse(JSON.stringify([{"id":1,"title":"Oldsmobile","body":"posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor","categoryId":1},
  {"id":2,"title":"Jeep","body":"nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in","categoryId":1},
  {"id":3,"title":"Dodge","body":"sem duis aliquam convallis nunc proin at turpis a pede","categoryId":1},
  {"id":4,"title":"Mercedes-Benz","body":"velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus","categoryId":5},
  {"id":5,"title":"Ford","body":"justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse","categoryId":5},
  {"id":6,"title":"Volkswagen","body":"aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non","categoryId":2},
  {"id":7,"title":"Pontiac","body":"ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat","categoryId":3},
  {"id":8,"title":"Chrysler","body":"condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum","categoryId":1},
  {"id":9,"title":"Chevrolet","body":"nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam","categoryId":4},
  {"id":10,"title":"Audi","body":"luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis","categoryId":2},
  {"id":11,"title":"Lincoln","body":"neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis","categoryId":2},
  {"id":12,"title":"Mercury","body":"vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non","categoryId":1},
  {"id":13,"title":"Chevrolet","body":"erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam","categoryId":5},
  {"id":14,"title":"Porsche","body":"nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan","categoryId":3},
  {"id":15,"title":"Land Rover","body":"nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac","categoryId":4}]));

  constructor() { }

  getAdertisementList() {
    return of(this.fakeAdertisementList);
  }

  getAdertisementById(id: number) {
    return of(this.fakeAdertisementList.find(item => item.id === id));
  }
}
