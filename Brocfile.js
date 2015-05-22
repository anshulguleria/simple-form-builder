var esTranspiler = require('broccoli-babel-transpiler'),
    // working tree
    app = 'client';


var appJs = esTranspiler(app, {
    sourceRoot: 'client'
});

module.exports = appJs;
