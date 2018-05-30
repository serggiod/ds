angular.module('application').factory('$session',function($http,$location){
    return {
        get:function(key){
            return sessionStorage.getItem(key);
        },
        set:function(key,value){
            sessionStorage.setItem(key,value);
        },
        start:function(usuario){
            let $this=this;
            $this.set('nombre',usuario.nombre + ' ' + usuario.apellido);
            $this.set('isadmin',usuario.isadmin);
            $this.set('estado','ACTIVO');
            $this.set('lastime',new Date());
        },
        destroy:function(){
            let $this=this;
            let url = 'mdl/index.php/session/logout';
            $this.set('nombre',null);
            $this.set('estado',null);
            $this.set('lastime',null);
            $this.set('isadmin',null);
            $http
                .delete(url)
                .success(function(json){});
        },
        execute:function(promise){
            let $this=this;
            let url = 'mdl/index.php/session/status';
            $http
                .get(url)
                .error(function(){
                    $this.destroy();
                    $location.path('/entrar');
                })
                .success(function(json){
                    if(json.result===true) promise();
                    else {
                        $this.destroy();
                        $location.path('/entrar');
                    }
                });
        }
    }
});