var remoteAddress = 'http://52.17.40.44:5984/hitzak';

var dbLocal = new PouchDB('hitzak');
// skipSetup:true -> desactiva el modal que pide user/password
var dbRemote = new PouchDB(remoteAddress,{skipSetup:true});

dbRemote.login('klikHasi', 'UD*qYgOPNJ$pKA4fe5iv5$lo', function (err, response) {
   if (err) {
      if (err.name === 'unauthorized') {
         console.log('Usuario no autorizado: ', err);
      } else {
         console.log('Se ha producido el siguiente error: ', err);
      }
   }else{
      console.log('Conectado: ', response);
      // Espero a estar logeado para configurar la sincronización
      dbLocal.sync(dbRemote, {
         live: true,
         retry: true
      });
   }
});

// configuramos la lista de eventos lanzará la BBDD con cada cambio que perciba
var changes = dbLocal.changes({
   since: 'now',
   live: true,
   include_docs: true
}).on('change', function(change) {
   console.log('Cambio producido:', change);
}).on('complete', function(info) {
   console.log('Se ha perdido la conexión con el servidor');
}).on('error', function (err) {
   console.log(err);
});
