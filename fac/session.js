angular.module('application').factory('$session',function($http){
    return {
        get:function(key){
            return sessionStorage.getItem(key);
        },
        set:function(key,value){
            sessionStorage.setItem(key,value);
        },
        start:function(usuario){
            let $this=this;
            let nombre = usuario.nombre + ' ' + usuario.apellido;
            $this.set('nombre',nombre);
            $this.set('estado','ACTIVO');
            $this.set('lastime',new Date());
        },
        destroy:function(){
            let $this=this;
            let url = 'mdl/models.php/session/logout';
            $this.set('nombre',null);
            $this.set('estado',null);
            $this.set('lastime',null);
            $http
                .delete(url)
                .success(function(json){});
        },
        execute:function(promise){
            let $this=this;
            let url = 'mdl/models.php/session/status';
            $http
                .get(url)
                .error(function(){ $this.destroy(); })
                .success(function(json){
                    if(json.result===true) promise();
                    else $this.destroy();
                });
        }
    }
});