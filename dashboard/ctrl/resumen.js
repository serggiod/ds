angular
	.module('application')
	.controller('resumenCtrl', function($scope,$http,$location,$session,$rootScope,$interval) {

		$scope.init = function(){
			$rootScope.section = 'Resumen';
			/*$scope.interval = $interval(function(){
				let url = '../mdl/index.php/session/dashboard/status';
					$http
						.get(url)
						.error(function(){
							$session.destroy();
							document.location.href = 'index.html#login';
						})
						.success(function(json){
							if(json.result===false) document.location.href = 'index.html#login';
						});
			},30000);*/
			$scope.esquemasEnviados.model.init();
			$scope.esquemasComprados.model.init();
			$scope.esquemasBuscados.model.init();
			$scope.usuariosRegistrados.model.init();
		};

		$scope.esquemasEnviados = {
			panel:{
				color:'red',
				icono:'cloud-upload',
				titulo:'Enviados'
			},
			tabla:{
				encabezados:['esquema','fecha'],
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
					let url = '../mdl/index.php/dashboard/resumen/esquemas-enviados';
					$http.get(url).success((json)=>{
						if(json.result===true) $scope.esquemasEnviados.tabla.registros = json.rows;
					});
				}
			}

		};

		$scope.esquemasComprados = {
			panel:{
				color:'green',
				icono:'shopping-cart',
				titulo:'Comprados'
			},
			tabla:{
				encabezados:['esquema','fecha'],
				registros:[]
			},
			acciones:[
				{icono:'check-circle',texto:'',tipo:'success',ejecutar:function(id){
					console.log(id);
				}},
				{icono:'pencil',texto:'',tipo:'primary',ejecutar:function(id){
					console.log(id);
				}}
			],
			model:{
				init:function(){
					let url = '../mdl/index.php/dashboard/resumen/esquemas-comprados';
					$http.get(url).success((json)=>{
						if(json.result===true) $scope.esquemasComprados.tabla.registros = json.rows;
					});
				}
			}

		};

		$scope.esquemasBuscados = {
			panel:{
				color:'primary',
				icono:'search',
				titulo:'Busquedas'
			},
			tabla:{
				encabezados:['esquema','fecha'],
				registros:[]
			},
			acciones:[
				{icono:'check-circle',texto:'',tipo:'success',ejecutar:function(id){
					console.log(id);
				}},
				{icono:'pencil',texto:'',tipo:'primary',ejecutar:function(id){
					console.log(id);
				}}
			],
			model:{
				init:function(){
					let url = '../mdl/index.php/dashboard/resumen/esquemas-buscados';
					$http.get(url).success((json)=>{
						if(json.result===true) $scope.esquemasBuscados.tabla.registros = json.rows;
					});
				}
			}

		};

		$scope.usuariosRegistrados = {
			panel:{
				color:'yellow',
				icono:'user',
				titulo:'Registrados'
			},
			tabla:{
				encabezados:['usuario','fecha'],
				registros:[]
			},
			acciones:[
				{icono:'check-circle',texto:'',tipo:'success',ejecutar:function(id){
					console.log(id);
				}},
				{icono:'pencil',texto:'',tipo:'primary',ejecutar:function(id){
					console.log(id);
				}}
			],
			model:{
				init:function(){
					let url = '../mdl/index.php/dashboard/resumen/usuarios-registrados';
					$http.get(url).success((json)=>{
						if(json.result===true) $scope.usuariosRegistrados.tabla.registros = json.rows;
					});
				}
			}

		};

		$scope.init();
	});