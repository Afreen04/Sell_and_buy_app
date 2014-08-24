var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Todo = new Schema({
    user_id    : String,
    content    : String,
    updated_at : Date
});

var books = new Schema({
    user_id    : String,
    name: String,
    min_cost    : Number,
    Desc : String,
    Posted: Date,
    Academic: Boolean
});

var cycles = new Schema({
    user_id    : String,
    name: String,
    min_cost    : Number,
    Desc : String,
    Posted: Date,
    Brand: String,
    Type:String,
    Color:String
});

var electronics = new Schema({
    user_id    : String,
    name: String,
    min_cost    : Number,
    Desc : String,
    Posted: Date,
    Brand: String,
    Item:String
});


mongoose.model( 'Todo', Todo );
mongoose.model( 'books', books );
mongoose.model( 'cycles', cycles );
mongoose.model( 'electronics', electronics );

mongoose.connect( 'mongodb://localhost/express-todo' );
