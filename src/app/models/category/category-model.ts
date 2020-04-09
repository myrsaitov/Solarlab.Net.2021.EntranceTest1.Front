export class CategoryModel {
    public id: number;
    
    public name: string;
    
    public parentCategory: CategoryModel;
    
    public childCategories: Array<CategoryModel>
}
