<?php
    $app->get('/esquemas/buscar/{esquema}', function($rq, $rs, $a) use ($pdo,$e404) {
        
        $sql   = "CALL esquemaBuscar('";
        $sql  .= preg_replace('[a-zA-Z0-9\ \-\_\.\;]','',$a['esquema']);
        $sql  .= "');";
        
        $query = $pdo->prepare($sql);
        
        if($query->execute()){
            $rs = $rs->withHeader('Content-Type','application/json; charset=UTF-8');
            return $rs->write($query->fetchColumn());
        } else $e404();

    });
    
    $app->get('/esquemas/descargar/{file}',function($rq,$rs,$a) use ($pdo,$e404) {

        $file = preg_replace('[a-zA-Z0-9]','',$a['file']);
        $blob = file_get_contents('./../files/'.$file);
        $rs   = $rs->withHeader('Content-Type','application/pdf');
        return $rs->write($blob);
        
    });

    $app->post('/esquemas/insert',function($rq,$rs,$a) use ($pdo,$e404,$session){
        if($session()===true){
            $json = array('result'=>false,'rows'=>null);
            $body = $rq->getParsedBody();
            error_log($body['nombre']);
            error_log($body['descripcion']);
            error_log($body['base64']);
            $rs = $rs->withHeader('Content-Type','application/json');
            return $rs->write(json_encode($json));
        }
    });
    