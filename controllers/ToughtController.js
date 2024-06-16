const {raw} = require('mysql2')
const Tought = require('../models/Tought')

class ToughtController {
    static showToughts(req, res){
        res.render('toughts/all')
    }
    static dashboard(req, res){
        res.render('toughts/dashboard')
    }
}

module.exports = ToughtController