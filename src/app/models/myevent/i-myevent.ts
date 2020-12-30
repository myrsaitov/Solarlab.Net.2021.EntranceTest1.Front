import {TagModel} from '../tag/tag-model';

export interface IMyEvent {
  id: number;
  title: string;
  body: string;
  email: string;
  category: any;
  categoryId: number;
  comments: any[];
  tags: TagModel[];
}
