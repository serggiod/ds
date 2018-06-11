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

DROP TABLE IF EXISTS usuarios_archivos;
CREATE TABLE usuarios_archivos (
  usa_id INT(11) NOT NULL AUTO_INCREMENT,
  usu_id INT(11) NULL,
  usa_nom VARCHAR(30),
  usa_des TEXT,
  usa_arc CHAR(32),
  usa_dat TIMESTAMP,
  usa_est ENUM('APROBADO','PENDIENTE','RECHAZADO'), 
  PRIMARY KEY (usa_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

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
  usa_nom VARCHAR(30),
  usa_des TEXT,
  usa_arc CHAR(32)
)
BEGIN
  SET @json = (SELECT CONCAT('{"result":false,"rows":null}'));
  INSERT INTO usuarios_archivos VALUES(NULL,usu_id,usa_nom,usa_des,usa_arc,NOW(),'PENDIENTE');
  SET @count = (SELECT LAST_INSERT_ID());
  IF @count >=1 THEN
    SET @json = (SELECT CONCAT('{"result":true,"rows":false}'));
  END IF;
  SELECT @json;
END$
#----------------------------------------------------------------------
DROP PROCEDURE IF EXISTS usuariosEsquemasTodos$
DROP PROCEDURE IF EXISTS usuarioEsquemaEnviados$
DROP PROCEDURE IF EXISTS usuarioEsquemasEnviados$
CREATE PROCEDURE usuarioEsquemasEnviados (
  usu_id INT(11)
)
BEGIN
  SET @json = (SELECT CONCAT('{"result":false,"rows":null}'));
  SET @esquemas = (SELECT GROUP_CONCAT(CONCAT('{"id":"',ua.usa_id,'","nombre":"',ua.usa_nom,'","estado":"',ua.usa_est,'","fecha":"',DATE_FORMAT(ua.usa_dat,'%d-%m-%Y'),'"}') ORDER BY ua.usa_dat DESC) FROM usuarios_archivos ua WHERE ua.usu_id=usu_id);
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

SELECT
	CONCAT(
		"[",
		GROUP_CONCAT(
			CONCAT(
				'{"id":"',ua.usa_id,'",',
				'"nombre":"',ua.usa_nom,'",',
				'"descripcion":"',ua.usa_des,'",',
				'"archivo":"',ua.usa_arc,'",',
				'"fecha":"',ua.usa_dat,'",',
				'"estado":"',ua.usa_est,'"}'
			)
		),
		"]"
	)
FROM
	usuarios_archivos ua
WHERE
	ua.usa_est='PENDIENTE'
ORDER BY
	ua.usa_dat DESC;

#--------------------------------------------------------------------------
DELIMITER ;

