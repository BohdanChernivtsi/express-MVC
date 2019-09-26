const { pool } = require('../config')
const helperModule = require('../helpers/helper.js');

exports.list = (req, res) => {
    pool.query('SELECT * FROM public."todoTable"', (error, results) => {
        if (error) {
          throw error
        }
        const todos = results.rows
        res.render('index', {todos})
        // response.status(200).json(results.rows)
    })
}

exports.add = (req, res) => {
    res.render('new');
}

exports.show = (req, res, id) => {
    pool.query(`SELECT * FROM public."todoTable" WHERE id=${req.query.id}`, (error, results) => {
        if (error) {
          throw error
        }
        res.render('show', { todo: results.rows[0] });
    })
}

exports.remove = (req, res) => {
    pool.query(`DELETE FROM "todoTable" WHERE id=${req.query.id};`, (error, results) => {
        if (error) {
          throw error
        }
        res.redirect('/');
    })
}

exports.edit = (req, res) => {
    pool.query('SELECT * FROM public."todoTable" WHERE id=' + req.query.id, (error, results) => {
        if (error) {
          throw error
        }
        const todo = results.rows[0];
        res.render('edit', { todo });
    })
}

exports.create = (req, res) => {
    const {name, description } = req.body;
    const currentDate = new Date().toString().split(' ').slice(0, 5).join(' ');
    pool.query(`INSERT INTO public."todoTable"(
        created_on, updated_on, name, description)
        VALUES ($1, $2, $3, $4);`, [currentDate, currentDate, name, description], (error, results) => {
        if (error) {
          throw error
        }
    })
    res.redirect('/');
}

exports.update = (req, res) => {
    const {id, name, description } = req.body
    pool.query(`UPDATE "todoTable"
                SET name='${name}', description='${description}'
                WHERE id=${id};`,  (error, results) => {
        if (error) {
          throw error
        }
        res.redirect('/');
    })
}