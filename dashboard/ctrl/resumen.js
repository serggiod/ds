angular
	.module('application')
	.controller('resumenCtrl', function($scope,$http,$location,$session,$rootScope,$interval) {

		$scope.init = function(){
			$rootScope.section = 'Resumen';
			$scope.interval = $interval(function(){
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
			},30000);
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
				encabezados:['nombre','fecha'],
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
				registros:[
					{esquema:'Prueba1',fecha:'29-05-2018',id:'1'},
					{esquema:'Prueba2',fecha:'28-05-2018',id:'2'},
					{esquema:'Prueba3',fecha:'27-05-2018',id:'3'},
					{esquema:'Prueba4',fecha:'26-05-2018',id:'4'},
					{esquema:'Prueba5',fecha:'25-05-2018',id:'5'},
					{esquema:'Prueba6',fecha:'24-05-2018',id:'6'},
					{esquema:'Prueba7',fecha:'23-05-2018',id:'7'},
					{esquema:'Prueba8',fecha:'22-05-2018',id:'8'},
					{esquema:'Prueba9',fecha:'21-05-2018',id:'9'},
					{esquema:'Prueba10',fecha:'20-05-2018',id:'10'}
				]
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