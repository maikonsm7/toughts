const {raw} = require('mysql2')
const Tought = require('../models/Tought')

class ToughtController {
    static async showToughts(req, res){
        try {
            const toughts = await Tought.findAll({raw: true})
            let emptyToughts = false
            if(toughts.length === 0){
                emptyToughts = true
            }
            res.render('toughts/all', {toughts, emptyToughts})
        } catch (error) {
            console.error('Erro: ', error)
        }
    }
    static async dashboard(req, res){
        const UserId = req.session.userid
        try {
            const toughts = await Tought.findAll({raw: true, where: {UserId}})
            let emptyToughts = false
            if(toughts.length === 0){
                emptyToughts = true
            }
            res.render('toughts/dashboard', {toughts, emptyToughts})
        } catch (error) {
            console.error('Erro: ', error)
        }
    }
    static createTought(req, res){
        res.render('toughts/add')
    }
    static async createToughtSave(req, res){
        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }
        try {
            await Tought.create(tought)
            req.flash('message', 'Pensamento adicionado!')
            req.session.save(()=>{
                res.redirect('/')
            })
        } catch (error) {
            console.error('Erro: ', error)
        }
    }
    static async removeTought(req, res){
        const id = req.params.id
        const UserId = req.session.userid
        try{
            await Tought.destroy({where: {id, UserId}})
            req.flash('message', 'Pensamento removido!')
            req.session.save(()=>{
                res.redirect('/toughts/dashboard')
            })
        }catch(error){
            console.error('Erro: ', error)
        }
    }
    static async updateTought(req, res){
        const id = req.params.id
        const UserId = req.session.userid
        try {
            const tought = await Tought.findOne({raw: true, where: {id, UserId}})
            res.render('toughts/edit', {tought})
        } catch (error) {
            console.error('Erro: ', error)
        }
    }
    static async updateToughtSave(req, res){
        const id = req.body.id
        const UserId = req.session.userid
        const tought = {
            title: req.body.title
        }
        try {
            await Tought.update(tought, {where: {id, UserId}})
            req.flash('message', 'Pensamento atualizado!')
            req.session.save(()=>{
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.error('Erro: ', error)
        }
    }
}

module.exports = ToughtController