<?php
    $app->post('/session/login',function($rq,$rs,$a) use ($pdo,$e404) {

        $usuario = $rq->getParsedBody();

        $sql   = "CALL usuariosLogin(";
        $sql  .= "'".preg_replace('[A-Z0-9.@]','',$usuario['email'])."',";
        $sql  .= "'".preg_replace('[A-Z0-9]','',$usuario['password'])."'";
        $sql  .= ");";
        
        $query = $pdo->prepare($sql);
        
        if($query->execute()){
            $date = new DateTime();
            $json = $query->fetchColumn();
            $login = json_decode($json);
            if($login->result==true) {
                $_SESSION['ESTADO'] = 'ACTIVO';
                $_SESSION['LASTTIME'] = $date->getTimestamp();
            }
            $rs = $rs->withHeader('Content-Type','application/json; charset=UTF-8');
            return $rs->write($json);
        } else $e404();
        
    });

    $app->delete('/session/logout',function($rq,$rs,$a) use ($pdo,$e404) {

        unset($_SESSION['ESTADO']);
        unset($_SESSION['LASTTIME']);
        session_unset();
        session_destroy();
        $rs = $rs->withHeader('Content-Type','application/json; charset=UTF-8');
        return $rs->write(json_encode(['result'=>true,'rows'=>null]));
        
    });

    $app->get('/session/status',function($rq,$rs,$a) use ($pdo,$e404) {

        $json = ['result'=>false, 'rows'=>null];
        $date = new DateTime();
        $diff = ($date->getTimestamp() - intval($_SESSION['LASTTIME'])) /1000;
        if($diff<=3600){
            $_SESSION['LASTTIME'] = $date->getTimestamp();
            $json['result'] = true;
        }
        $rs = $rs->withHeader('Content-Type','application/json; charset=UTF-8');
        return $rs->write(json_encode($json));
        
    });
