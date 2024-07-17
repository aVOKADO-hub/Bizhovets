import Router from 'express'
import PostController from './PostController.js'
import AccountsController from './AccountsController.js'

const router = new Router()

router.get('/login',AccountsController.login)
router.post('/login',AccountsController.loginValidate)

router.get('/register',AccountsController.register)
router.post('/register',AccountsController.createAccount)

router.get('/collections',PostController.getCollections)

router.get('/collections/:collectionName',PostController.getCollection)
router.post('/collections/:collectionName/add',PostController.create)
router.post('/collections/:collectionName/delete',PostController.delete)
router.get('/collections/:collectionName/edit',PostController.edit)
router.post('/collections/:collectionName/update',PostController.update)

router.get('/collections/:collectionName/export',PostController.export)

router.post('/posts',PostController.create)

router.get('/posts/:id',PostController.getOne)

router.put('/posts',PostController.update)

router.delete('/posts/:id',PostController.delete)

export default router;