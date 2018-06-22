angular.module('application').controller('usuarioCtrl',function($scope,$http,$location,$session,$rootScope){

    $scope.init = function(){
        $rootScope.showUserMenu = false;
        if($session.get('estado')==='ACTIVO'){
            $rootScope.showUserMenu = true;
            $rootScope.nombre = $session.get('nombre');
            $rootScope.isAdmin = eval($session.get('isadmin'));
        }

        $scope.esquemasEnviados.model.init();
    };

    $scope.esquemasEnviados = {
        panel:{
            color:'primary',
            icono:'cloud-upload',
            titulo:'Esquemas Enviados'
        },
        tabla:{
            encabezados:['esquema','fecha',,'estado'],
            registros:[]
        },
        acciones:[
            /*{icono:'external-link-square',texto:'',tipo:'info',ejecutar:function(key){
                let esquema = $scope.esquemasEnviados.tabla.registros[key];
                let aceptar = function(){ form.close(); };
                let html  = '<div class="row">';
                    html += '	<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">';
                    html += '		<strong>Nombre:</strong>';
                    html += '	</div>';
                    html += '	<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">';
                    html += '		<input id="esquema" type="text" class="form-control" maxlength="30" value="'+esquema.esquema+'"/>';
                    html += '	</div>';
                    html += '</div>';
                    html += '<div class="row">';
                    html += '	<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">';
                    html += '		<strong>Descripción:</strong>';
                    html += '	</div>';
                    html += '	<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">';
                    html += '		<textarea id="descripcion" class="form-control" rows="3">'+esquema.descripcion+'</textarea>';
                    html += '	</div>';
                    html += '</div>';
                let form = BootstrapDialog.show({
                        title    : '<i class="fa fa-pencil"></i> MODIFICAR',
                        message  : html,
                        closable : false,
                        type     : BootstrapDialog.TYPE_PRIMARY,
                        buttons  : [
                            {label:'Aceptar', cssClass:'btn btn-info', action:aceptar}
                        ]
                    });
            }},
            {icono:'pencil-square',texto:'',tipo:'primary',ejecutar:function(key){
                if(confirm('¿Esta seguro que desea modificar este registro?')){
                    let esquema = $scope.esquemasEnviados.tabla.registros[key];
                    let aceptar = function(){
                            let url = '../mdl/index.php/dashboard/resumen/esquemas-enviados-update';
                            let rege = new RegExp('[a-z0-9\-]','gi');
                            let regd = new RegExp('[a-z0-9áéíóúÀÉÍÓÚñÑ,. \-]','gi');
                                esquema.esquema = document.getElementById('esquema').value;
                                esquema.esquema = esquema.esquema.match(rege).join('');
                                esquema.descripcion = document.getElementById('descripcion').value;
                                esquema.descripcion = esquema.descripcion.match(regd).join('');
                                $http.put(url,esquema).success(function(json){
                                    if(json.result===true){
                                        $scope.esquemasEnviados.model.init();
                                        form.close();
                                    }
                                });
                        };
                    let cancelar = function(){ form.close(); };
                    let html  = '<div class="row">';
                        html += '	<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">';
                        html += '		<strong>Nombre:</strong>';
                        html += '	</div>';
                        html += '	<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">';
                        html += '		<input id="esquema" type="text" class="form-control" maxlength="30" value="'+esquema.esquema+'"/>';
                        html += '	</div>';
                        html += '</div>';
                        html += '<div class="row">';
                        html += '	<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">';
                        html += '		<strong>Descripción:</strong>';
                        html += '	</div>';
                        html += '	<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">';
                        html += '		<textarea id="descripcion" class="form-control" rows="3">'+esquema.descripcion+'</textarea>';
                        html += '	</div>';
                        html += '</div>';
                    let form = BootstrapDialog.show({
                            title    : '<i class="fa fa-pencil"></i> MODIFICAR',
                            message  : html,
                            closable : false,
                            type     : BootstrapDialog.TYPE_PRIMARY,
                            buttons  : [
                                {label:'Aceptar', cssClass:'btn btn-primary', action:aceptar},
                                {label:'Cancelar', cssClass:'btn btn-info', action:cancelar}
                            ]
                        });
                }
            }},
            {icono:'check-circle',texto:'',tipo:'success',ejecutar:function(key){
                if(confirm('¿Esta seguro que desea APROBAR este esquema?')){
                    let esquema = $scope.esquemasEnviados.tabla.registros[key];
                    let url = '../mdl/index.php/dashboard/resumen/esquemas-enviados-aprobar';
                        $http.put(url,esquema).success(function(json){
                            if(json.result===true) $scope.esquemasEnviados.model.init();
                        });
                }
            }},*/
            {icono:'times-circle',text:'',tipo:'danger',ejecutar:function(key){
                if(confirm('¿Esta seguro que desea RECHAZAR este esquema?')){
                    let esquema = $scope.esquemasEnviados.tabla.registros[key];
                    let url = '../mdl/index.php/dashboard/resumen/esquemas-enviados-rechazar';
                        $http.put(url,esquema).success(function(json){
                            if(json.result===true) $scope.esquemasEnviados.model.init();
                        });
                }
            }}
        ],
        model:{
            init:function(){
                let url = 'mdl/index.php/usuario/esquemas/enviados';
                $http.get(url).success((json)=>{
                    if(json.result===true) $scope.esquemasEnviados.tabla.registros = json.rows;
                });
            }
        },
        enviarUnEsquema:function(){
            let html  = '<div class="row">';
                html += '   <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">';
                html += '       <strong>Nombre:</strong>';
                html += '   </div>';
                html += '   <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">';
                html += '       <input id="nombre" type="text" class="form-control" maxlength="40">';
                html += '   </div>';
                html += "</div>";
                html += '<div class="row">';
                html += '   <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">';
                html += '       <strong>Descripción:</strong>';
                html += '   </div>';
                html += '   <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">';
                html += '       <textarea id="descripcion" class="form-control" rows="2"></textarea>';
                html += '   </div>';
                html += "</div>";
                html += '<div class="row">';
                html += '   <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">';
                html += '       <strong>Archivo:</strong>';
                html += '   </div>';
                html += '   <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">';
                html += '       <input id="archivo" type="file" accept=".pdf" class="btn btn-primary form-control" lang="es">';
                html += '   </div>';
                html += "</div>";
                
            let aceptar = function() {
                let archivo = document.getElementById('archivo');
                
                if(archivo.files.length===1 && archivo.files[0].type==='application/pdf'){
                    let file = archivo.files[0];
                    let read = new FileReader();
                        read.readAsDataURL(archivo.files[0]);
                        read.onload = function(event) {
                            let url = 'mdl/index.php/usuarios/esquemas/nuevo';
                            let json = {
                                nombre:document.getElementById('nombre').value.match(new RegExp('[a-z0-9-]','gi')).join(''),
                                descripcion:document.getElementById('descripcion').value.match(new RegExp('[a-z0-9áéíóúÁÉÍÓÚñÑ.; ]','gim')).join(''),
                                base64:event.target.result.replace('data:application/pdf;base64,','')
                            };
                            //$session.execute(function(){
                                $http
                                    .post(url,json)
                                    .success(function(json){
                                        if(json.result===false) BootstrapDialog.alert({title:'Error',message:'El esquema no se ha guardado en forma correcta.',type:BootstrapDialog.TYPE_DANGER});
                                        if(json.result===true){
                                            $scope.esquemasEnviados.model.init();
                                            BootstrapDialog.alert({title:'Ok',message:'El quema se ha guardado en forma correcta.',type:BootstrapDialog.TYPE_SUCCESS});
                                            form.close();
                                        }
                                    });
                            //});
                        };
                } else BootstrapDialog.alert({title:'Error',message:'Debe seleccionar un archivo.',type:BootstrapDialog.TYPE_DANGER});
            };

            let cancelar = function() { form.close(); };

            let form = BootstrapDialog.show({
                    closable:false,
                    title: '<i class="fa fa-cloud-upload"></i> Enviar un esquema',
                    message:html,
                    buttons:[
                        {cssClass:'btn btn-primary',label:'<i class="fa fa-check-circle"></i> Aceptar',action:aceptar},
                        {cssClass:'btn btn-info',label:'<i class="fa fa-times-circle"></i> Cancelar',action:cancelar}
                    ]
                });
        }
    };

    $scope.init();
        
});