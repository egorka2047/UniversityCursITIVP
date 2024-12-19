const Router = require('express')
const router = new Router()
const carController = require('../controllers/carController')
const checkRole = require ('../middleware/checkRoleMiddleware')
const userController = require("../controllers/userController");

router.post('/', checkRole('ADMIN'), carController.create)
router.get('/', carController.getAll)
router.get('/:id', carController.getOne)
router.get('/table/export', checkRole('ADMIN'), carController.export)
router.put('/', checkRole('ADMIN'), carController.update); // Редактирование цены
router.delete('/:id', checkRole('ADMIN'), carController.delete); // Удаление автомобиля

module.exports = router