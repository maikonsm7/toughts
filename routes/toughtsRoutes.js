const express = require('express')
const router = express.Router()

const ToughtController = require('../controllers/ToughtController')
// helpers
// middleware que checa se o usuário está logado
// se estiver logado, prossiga
// se não, redireciona para o login
const checkAuth = require('../helpers/auth').checkAuth



router.get('/', ToughtController.showToughts)
router.get('/dashboard', checkAuth, ToughtController.dashboard)
router.get('/add', checkAuth, ToughtController.createTought)
router.post('/add', checkAuth, ToughtController.createToughtSave)
router.get('/remove/:id', checkAuth, ToughtController.removeTought)
router.get('/edit/:id', checkAuth, ToughtController.updateTought)
router.post('/edit', checkAuth, ToughtController.updateToughtSave)

module.exports = router