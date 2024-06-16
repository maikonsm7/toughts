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

module.exports = router