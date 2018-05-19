angular.module('application').controller('usuarioCtrl',function($scope,$http,$location,$session,$rootScope){

    $scope.init = function(){
        $rootScope.showUserMenu = false;
        $rootScope.isAdmin = false;
        if($session.get('estado')==='ACTIVO'){
            $rootScope.showUserMenu = true;
            $rootScope.nombre = $session.get('nombre');
        }
    };

    $scope.usuarioEnviarUnEsquema = () => { 
        let form = document.createElement('div');
            form.cssClass = 'form-group';

        let labelN = document.createElement('label');
            labelN.innerHTML = 'Nombre:';
            form.append(labelN);

        let inputN = document.createElement('input');
            inputN.type = 'text';
            inputN.cssClass = 'form-control';
            form.append(inputN);

        let labelD = document.createElement('label');
            labelD.innerHTML = 'Descripción';
            form.append(labelD);

        let inputD = document.createElement('textarea');
            inputD.cssClass = 'form-control';
            form.append(inputD);

        let labelF = document.createElement('label');
            labelF.innerHTML = 'Esquema en PDF';
            form.append(labelF);

        let inputF = document.createElement('input');
            inputF.type = 'file';
            inputF.lang = 'es';
            inputF.cssClass = 'form-control';
            form.append(inputF);

        let formAceptar = () => {
                let json = {
                    nombre:inputN.value,
                    descripcion:inputD.value,
                    archivo : 'nombre del archivo'
                };
                console.log(json);
            };

        let formCancelar = () => {
                formWindow.close();
            };

        let formWindow = BootstrapDialog.show({
                closable:false,
                type:BootstrapDialog.TYPE_PRIMARY,
                size:BootstrapDialog.SIZE_NORMAL,
                title: 'Enviar esquema',
                message:form,
                buttons:[{
                    cssClass:'btn btn-danger pull-left',
                    label:'Cancelar',
                    action:formCancelar
                },{
                    cssClass:'btn btn-success pull-right',
                    label:'Aceptar',
                    action:formAceptar 
                }]
            });
    };

    $scope.init();
        
});