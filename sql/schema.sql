# ESQUEMAS MCXM,K
DROP TABLE IF EXISTS esquemas;
CREATE TABLE esquemas (
  esq_id   INT(11) NOT NULL AUTO_INCREMENT,
  esq_par  INT(11) NULL,
  esq_nom  VARCHAR(40),
  esq_des  TEXT,
  esq_fil  VARCHAR(32),
  esq_dat  TIMESTAMP,
  esq_sts  ENUM('PUBLICADO','PENDIENTE'),
  PRIMARY KEY (esq_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS historico;
CREATE TABLE historico (
  his_id INT(11) NOT NULL AUTO_INCREMENT,
  esq_nom VARCHAR(40),
  his_dat TIMESTAMP,
  his_cou INT(11) NULL,
  PRIMARY KEY (his_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios (
  usu_id INT(11) NOT NULL AUTO_INCREMENT,
  usu_nom VARCHAR(50),
  usu_ape VARCHAR(50),
  usu_ema VARCHAR(30),
  usu_pas VARCHAR(32),
  usu_adm ENUM('true','false'),
  PRIMARY KEY (usu_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
INSERT INTO usuarios VALUES(1,'Administrador','Sistema','admin@ds.com','1a1dc91c907325c69271ddf0c944bc72','true');

DROP TABLE IF EXISTS usuarios_esquemas;
CREATE TABLE usuarios_esquemas (
  use_id INT(11) NOT NULL AUTO_INCREMENT,
  usu_id INT(11) NULL,
  use_nom VARCHAR(30),
  use_des TEXT,
  use_arc CHAR(32),
  use_dat TIMESTAMP,
  use_est ENUM('APROBADO','PENDIENTE','RECHAZADO'), 
  PRIMARY KEY (use_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
INSERT INTO usuarios_esquemas VALUES (null,1,'ADF-ASDF-ASD','DESCRIPCION DE ESQUEMA.','adf',now(),'PENDIENTE');
INSERT INTO usuarios_esquemas VALUES (null,1,'WDR-ASDF-ASD','DESCRIPCION DE ESQUEMA.','adf',now(),'PENDIENTE');
INSERT INTO usuarios_esquemas VALUES (null,1,'SDR-ASDF-ASD','DESCRIPCION DE ESQUEMA.','adf',now(),'PENDIENTE');
INSERT INTO usuarios_esquemas VALUES (null,1,'DRF-ASDF-ASD','DESCRIPCION DE ESQUEMA.','adf',now(),'PENDIENTE');
INSERT INTO usuarios_esquemas VALUES (null,1,'QAS-ASDF-ASD','DESCRIPCION DE ESQUEMA.','adf',now(),'PENDIENTE');
INSERT INTO usuarios_esquemas VALUES (null,1,'FTG-ASDF-ASD','DESCRIPCION DE ESQUEMA.','adf',now(),'PENDIENTE');


/* FRONTEND */
# PROCEDIMINETOS
DELIMITER $
#-----------------------------------------------------------
DROP PROCEDURE IF EXISTS esquemaBuscar$
CREATE PROCEDURE esquemaBuscar (
  esq_nom VARCHAR(40)
)
BEGIN
    SET @json = (SELECT CONCAT('{"result":false,"rows":null}'));
    SET @esquemas = (
      SELECT GROUP_CONCAT(
          CONCAT(
            '{"nombre":"',e.esq_nom,'",',
            '"file":"',e.esq_fil,'",',
            '"date":"',DATE_FORMAT(e.esq_dat,'%d-%m-%Y %h:%i'),'",',
            '"descripcion":"',e.esq_des,'"}'
          ) ORDER BY e.esq_dat DESC
      )
      FROM esquemas e
      WHERE e.esq_nom LIKE CONCAT('%',esq_nom,'%')
    );
    SET @count = (SELECT COUNT(@esquemas));
    
    IF @count >= 1 THEN
      SET @json = (SELECT CONCAT('{"result":true,"rows":[',@esquemas,']}'));
      CALL historicoInsertar(esq_nom);
    END IF;
     
    SELECT @json;

END$
#-----------------------------------------------------------
#-----------------------------------------------------------
DROP PROCEDURE IF EXISTS historicoInsertar$
CREATE PROCEDURE historicoInsertar (
  esq_nom VARCHAR(40)
)
BEGIN
  SET @count = (
    SELECT
      COUNT(*)
    FROM
      esquemas e
    WHERE
      e.esq_nom LIKE CONCAT('%',esq_nom,'%')
  );

  IF @count >= 1 THEN
    INSERT INTO historico VALUES(NULL,esq_nom,NOW(),@count);
  END IF;
END$
#-----------------------------------------------------------
DROP PROCEDURE IF EXISTS historicoSelectAll$
CREATE PROCEDURE historicoSelectAll ()
BEGIN
  SET @json = (SELECT CONCAT('{"result":false,"rows":null}'));
  SET @historico = (
    SELECT
      GROUP_CONCAT(
        CONCAT(
          '{"fecha":"',DATE_FORMAT(h.his_dat,'%d-%m-%Y %h:%i'),'",',
          '"esquema":"',h.esq_nom,'",',
          '"target":"',h.his_cou,'"}'
        ) ORDER BY h.his_dat DESC
      )
    FROM historico h 
  );
  SET @count = (SELECT COUNT(@historico));

  IF @count >= 1 THEN
    SET @json = (SELECT CONCAT('{"result":true,"rows":[',@historico,']}'));
  END IF; 
  SELECT @json;
END$
#----------------------------------------------------------------------
DROP PROCEDURE IF EXISTS usuariosRegistrar$
CREATE PROCEDURE usuariosRegistrar (
  usu_nom VARCHAR(50),
  usu_ape VARCHAR(50),
  usu_ema VARCHAR(30),
  usu_pas VARCHAR(32)
)
BEGIN
  SET @json = (SELECT CONCAT('{"result":false,"rows":null}'));
  INSERT INTO usuarios VALUES (NULL,usu_nom,usu_ape,usu_ema,usu_pas);
  SET @count = (SELECT LAST_INSERT_ID());
  IF @count >= 1 THEN
    SET @json = (SELECT CONCAT('{"result":true,"rows":null}'));
  END IF; 
  SELECT @json;
END$
#----------------------------------------------------------------------
DROP PROCEDURE IF EXISTS usuariosEsquemasNuevo$
CREATE PROCEDURE usuariosEsquemasNuevo(
  usu_id INT(11),
  use_nom VARCHAR(30),
  use_des TEXT,
  use_arc CHAR(32)
)
BEGIN
  SET @json = (SELECT CONCAT('{"result":false,"rows":null}'));
  INSERT INTO usuarios_esquemas VALUES(NULL,usu_id,use_nom,use_des,use_arc,NOW(),'PENDIENTE');
  SET @count = (SELECT LAST_INSERT_ID());
  IF @count >=1 THEN
    SET @json = (SELECT CONCAT('{"result":true,"rows":false}'));
  END IF;
  SELECT @json;
END$
#----------------------------------------------------------------------
DROP PROCEDURE IF EXISTS usuarioEsquemasEnviados$
CREATE PROCEDURE usuarioEsquemasEnviados (
  usu_id INT(11)
)
BEGIN
  SET @json = (SELECT CONCAT('{"result":false,"rows":null}'));
  SET @esquemas = (SELECT GROUP_CONCAT(CONCAT('{"id":"',ue.use_id,'","nombre":"',ue.use_nom,'","estado":"',ue.use_est,'","fecha":"',DATE_FORMAT(ue.use_dat,'%d-%m-%Y'),'"}') ORDER BY ue.use_dat DESC) FROM usuarios_esquemas ue WHERE uea.usu_id=usu_id);
  SET @count = (SELECT COUNT(@esquemas));
  IF @count >=1 THEN
    SET @json = (SELECT CONCAT('{"result":true,"rows":[',@esquemas,']}'));
  END IF;   
  SELECT @json;
END$
#----------------------------------------------------------------------
DROP PROCEDURE IF EXISTS usuariosLogin$
CREATE PROCEDURE usuariosLogin (
  usu_ema VARCHAR(30),
  usu_pas VARCHAR(32)
)
BEGIN
  SET @json = (SELECT CONCAT('{"result":false,"rows":true}'));
  SET @usuario = (SELECT CONCAT('{"id":"',u.usu_id,'","nombre":"',u.usu_nom,'","apellido":"',u.usu_ape,'","email":"',u.usu_ema,'","isadmin":"',u.usu_adm,'"}') FROM usuarios u WHERE u.usu_ema=usu_ema AND u.usu_pas=usu_pas);
  SET @count = (SELECT COUNT(@usuario));
  IF @count >= 1 THEN
    SET @json = (SELECT CONCAT('{"result":true,"rows":',@usuario,'}'));
  END IF;
  SELECT @json;
END$
#--------------------------------------------------------------------------




/* BACKEND */
/*--------------------------------------------------------------------------*/

DROP PROCEDURE IF EXISTS dashboardResumenEsquemasEnviados$
CREATE PROCEDURE dashboardResumenEsquemasEnviados (
)
BEGIN
	SET @json = (SELECT CONCAT('{"result":false,"rows":null}'));
	SET @esquemas = (
		SELECT
			CONCAT(
				'[',
				GROUP_CONCAT(CONCAT('{"id":"',ue.use_id,'","esquema":"',ue.use_nom,'","descripcion":"',ue.use_des,'","fecha":"',DATE_FORMAT(ue.use_dat,'%d-%m-%Y'),'"}')),
				']'
			)
		FROM
			usuarios_esquemas ue
		WHERE
			ue.use_est='PENDIENTE'
		ORDER BY
			ue.use_dat DESC
		LIMIT
			0,10
	);
	SET @count = (SELECT COUNT(@esquemas));

	IF @count >= 1 THEN
		SET @json = (SELECT CONCAT('{"result":true,"rows":',@esquemas,'}'));
	END IF;

	SELECT @json;
END$
/*-------------------------------------------------------*/
DROP PROCEDURE IF EXISTS dashboardResumenEsquemasEnviadosUpdate$
CREATE PROCEDURE dashboardResumenEsquemasEnviadosUpdate (
  useid INT(11),
  usenom VARCHAR(30),
  usedes TEXT
)
BEGIN
	SET @json = (SELECT CONCAT('{"result":false,"rows":null}'));
  UPDATE usuarios_esquemas SET use_nom=usenom, use_des=usedes WHERE use_id=useid;
	SET @count = (SELECT ROW_COUNT());

	IF @count >= 1 THEN
		SET @json = (SELECT CONCAT('{"result":true,"rows":null}'));
	END IF;

	SELECT @json;
END$
/*-------------------------------------------------------*/
DROP PROCEDURE IF EXISTS dashboardResumenEsquemasEnviados$
CREATE PROCEDURE dashboardResumenEsquemasEnviados (
)
BEGIN
	SET @json = (SELECT CONCAT('{"result":false,"rows":null}'));
	SET @esquemas = (
		SELECT
			CONCAT(
				'[',
				GROUP_CONCAT(CONCAT('{"id":"',ue.use_id,'","esquema":"',ue.use_nom,'","descripcion":"',ue.use_des,'","fecha":"',DATE_FORMAT(ue.use_dat,'%d-%m-%Y'),'"}')),
				']'
			)
		FROM
			usuarios_esquemas ue
		WHERE
			ue.use_est='PENDIENTE'
		ORDER BY
			ue.use_dat DESC
		LIMIT
			0,10
	);
	SET @count = (SELECT COUNT(@esquemas));

	IF @count >= 1 THEN
		SET @json = (SELECT CONCAT('{"result":true,"rows":',@esquemas,'}'));
	END IF;

	SELECT @json;
END$
/*-------------------------------------------------------*/
DROP PROCEDURE IF EXISTS dashboardResumenEsquemasEnviadosAprobar$
CREATE PROCEDURE dashboardResumenEsquemasEnviadosAprobar (
  useid INT(11)
)
BEGIN
  UPDATE usuarios_esquemas SET use_est='APROBADO' WHERE use_id=useid;
	SET @count = (SELECT ROW_COUNT());
  SET @json  = (SELECT CONCAT('{"result":false,"rows":null}'));

	IF @count >= 1 THEN
		SET @json = (SELECT CONCAT('{"result":true,"rows":null}'));
	END IF;

	SELECT @json;
END$
/*-------------------------------------------------------*/
DROP PROCEDURE IF EXISTS dashboardResumenEsquemasEnviadosRechazar$
CREATE PROCEDURE dashboardResumenEsquemasEnviadosRechazar (
  useid INT(11)
)
BEGIN
  UPDATE usuarios_esquemas SET use_est='RECHAZADO' WHERE use_id=useid;
	SET @count = (SELECT ROW_COUNT());
  SET @json  = (SELECT CONCAT('{"result":false,"rows":null}'));

	IF @count >= 1 THEN
		SET @json = (SELECT CONCAT('{"result":true,"rows":null}'));
	END IF;

	SELECT @json;
END$
/*-------------------------------------------------------*/
DELIMITER ;

