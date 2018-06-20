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
            {icono:'external-link-square',texto:'',tipo:'info',ejecutar:function(key){
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
            }},
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
        }
    };

    $scope.init();
        
});