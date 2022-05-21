const express = require('express');
const todosController = require('../Controllers/todosController');
const router = express.Router();
const auth = require("../middleware/auth")


//signup
router.post('/addTodo/:id',auth ,todosController.addTodo);
//login
router.get('/:id', auth,todosController.getAllTodos);

module.exports = router;