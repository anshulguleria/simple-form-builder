var esTranspiler = require('broccoli-babel-transpiler'),
    // working tree
    app = 'client';


var appJs = esTranspiler(app, {
    sourceRoot: 'client',
    ignore: '**/*.*[~,swp]'

});

module.exports = appJs;
