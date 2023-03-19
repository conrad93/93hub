var mongoose = require('mongoose');

module.exports.init = function() {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.DB_URL_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.connection.once('open',function(){
        console.log('Database connected Successfully');
    }).on('error',function(err){
        console.log('Error', err);
    });
};