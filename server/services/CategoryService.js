import Category from "../models/category.js"

class CategoryService{
    async create(category){ 
        const createdCategory = await Category.create(category)
        
        return createdCategory;
    }

    async getAll() {
        const categories = await Category.find()
        return categories;
    }

    async getOne(id) {
        if (!id) throw new Error('ID is not defined')

        const category = await Category.findById({_id: id})
        return category;
    }

    async update(category) {
        if(!category._id) throw new Error('ID is not defined')
        const updatedCategory = await category.save()
        return updatedCategory;
    }

    async delete(id) {
        if(!id) throw new Error('ID is not defined')
        const category = await Category.findByIdAndDelete(id);
        return category
    }
}

export default new CategoryService();