var mongoose = require('mongoose');
mongoose.connect("mongodb+srv://todo.xfhfp.mongodb.net/test", { useNewUrlParser: true, useUnifiedTopology: true });

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

var express = require('express');
var data = [];

var urlencodedParser = express.urlencoded({ extended: false });


module.exports = function (app) {

    app.get('/todo', function (req, res) {

        res.render('todo', { todos: data });

    });



    app.post('/todo', function (req, res) {
        data.push(req.body);
        res.json(data);
    });



    app.delete('/todo/:item', function (req, res) {

        data=data.filter(function(todo){
            return todo.item.replace(/ /g,'-') !== req.params.item;
        });
        res.json(data);
        });
};
