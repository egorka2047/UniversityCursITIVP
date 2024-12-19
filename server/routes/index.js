const Router = require('express')
const router = new Router()
const carRouter = require('./carRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const countryRouter = require('./countryRouter')
const basketRouter = require('./basketRouter')

router.use('/car', carRouter)
router.use('/user', userRouter)
router.use('/country', countryRouter)
router.use('/type', typeRouter)
router.use('/basket', basketRouter)


module.exports = router