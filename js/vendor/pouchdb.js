var db = new PouchDB('hitzak');
var remote = 'klikHasi:UD*qYgOPNJ$pKA4fe5iv5$lo@http://52.16.244.81:5984/hitzak';

if(window.confirm('¿Quieres activar la replicación?')){

   db.sync(remote, {
      live: true,
      retry: true
   });

}
