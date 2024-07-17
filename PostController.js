import PostService from './PostService.js'



class PostController{
    async create(req, res){
        try {
            const post = await PostService.create(req.body,req.params.collectionName)
            if(post){
                return res.redirect(`/api/collections/${req.params.collectionName}`);
            }else{
                res.status(400).json({message: 'Something went wrong!'})
            }
        } catch (e) {
            res.json(e.message)
        }
    }
    async getAll(req, res){
        try {
            const post = await PostService.getAll()
            console.log(post)
            return res.render('collections',{title:'collections',post})
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    async getCollections(req, res){
        try {
            const collections = await PostService.getCollections()
            return res.render('collections',{title:'collections',collections})
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    async getCollection(req, res){
        try {
            const documents = await PostService.getCollection(req.params.collectionName)
            return res.render('unit',{title:req.params.collectionName,documents})
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    async getOne(req, res){
        try {
            const post = await PostService.getOne(req.params.id)
            return res.json(post)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    async edit(req, res){
        try {
            const document = await  PostService.edit(req.query.id,req.params.collectionName)
            const schemaPaths = document.schema.paths;
            const cleanDocument = {};
            for (const key in schemaPaths) {
                if (document[key] !== undefined) {
                    cleanDocument[key] = document[key];
                }
            }
            return res.render('edit', {
                title: `Edit Document (ID: ${document._id})`,
                collectionName: req.params.collectionName,
                document: cleanDocument
            });
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    async update(req, res){
        try {
            const updatedDocument = await PostService.update(req.body)
            if (updatedDocument) {
               return res.redirect(`/api/collections/${req.params.collectionName}`);
              } else {
                return res.status(404).json({ message: 'Document not found' });
              }
        } catch (e) {
            res.status(500).json("controller " + e.message)
        }
    }
    async delete(req, res){
        try {
            const post = await PostService.delete(req.params.collectionName,req.body.id)
            if (post) {
                res.redirect(`/api/collections/${req.params.collectionName}`);
              } else {
                res.status(404).json({ message: 'Document not found' });
              }
              }
        catch (e) {
            res.status(500).json('Service error '+e.message)
        }
    }
    async export(req, res) {
        try {
            const { fs, outputFilePath } = await PostService.export(req.params.collectionName);

            if (outputFilePath) {
                res.download(outputFilePath, 'duties.xlsx', (err) => {
                    if (err) {
                        console.error('Error during file download:', err);
                        res.status(500).json({ message: 'Error during file download' });
                    }
                    fs.unlinkSync(outputFilePath); // Clean up the file after download
                });
            } else {
                return res.status(404).json({ message: 'Document not found' });
            }
        } catch (e) {
            console.error('Controller error:', e);
            res.status(500).json({ message: 'Controller error: ' + e.message });
        }
    }
}
export default new PostController()