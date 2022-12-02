const { Router } = require('express');
const express = require('express')
const {getTodo, getTodoById, addTodo, updateTodo, deleteTodo} = require('../controllers/todoController');

const router = express.Router();

router.get('/todo', getTodo);
router.get('/todo/:id', getTodoById);
router.post('/todo', addTodo);
router.put('/todo/:id', updateTodo);
router.delete('/todo/:id', deleteTodo);

module.exports = {
    routes: router
}