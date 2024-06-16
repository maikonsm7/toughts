const {raw} = require('mysql2')
const Tought = require('../models/Tought')

class ToughtController {
    static async showToughts(req, res){
        try {
            const toughts = await Tought.findAll({raw: true})
            res.render('toughts/all', {toughts})
        } catch (error) {
            console.error('Erro: ', error)
        }
    }
    static async dashboard(req, res){
        try {
            const toughts = await Tought.findAll({raw: true, where: {UserId: req.session.userid}})
            res.render('toughts/dashboard', {toughts})
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
        try{
            await Tought.destroy({where: {id, UserId: req.session.userid}})
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
        try {
            const tought = await Tought.findOne({raw: true, where: {id, UserId: req.session.userid}})
            res.render('toughts/edit', {tought})
        } catch (error) {
            console.error('Erro: ', error)
        }
    }
    static async updateToughtSave(req, res){
        const id = req.body.id
        const tought = {
            title: req.body.title
        }
        try {
            await Tought.update(tought, {where: {id, UserId: req.session.userid}})
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