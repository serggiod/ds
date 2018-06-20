<?php
    $app->post('/session/login',function($rq,$rs,$a) use ($pdo,$e404) {

        $usuario = json_decode($rq->getBody());

        $sql   = "CALL usuariosLogin(";
        $sql  .= "'".preg_replace('[A-Z0-9.@]','',$usuario->email)."',";
        $sql  .= "'".preg_replace('[A-Z0-9]','',$usuario->password)."'";
        $sql  .= ");";
        
        $query = $pdo->prepare($sql);
        
        if($query->execute()){
            $date = new DateTime();
            $json = $query->fetchColumn();
            $login = json_decode($json);
            if($login->result==true) {
                $_SESSION['ESTADO']   = 'ACTIVO';
                $_SESSION['USUID']    = $login->rows->id;
                $_SESSION['LASTTIME'] = $date->getTimestamp();
                $_SESSION['ADMIN']    = 'FALSE';
            }
            $rs = $rs->withHeader('Content-Type','application/json; charset=UTF-8');
            return $rs->write($json);
        } else $e404();
        
    });

    $app->post('/session/dashboard/login',function($rq,$rs,$a) use ($pdo,$e404) {

        $usuario = json_decode($rq->getBody());

        $sql   = "CALL dashboardLogin(";
        $sql  .= "'".preg_replace('[A-Z0-9.@]','',$usuario->usuario)."',";
        $sql  .= "'".preg_replace('[A-Z0-9]','',$usuario->password)."'";
        $sql  .= ");";
        
        $query = $pdo->prepare($sql);
        
        if($query->execute()){
            $date = new DateTime();
            $json = $query->fetchColumn();
            $login = json_decode($json);
            if($login->result==true) {
                $_SESSION['ESTADO']   = 'ACTIVO';
                $_SESSION['USUID']    = $login->rows->id;
                $_SESSION['LASTTIME'] = $date->getTimestamp();
                $_SESSION['ADMIN']    = 'TRUE';
                $rs = $rs->withHeader('Content-Type','application/json; charset=UTF-8');
                return $rs->write($json);
            } else $e404();
        } else $e404();
        
    });

    $app->get('/session/dashboard/status',function($rq,$rs,$a) use ($pdo,$e404,$session) {
        //$json = ['result'=>$session(), 'rows'=>null];
        $rs = $rs->withHeader('Content-Type','application/json; charset=UTF-8');
        return $rs->write(json_encode(['result'=>true,'rows'=>null]));
    });

    $app->delete('/session/logout',function($rq,$rs,$a) use ($pdo,$e404) {

        unset($_SESSION['ADMIN']);
        unset($_SESSION['ESTADO']);
        unset($_SESSION['LASTTIME']);
        session_unset();
        session_destroy();
        $rs = $rs->withHeader('Content-Type','application/json; charset=UTF-8');
        return $rs->write(json_encode(['result'=>true,'rows'=>null]));
        
    });

    $app->get('/session/status',function($rq,$rs,$a) use ($pdo,$e404,$session) {

        $json = ['result'=>$session(), 'rows'=>null];
        $rs = $rs->withHeader('Content-Type','application/json; charset=UTF-8');
        return $rs->write(json_encode($json));
        
    });

