angular
.module('application')
.controller('carritoCtrl',function($scope,$http,$location,$session,$routeParams){
   
    $scope.carrito = {
        panel:{
            color:'primary',
            icono:'shopping-cart',
            titulo:'Esquemas en el carrito'
        },
        tabla:{
            encabezados:['esquema','precio','cantidad'],
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
            }}*/
        ],
        model:{
            init:function(){
                let url = 'mdl/index.php/usuario/esquemas/enviados';
                $http.get(url).success((json)=>{
                    if(json.result===true) $scope.esquemasEnviados.tabla.registros = json.rows;
                });
            }
        },
        irALaPasarelaDePago:function(){
            alert('Ir a la pasarela de pago.');
        }
    };

    $scope.agregarAlCarrito = function(esquema){
        console.log(esquema);
        alert('Agregar al carrito y despues ir a la pasarela de pago.');
        //$scope.carrito.tabla.registros.push(esquema);
    };
});