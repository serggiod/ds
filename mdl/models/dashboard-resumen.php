<?php
    $app->get('/dashboard/resumen/esquemas-enviados', function($rq, $rs, $a) use ($session,$pdo,$e404) {
        
        $sql   = "CALL dashboardResumenEsquemasEnviados();";
        
        $query = $pdo->prepare($sql);

        if($query->execute()){
            $rs = $rs->withHeader('Content-Type','application/json; charset=UTF-8');
            return $rs->write($query->fetchColumn());
        } else $e404();

    });

    $app->put('/dashboard/resumen/esquemas-enviados-update', function($rq, $rs, $a) use ($session,$pdo,$e404) {
        
        $esquema = json_decode($rq->getBody());
        $esquema->id = intval($esquema->id);
        $esquema->esquema = filter_var($esquema->esquema,FILTER_SANITIZE_STRING);
        $esquema->descripcion = filter_var($esquema->descripcion,FILTER_SANITIZE_STRING);

        $sql   = "CALL dashboardResumenEsquemasEnviadosUpdate('";
        $sql .= $esquema->id."','";
        $sql .= $esquema->esquema."','";
        $sql .= $esquema->descripcion."');";

        $query = $pdo->prepare($sql);

        if($query->execute()){
            $rs = $rs->withHeader('Content-Type','application/json; charset=UTF-8');
            return $rs->write($query->fetchColumn());
        } else $e404();

    });

    $app->put('/dashboard/resumen/esquemas-enviados-aprobar', function($rq, $rs, $a) use ($session,$pdo,$e404) {
        
        $esquema = json_decode($rq->getBody());

        $sql  = "CALL dashboardResumenEsquemasEnviadosAprobar('";
        $sql .= intval($esquema->id);
        $sql .= "');";
        
        $query = $pdo->prepare($sql);

        if($query->execute()){
            $rs = $rs->withHeader('Content-Type','application/json; charset=UTF-8');
            return $rs->write($query->fetchColumn());
        } else $e404();

    });

    $app->put('/dashboard/resumen/esquemas-enviados-rechazar', function($rq, $rs, $a) use ($session,$pdo,$e404) {
        
        $esquema = json_decode($rq->getBody());

        $sql  = "CALL dashboardResumenEsquemasEnviadosRechazar('";
        $sql .= intval($esquema->id);
        $sql .= "');";
        
        $query = $pdo->prepare($sql);

        if($query->execute()){
            $rs = $rs->withHeader('Content-Type','application/json; charset=UTF-8');
            return $rs->write($query->fetchColumn());
        } else $e404();

    });

    $app->get('/dashboard/resumen/esquemas-comprados', function($rq, $rs, $a) use ($session,$pdo,$e404) {
        
        /*$sql   = "CALL esquemaBuscar('";
        $sql  .= preg_replace('[a-zA-Z0-9\ \-\_\.\;]','',$a['esquema']);
        $sql  .= "');";
        
        $query = $pdo->prepare($sql);*/
        $json = json_decode('[
            {"esquema":"Prueba1","fecha":"29-05-2018","id":"1"},
            {"esquema":"Prueba2","fecha":"28-05-2018","id":"2"},
            {"esquema":"Prueba3","fecha":"27-05-2018","id":"3"},
            {"esquema":"Prueba4","fecha":"26-05-2018","id":"4"},
            {"esquema":"Prueba5","fecha":"25-05-2018","id":"5"},
            {"esquema":"Prueba6","fecha":"24-05-2018","id":"6"},
            {"esquema":"Prueba7","fecha":"23-05-2018","id":"7"},
            {"esquema":"Prueba8","fecha":"22-05-2018","id":"8"},
            {"esquema":"Prueba9","fecha":"21-05-2018","id":"9"},
            {"esquema":"Prueba10","fecha":"20-05-2018","id":"10"}
        ]');
        
    
        //if($query->execute()){
            $rs = $rs->withHeader('Content-Type','application/json; charset=UTF-8');
            //return $rs->write($query->fetchColumn());
            return $rs->write(json_encode([result=>true,rows=>$json]));
        //} else $e404();

    });

    $app->get('/dashboard/resumen/esquemas-buscados', function($rq, $rs, $a) use ($session,$pdo,$e404) {
        
        /*$sql   = "CALL esquemaBuscar('";
        $sql  .= preg_replace('[a-zA-Z0-9\ \-\_\.\;]','',$a['esquema']);
        $sql  .= "');";
        
        $query = $pdo->prepare($sql);*/
        $json = json_decode('[
            {"esquema":"Prueba1","fecha":"29-05-2018","id":"1"},
            {"esquema":"Prueba2","fecha":"28-05-2018","id":"2"},
            {"esquema":"Prueba3","fecha":"27-05-2018","id":"3"},
            {"esquema":"Prueba4","fecha":"26-05-2018","id":"4"},
            {"esquema":"Prueba5","fecha":"25-05-2018","id":"5"},
            {"esquema":"Prueba6","fecha":"24-05-2018","id":"6"},
            {"esquema":"Prueba7","fecha":"23-05-2018","id":"7"},
            {"esquema":"Prueba8","fecha":"22-05-2018","id":"8"},
            {"esquema":"Prueba9","fecha":"21-05-2018","id":"9"},
            {"esquema":"Prueba10","fecha":"20-05-2018","id":"10"}
        ]');
        
    
        //if($query->execute()){
            $rs = $rs->withHeader('Content-Type','application/json; charset=UTF-8');
            //return $rs->write($query->fetchColumn());
            return $rs->write(json_encode([result=>true,rows=>$json]));
        //} else $e404();

    });

    $app->get('/dashboard/resumen/usuarios-registrados', function($rq, $rs, $a) use ($session,$pdo,$e404) {
        
        /*$sql   = "CALL esquemaBuscar('";
        $sql  .= preg_replace('[a-zA-Z0-9\ \-\_\.\;]','',$a['esquema']);
        $sql  .= "');";
        
        $query = $pdo->prepare($sql);*/
        $json = json_decode('[
            {"usuario":"Nombre1 Nombre2 Apellido1","fecha":"29-05-2018","id":"1"},
            {"usuario":"Nombre1 Nombre2 Apellido1","fecha":"28-05-2018","id":"2"},
            {"usuario":"Nombre1 Nombre2 Apellido1","fecha":"27-05-2018","id":"3"},
            {"usuario":"Nombre1 Nombre2 Apellido1","fecha":"26-05-2018","id":"4"},
            {"usuario":"Nombre1 Nombre2 Apellido1","fecha":"25-05-2018","id":"5"},
            {"usuario":"Nombre1 Nombre2 Apellido1","fecha":"24-05-2018","id":"6"},
            {"usuario":"Nombre1 Nombre2 Apellido1","fecha":"23-05-2018","id":"7"},
            {"usuario":"Nombre1 Nombre2 Apellido1","fecha":"22-05-2018","id":"8"},
            {"usuario":"Nombre1 Nombre2 Apellido1","fecha":"21-05-2018","id":"9"},
            {"usuario":"Nombre1 Nombre2 Apellido1","fecha":"20-05-2018","id":"10"}
        ]');
        
    
        //if($query->execute()){
            $rs = $rs->withHeader('Content-Type','application/json; charset=UTF-8');
            //return $rs->write($query->fetchColumn());
            return $rs->write(json_encode([result=>true,rows=>$json]));
        //} else $e404();

    });