import {TagModel} from '../tag/tag-model';

export interface IAdvertisement {
  id: number;
  title: string;
  body: string;
  category: any;
  categoryId: number;
  comments: any[];
  tags: TagModel[];
}
