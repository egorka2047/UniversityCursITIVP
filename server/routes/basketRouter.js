const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/authMiddleware')

router.post('/addToCart', basketController.addToCart);
router.get('/getCartContents/:userId', basketController.getCartContents);
router.delete('/delete/:id', authMiddleware, basketController.deleteItem);

module.exports = router;
