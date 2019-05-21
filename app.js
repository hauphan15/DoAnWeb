var express = require('express');
var exphbs = require('express-handlebars');
var morgan = require('morgan');
var moment  = require('moment');

var app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.json());

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: 'views/layouts',
}));



app.set('view engine', 'handlebars');

app.use(require('./middlewares/locals.mdw'));

app.get('/', (req, res) => {
    res.render('home');
})


app.use('/writer/dangbaiviet', require('./routes/writer/dangbaiviet.route'));
app.use('/writer/dsbaiviet', require('./routes/writer/dsbaiviet.route'));
app.use('/admin/duyetbaiviet', require('./routes/admin/duyetbaiviet.route'));
app.use('/bientapvien/duyetbaiviet', require('./routes/editor/duyetbaiviet.route'));
app.use('/admin/bientapvien', require('./routes/admin/bientapvien.route'));
app.use('/admin/docgia', require('./routes/admin/docgia.route'));
app.use('/admin/phongvien', require('./routes/admin/phongvien.route'));
app.use('/admin/chuyenmuc', require('./routes/admin/chuyenmuc.route'));
app.use('/chuyenmuc', require('./routes/chuyenmuc.route'));

app.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
})