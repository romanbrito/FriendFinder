var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000 );

app.use(require('./app/routing/htmlRoutes'));
app.use(require('./app/routing/apiRoutes'));

var server = app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});
