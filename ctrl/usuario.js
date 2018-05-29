angular.module('application').controller('usuarioCtrl',function($scope,$http,$location,$session,$rootScope){

    $scope.init = function(){
        $rootScope.showUserMenu = false;
        if($session.get('estado')==='ACTIVO'){
            $rootScope.showUserMenu = true;
            $rootScope.nombre = $session.get('nombre');
            $rootScope.isAdmin = eval($session.get('isadmin'));
        }
        $scope.usuarioEsquemasEnviados();
    };

    $scope.usuarioEsquemasEnviados = function(){
        let promise = function(){
            $http
                .get('mdl/index.php/usuario/esquemas/enviados')
                .success(function(json){ if(json.result===true) $scope.esquemasEnviados = json.rows });
        };
        $session.execute(promise);
    };

    $scope.usuarioEnviarUnEsquema = function() {
        $session.execute(function(){
            window.hideAlerts = function(){
                document.getElementById('form1alert1').className = 'alert alert-success hide';
                document.getElementById('form1alert2').className = 'alert alert-danger hide';
                document.getElementById('nombre').value = '';
                document.getElementById('descripcion').value = '';
                document.getElementById('archivo').value='';
            };
            let form  = '<div id="form1alert1" class="alert alert-success hide"><strong>Correcto:</strong> El esquema se ha enviado e forma coorecta.</div>';
                form += '<div id="form1alert2" class="alert alert-danger hide"><strong>Error:</strong> El esquema no se ha guardado en forma corecta.</div>';
                form += '<label class="label label-default">Nombre:</label>';
                form += '<input id="nombre" onclick="window.hideAlerts()" type="text" class="form-control" maxlength="40">';
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
                            let url = 'mdl/index.php/esquemas/nuevo';
                            let json = {
                                nombre:document.getElementById('nombre').value.match(new RegExp('[a-z0-9-]','gi')).join(''),
                                descripcion:document.getElementById('descripcion').value.match(new RegExp('[a-z0-9áéíóúÁÉÍÓÚñÑ.; ]','gim')).join(''),
                                base64:event.target.result.replace('data:application/pdf;base64,','')
                            };
                            $http
                                .post(url,json)
                                .success(function(json){
                                    if(json.result===false) document.getElementById('form1alert2').className = 'alert alert-danger show';
                                    if(json.result===true){
                                        $scope.usuarioEsquemasEnviados();
                                        document.getElementById('form1alert1').className = 'alert alert-success show';
                                        setInterval(function(){ 
                                            win.close();
                                            destroy();
                                        },1000);
                                    }
                                });
                        };
                }
            };
            let cancelar = function() { 
                win.close();
                destroy();
            };
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

            let destroy = function() {
                delete window.hideAlerts;
                delete form;
                delete aceptar;
                delete cancelar;
                delete win;
                delete destroy;
            }
    
        });
    };

    $scope.init();
        
});