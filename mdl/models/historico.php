<?php
    $app->get('/historico/select/all', function($rq, $rs, $a) use ($pdo,$e404) {
        
        $sql   = "CALL historicoSelectAll();";
        
        $query = $pdo->prepare($sql);
        
        if($query->execute()){
            $rs = $rs->withHeader('Content-Type','application/json; charset=UTF-8');
            return $rs->write($query->fetchColumn());
        } else $e404();

    });
    
    