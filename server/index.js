var app = require("./app");
var routes = require("./routes");
var mongoose = require('mongoose');

app.use('/', routes);

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open',function(){
    console.log('Database connected Successfully');
}).on('error',function(err){
    console.log('Error', err);
});

const PORT = process.env.PORT;
app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
});