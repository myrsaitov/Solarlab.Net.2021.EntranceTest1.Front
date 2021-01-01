import {TagModel} from '../tag/tag-model';

export interface ICreateMyEvent {
  title: string;
  body: string;
  myDateTimeStr: string;
  email: string;
  categoryId: number;
  tags: TagModel[];
}

export class CreateMyEvent implements ICreateMyEvent {
  body: string;
  myDateTimeStr: string;
  email: string;
  categoryId: number;
  tags: TagModel[];
  title: string;

  constructor(data?: Partial<ICreateMyEvent>) {
    const defaults: ICreateMyEvent = {
      body: '',
      categoryId: null,
      tags: [],
      title: '',
      myDateTimeStr: '',
      email: '',
      ...data
    };

    this.body = defaults.body;
    this.categoryId = defaults.categoryId;
    this.tags = defaults.tags;
    this.title = defaults.title;
    this.myDateTimeStr = defaults.myDateTimeStr;
    this.email = defaults.email;
  }
}
