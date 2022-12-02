const mysql = require('../database/db');

const getTodo = async(req, res, next) =>{
     try {
        const todo = await mysql.execute('SELECT id, description FROM todos');
        res.status(200).send(todo[0]);
     } catch (error) {
        res.status(400).send(error.message);
     }
}


const getTodoById = async(req, res, next) =>{
   try {
      const id = req.params.id;
      const todo = await mysql.execute('SELECT id, description WHERE id = ?', [id]);
      res.status(200).send(todo[0]);
   } catch (error) {
      res.status(400).send(error.message);
   }
}

const addTodo = async(req, res, next) =>{
   try {
      var data = req.body.description;

      const todo = await mysql.execute(`INSERT INTO todos(description) VALUES('${data}')`);
         
      res.status(200).send(todo);
   } catch (error) {
      res.status(400).send(error.message);
   }
}

const updateTodo = async(req, res, next) => {
   try {
      var id = JSON.parse(req.params.id);
      const data = req.body.description;
      const updateTodo = await mysql.execute(`UPDATE todos SET description = '${data}' WHERE id = '${id}' `);

      res.status(200).send(updateTodo);
   } catch (error) {
      res.status(400).send(error.message);
   }
}



const deleteTodo = async(req, res, next) => {
   try {
      const id = req.params.id;
      const todo = await mysql.execute('DELETE FROM todo WHERE id = ? ', [id]);
      res.status(200).send(todo);
   } catch (error) {
      res.status(400).send(error.message);
   }
}


module.exports = {
    getTodo,
    getTodoById,
    addTodo,
    updateTodo,
    deleteTodo
}