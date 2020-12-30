import {TagModel} from '../tag/tag-model';

export interface IEditMyEvent {
  id: number;
  title: string;
  body: string;
  email: string;
  categoryId: number;
  tags: TagModel[];
}

export class EditMyEvent implements IEditMyEvent {
  id: number;
  body: string;
  email: string;
  categoryId: number;
  tags: TagModel[];
  title: string;

  constructor(data?: Partial<IEditMyEvent>) {
    const defaults: IEditMyEvent = {
      id: 0,
      body: '',
      email: '',
      categoryId: null,
      tags: [],
      title: '',
      ...data
    };

    this.id = defaults.id;
    this.body = defaults.body;
    this.categoryId = defaults.categoryId;
    this.tags = defaults.tags;
    this.title = defaults.title;
    this.email = defaults.email;
  }
}