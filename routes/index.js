var utils    = require( '../utils' );
var mongoose = require( 'mongoose' );
var Todo     = mongoose.model( 'Todo' );
var books    = mongoose.model( 'books' );
var cycles    = mongoose.model( 'cycles' );
var electronics    = mongoose.model( 'electronics' );



exports.index = function ( req, res, next ){
  var user_id = req.cookies ?
    req.cookies.user_id : undefined;
    books.
    find({ user_id : user_id }).
    exec( function ( err, books ){
      if( err ) return next( err );
      res.render( 'index', {
          title : 'BOOKS',
          books : books,
          todos : [],
          cycles:[],
          electronics:[]
      });
    });
};

exports.index_cycles = function ( req, res, next ){
  var user_id = req.cookies ?
    req.cookies.user_id : undefined;
    cycles.
    find({ user_id : user_id }).
    exec( function ( err, cycles ){
      if( err ) return next( err );
      res.render( 'index', {
          title : 'CYCLES',
          cycles : cycles,
          todos : [],
          books: [],
          electronics:[]
      });
    });
};

exports.index_electronics = function ( req, res, next ){
  var user_id = req.cookies ?
    req.cookies.user_id : undefined;
    electronics.
    find({ user_id : user_id }).
    exec( function ( err, electronics ){
      if( err ) return next( err );
      res.render( 'index', {
          title : 'ELECTRONICS',
          cycles : [],
          todos : [],
          books: [],
          electronics:electronics
      });
    });
};


exports.index_todo = function ( req, res, next ){
  var user_id = req.cookies ?
    req.cookies.user_id : undefined;

  Todo.
    find({ user_id : user_id }).
    sort( '-updated_at' ).
    exec( function ( err, todos ){
      if( err ) return next( err );

      res.render( 'index', {
          title : 'Beam Me Up, Scotty!',
          todos : todos,
          books: [],
          cycles:[],
          electronics:[]
      });
    });

};

exports.create_books = function ( req, res, next ){
  console.log(req.body.content);
  new books({
      user_id    : req.cookies.user_id,
      Desc    : req.body.content,
      Posted : Date.now(),
      min_cost:100,
      name: "Lean In",
      Academic: false

  }).save( function ( err, todo, count ){
    if( err ) return next( err );

    res.redirect( '/books' );
  });
};

exports.create_cycles = function ( req, res, next ){
  console.log(req.body.content);
  new cycles({
     user_id    : req.cookies.user_id,
    name: "Hercules Street rider",
    min_cost    : 0,
    Desc : req.body.content,
    Posted: Date.now(),
    Brand: "Hercules",
    Type:"Unisex",
    Color:"Yellow and black"

  }).save( function ( err, todo, count ){
    if( err ) return next( err );

    res.redirect( '/cycles' );
  });
};


exports.create_todo = function ( req, res, next ){
  console.log(req.body.content);
  new Todo({
      user_id    : req.cookies.user_id,
      content    : req.body.content,
      updated_at : Date.now(),


  }).save( function ( err, todo, count ){
    if( err ) return next( err );

    res.redirect( '/todo' );
  });
};exports.destroy = function ( req, res, next ){
  books.findById( req.params.id, function ( err, todo ){
    var user_id = req.cookies ?
      req.cookies.user_id : undefined;

    if( todo.user_id !== req.cookies.user_id ){
      return utils.forbidden( res );
    }

    todo.remove( function ( err, todo ){
      if( err ) return next( err );

      res.redirect( '/books' );
    });
  });

  Todo.findById( req.params.id, function ( err, todo ){
    var user_id = req.cookies ?
      req.cookies.user_id : undefined;

    if( todo.user_id !== req.cookies.user_id ){
      return utils.forbidden( res );
    }

    todo.remove( function ( err, todo ){
      if( err ) return next( err );

      res.redirect( '/todo' );
    });
  });


};

exports.edit = function( req, res, next ){
  var user_id = req.cookies ?
      req.cookies.user_id : undefined;

//FIX THIS PROPERLY

if(req.params.ctg=='books')
{ //console.log(req.params.ctg);
  books.
    find({ _id : req.params.id }).
    //sort( '-updated_at' ).
    exec( function ( err, items ){
      if( err ) return next( err );

      res.render( 'edit', {
        title   : 'Buyer!',
        ctg	: 'books',
        items  : items,
        current : req.params.id
      });
    });}
    
if(req.params.ctg=='cycles')
{
  cycles.
    find({ user_id : user_id }).
    sort( '-updated_at' ).
    exec( function ( err, todos ){
      if( err ) return next( err );

      res.render( 'edit', {
        title   : 'Buyer!',
        todos   : todos,
        current : req.params.id
      });
    });}
if(req.params.ctg=='elex')
{
  electronics.
    find({ user_id : user_id }).
    sort( '-updated_at' ).
    exec( function ( err, todos ){
      if( err ) return next( err );

      res.render( 'edit', {
        title   : 'Buyer!',
        todos   : todos,
        current : req.params.id
      });
    });}
    
    if(req.params.ctg=='others')
{
  books.
    find({ user_id : user_id }).
    sort( '-updated_at' ).
    exec( function ( err, todos ){
      if( err ) return next( err );

      res.render( 'edit', {
        title   : 'Buyer!',
        todos   : todos,
        current : req.params.id
      });
    });}

};

exports.update = function( req, res, next ){
  if(req.params.ctg == 'books')
  {books.findById( req.params.id, function ( err, todo ){
    var user_id = req.cookies ?
      req.cookies.user_id : undefined;

    if( todo.user_id !== user_id ){
      return utils.forbidden( res );
    }
// AFTER MODIFYING EDIT.EJS WITH INPUT FIELDS, MAKE CHANGES HERE
//todo.Desc = 'BID!!!!!!!!!!!!';

  todo.min_cost=req.body.name;
  //todo.name    = req.body.name;
   // todo.updated_at = Date.now();
    todo.save( function ( err, todo, count ){
      if( err ) return next( err );

      res.redirect( '/books' );
    });
  });
  }


};

// ** express turns the cookie key to lowercase **
exports.current_user = function ( req, res, next ){
  var user_id = req.cookies ?
      req.cookies.user_id : undefined;

  if( !user_id ){
    res.cookie( 'user_id', utils.uid( 32 ));
  }

  next();
};
