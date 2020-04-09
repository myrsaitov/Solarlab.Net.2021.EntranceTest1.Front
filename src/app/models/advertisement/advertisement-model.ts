import { TagModel } from '../tag/tag-model';

export interface IAdvertisementModel {
        id: number;
        title: string;
        body: string;
        categoryId: number;
        comments?: unknown[];
        tags?: Array<TagModel>;
}
