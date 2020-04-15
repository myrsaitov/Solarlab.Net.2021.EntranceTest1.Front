export interface ICategory {
  id: number;
  name: string;
  parentCategory: ICategory;
  childCategories: ICategory[];
}
