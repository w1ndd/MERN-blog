import CategoryService from '../services/CategoryService.js'

class CategoryController {
    async create(req, res){
        try{
            const category = await CategoryService.create(req.body)

            return res.json(category)
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try{
            const categories = await CategoryService.getAll();
            return res.json(categories)
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async getOne(req, res) {
        try{          
            const category = await CategoryService.getOne(req.params.id);
            return res.json(category)
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async update(req, res) {
        try{
            const updatedCategory = await CategoryService.update(req.body);
            return res.json(updatedCategory)
        } catch(e) {
            res.status(500).json(e.message)
        }
    }

    async delete(req, res) {
        try{
            const category = await CategoryService.delete(req.params.id)
            return res.json(category)
        } catch(e) {
            res.status(500).json(e)
        }
    }
}

export default new CategoryController();