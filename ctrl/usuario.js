angular.module('application').controller('usuarioCtrl',function($scope,$http,$location,$session,$rootScope){

    $scope.init = function(){
        $rootScope.showUserMenu = false;
        $rootScope.isAdmin = false;
        if($session.get('estado')==='ACTIVO'){
            $rootScope.showUserMenu = true;
            $rootScope.nombre = $session.get('nombre');
        }
    };

    $scope.usuarioEnviarUnEsquema = function() {
        let form  = '<label class="label label-default">Nombre:</label>';
            form += '<input id="nombre" type="text" class="form-control" maxlength="40">';
            form += '<label class="label label-default">Descripción:</label>';
            form += '<textarea id="descripcion" class="form-control" rows="2"></textarea>';
            form += '<label class="label label-default">Archivo en PDF</label>';
            form += '<input id="archivo" type="file" accept=".pdf" class="btn btn-primary form-control" lang="es">';
        
        let aceptar = function() {
            let archivo = document.getElementById('archivo');
            
            if(archivo.files.length===1 && archivo.files[0].type==='application/pdf'){
                let file = archivo.files[0];
                let read = new FileReader();
                    read.readAsDataURL(archivo.files[0]);
                    read.onload = function(event) {
                        let url = 'mdl/index.php/esquemas/insert';
                        let json = {
                            nombre:document.getElementById('nombre').value.match(new RegExp('[a-z0-9-]','gi')).join(''),
                            descripcion:document.getElementById('descripcion').value.match(new RegExp('[a-z0-9áéíóúÁÉÍÓÚñÑ.; ]','gim')).join(''),
                            base64:event.target.result.replace('data:application/pdf;base64,','')
                        };
                        $http
                            .post(url,json)
                            .success(function(json){
                                if(json.result===false);
                                if(json.result===true){
                                    
                                }
                                console.log(json);
                            });
                    };
            }
        };

        let cancelar = () => { win.close();};

        let win = BootstrapDialog.show({
                closable:false,
                type:BootstrapDialog.TYPE_PRIMARY,
                size:BootstrapDialog.SIZE_SMALL,
                title: '<i class="wb-cloud form-icon"></i> ENVIAR ESQUEMA',
                message:form,
                buttons:[{
                    cssClass:'btn btn-danger pull-left wp-close',
                    label:'Cancelar',
                    action:cancelar
                },{
                    cssClass:'btn btn-success pull-right wp-check-circle',
                    label:'Aceptar',
                    action:aceptar 
                }]
            });
    };

    $scope.init();
        
});