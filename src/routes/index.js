const homeRouter=require('./home');
const phimleRouter=require('./phimle');
const phimboRouter=require('./phimbo');
const phimmoiRouter=require('./phimmoi');
const apiRouter = require('./api'); // thêm dòng này

function route(app) {
    app.use('/api', apiRouter); // thêm dòng này để xử lý API REST
    app.use('/', homeRouter);
    app.use('/phim-le', phimleRouter);
    app.use('/phim-bo', phimboRouter);
    app.use('/phim-moi', phimmoiRouter);  
}

module.exports = route;
