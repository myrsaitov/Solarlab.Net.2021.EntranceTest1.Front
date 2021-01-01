import {TagModel} from '../tag/tag-model';

export interface ICreateMyEvent {
  title: string;
  body: string;
  myDateTime: string;
  email: string;
  categoryId: number;
  tags: TagModel[];
}

export class CreateMyEvent implements ICreateMyEvent {
  body: string;
  myDateTime: string;
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
      myDateTime: '',
      email: '',
      ...data
    };

    this.body = defaults.body;
    this.categoryId = defaults.categoryId;
    this.tags = defaults.tags;
    this.title = defaults.title;
    this.myDateTime = defaults.myDateTime;
    this.email = defaults.email;
  }
}
