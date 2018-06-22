<?php
    $app->post('/usuarios/registrar',function($rq,$rs,$a) use ($pdo,$e404) {
        $usuario = $rq->getParsedBody();
        $sql   = "CALL usuariosRegistrar(";
        $sql  .= "'".preg_replace('[A-Z0-9áéíóúÁÉÍÓÚÑñ\ ]','',$usuario['nombre'])."',";
        $sql  .= "'".preg_replace('[A-Z0-9áéíóúÁÉÍÓÚÑñ\ ]','',$usuario['apellido'])."',";
        $sql  .= "'".preg_replace('[A-Z0-9.@]','',$usuario['email'])."',";
        $sql  .= "'".preg_replace('[A-Z0-9]','',$usuario['password'])."'";
        $sql  .= ");";
        $query = $pdo->prepare($sql);
        if($query->execute()){
            $rs = $rs->withHeader('Content-Type','application/json; charset=UTF-8');
            return $rs->write($query->fetchColumn());
        } else $e404();
    });

    $app->post('/usuarios/esquemas/nuevo',function($rq,$rs,$a) use ($pdo,$e404,$session){
        if($session()===true){
            
            $body = json_decode($rq->getBody());

            $filename = md5($body->base64.time());

            file_put_contents('../tmp/'.$filename.'.pdf',base64_decode($body->base64),755);

            $sql   = "CALL usuariosEsquemasNuevo(";
            $sql  .= "'".$_SESSION['USUID']."',";
            $sql  .= "'".preg_replace('[a-z0-9-]','',$body->nombre)."',";
            $sql  .= "'".preg_replace('[a-z0-9áéíóúÁÉÍÓÚñÑ.; ]','',$body->descripcion)."',";
            $sql  .= "'".$filename."'";
            $sql  .= ");";

            $query = $pdo->prepare($sql);

            if($query->execute()){
                $rs = $rs->withHeader('Content-Type','application/json; charset=UTF-8');
                return $rs->write($query->fetchColumn());
            } else $e404();
        }
    });

    $app->get('/usuario/esquemas/enviados',function($rq,$rs,$a) use ($pdo,$e404,$session){
        
        $usuId = $_SESSION['USUID'];

        $sql = "CALL usuarioEsquemasEnviados($usuId);";
        
        error_log($sql);
        $query = $pdo->prepare($sql);
        
        if($query->execute()){
            $rs = $rs->withHeader('Content-Type','application/json; charset=UTF-8');
            return $rs->write($query->fetchColumn());
        } else $e404();

    });