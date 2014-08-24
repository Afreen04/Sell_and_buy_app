/**
 * Module dependencies.
 */

// mongoose setup
require( './db' );

var express = require( 'express' );
var routes  = require( './routes' );
var http    = require( 'http' );
var path    = require( 'path' );
var app     = express();
var engine  = require( 'ejs-locals' );

// all environments
app.set( 'port', process.env.PORT || 3001 );
app.engine( 'ejs', engine );
app.set( 'views', path.join( __dirname, 'views' ));
app.set( 'view engine', 'ejs' );
app.use( express.favicon());
app.use( express.logger( 'dev' ));
app.use( express.cookieParser());
app.use( express.bodyParser());
app.use( express.json());
app.use( express.urlencoded());
app.use( express.methodOverride());
app.use( routes.current_user );
app.use( app.router );
app.use( express.static( path.join( __dirname, 'public' )));

// development only
if( 'development' == app.get( 'env' )){
  app.use( express.errorHandler());
}

// Routes
app.get(  '/books',            routes.index );
app.post( '/create_books',      routes.create_books );
app.get(  '/todo',            routes.index_todo );
app.post( '/create_todo',      routes.create_todo );
app.get(  '/cycles',            routes.index_cycles );
app.post( '/create_cycles',      routes.create_cycles );
app.get(  '/electronics',            routes.index_electronics );
//app.post( '/create_electronics',      routes.create_electronics );

app.get(  '/destroy/:id', routes.destroy );
app.get(  '/edit/:id/:ctg',    routes.edit );
app.post( '/update/:id/:ctg',  routes.update );



http.createServer( app ).listen( app.get( 'port' ), function (){
  console.log( 'Express server listening on port ' + app.get( 'port' ));
});
