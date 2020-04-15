import {TagModel} from '../tag/tag-model';

export interface IEditAdvertisement {
  id: number;
  title: string;
  body: string;
  categoryId: number;
  tags: TagModel[];
}

export class EditAdvertisement implements IEditAdvertisement {
  id: number;
  body: string;
  categoryId: number;
  tags: TagModel[];
  title: string;

  constructor(data?: Partial<IEditAdvertisement>) {
    const defaults: IEditAdvertisement = {
      id: 0,
      body: '',
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
  }
}
