//Aplicacion REStFUL
//--------------------------------------------
//----Configurar un Servidor Local------------
//Crear variable e importar la libreria Express, Express ya es identificado por el sistema
const { request } = require('express');
var expresss=require('express');
//Definir la aplicacion como una instancia express
var app = expresss();
//Es necesario escuchar un puerto, para usar un servidor, por estandar usamos el puerto 8080
//-si cambio de servidor debo detener el terminal y volverlo  a ejecutar y asi repeteriremo el proceso,
//Si queremos que esto sea automatico debemos instalar en el terminal nodemon
// usar el comando npx nodemon.js
var mongoose = require('mongoose'); // importa la libreria a nuestro servidor

//3.9-----------------------
// Importar Paquete
var cors = require("cors");


mongoose.connect('mongodb://localhost:27017/lista-angular') ;
//mongoose.connect('mongodb://mongoDB/myApp')
//Metodo connect donde llamamos la varaibles creada y conectaremos una bd en mongo db
//

var Lista = mongoose.model('Lista',{
    texto:String,
    terminado:Boolean
}); 

app.configure(function(){
    app.use(expresss.static(__dirname + '/publico')); //__dirname me envia la ruta d
    //video 3.4
    app.use(expresss.bodyParser());
    //video 3.8
    app.use(expresss.methodOverride());
});


//Nos permite consumir informacion entre diferentes servidores y origenes
//https://enable-cors.org/server_expressjs.html
//Instalar paquete npm install cors --save
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //"*" si indico el dominio restrinjo el acceso menos al dominio indicado
  res.header( "Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");//Se indica los header basicos que se va aceptar.
  next();
});  

 
//video 3.4
//Crearemos una llamada de tipo Post y la usaremos para configurar una ruta y utilizar los datos que se reciben
// de esa ruta para crear un registro dentro de la Base de datos.
app.post('/api/lista' , function(peticion,respuesta){
    Lista.create({
        texto: peticion.body.texto
    },function(error,Lista){
        if(error){
            respuesta.send(error);
        }
        Lista.find(function(error,Lista){ 
            if(error){
                respuesta.send(error);
            }

            request.json(Lista);
        })
    })
})

//Se usa el moteodo get para desplegar los registros que se encuentran en una BD
//definir la ruta a la que entraran el usuario para listar los resultados.
app.get('/api/lista' , function(peticion,respuesta){
    //conectarnos a la bd
    //realizar peticion
    //al obtener los datos la vamos a mostrar.
    
     Lista.find(function(error,Lista){
         if(error){
             respuesta.send(error);
            
         } 
         respuesta.json(Lista);
     })
    })
  
//3.7-------------------------------------
app.delete('/api/lista/:item' , function(peticion,respuesta){
    Lista.remove({
        _id:peticion.params.item
    }, function( error , Lista ){
        if(error){
            respuesta.send(error);
        }

        Lista.find( function(error,Lista){
            if(error){
                respuesta.send(error);
            }
 
            respuesta.json(Lista);

        })
    })
})
 
//3.8------------------------------------
app.put('/api/lista/:item', function (peticion, respuesta) {
    Lista.findOneAndUpdate(
      { _id: peticion.params.item },
      { terminado: true },
      function (error, lista) {
        if (error) {
          respuesta.send(error);
 
        }
  
        Lista.find(function (error, lista) {
          if (error) {
            respuesta.send(error);
          }
     
          respuesta.json(Lista);
        });
 
      }
    );
  }); 

app.listen(8080,function(){
    console.log("servidor 2");
})  
//------------------
//---Crear la Base de datos y modelo----------
//---Instalar libreria mongose, este se agrega en el archivo package.json.
// Usar el comando npm install mongoose --save
 