# ESQUEMAS
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
INSERT INTO esquemas VALUES(1,NULL,'SY-7VBA133U','Esquema para la placa madre D.','4343FDSFDSF455645645D','2018-05-04 08:00:00','PUBLICADO');0
INSERT INTO esquemas VALUES(2,NULL,'P5SD2-VM','ASUS® P5SD2-VM motherboard! The motherboard.','645453REGFDGFY5656THF','2018-05-06 08:00:00','PUBLICADO');
INSERT INTO esquemas VALUES(3,NULL,'MNL-1030 - 5500','Congratulations on purchasing your computer motherboard from an acknowledged leader in the ...... Demand Scrubbing is a memory error-correction scheme that allows the proces- sor to write.','456645645667fdsf7sd6f','2018-05-03 08:00:00','PUBLICADO');
INSERT INTO esquemas VALUES(4,NULL,'MNL-0957 - 5100','The memory scheme is interleaved, so you must install two modules .','adFBCVH57767fdsf7sd6f','2018-05-02 08:00:00','PUBLICADO');
INSERT INTO esquemas VALUES(5,NULL,'M5A78L-M/USB3','With ASUS design, this motherboard can support up to DDR3 1333MHz. *** When overclocking, some AMD CPU models may not support.','DSFGFDG456456FDFDGFDG','2018-05-05 08:00:00','PUBLICADO');
INSERT INTO esquemas VALUES(6,NULL,'P4i65G','The Lithium battery adopted on this motherboard contains Perchlorate, a toxic .... In this manual, chapter 1 and 2 contain introduction of the motherboard and.','MFGGjs76fds7fdsf7sd6f','2018-05-01 08:00:00','PUBLICADO');

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

DROP PROCEDURE IF EXISTS esquemaBuscar$
CREATE PROCEDURE esquemaBuscar (
  esq_nom VARCHAR(40)
)
BEGIN
    SET @json     = JSON_OBJECT('result',FALSE,'rows',NULL);
    SET @esquemas = (
      SELECT
          GROUP_CONCAT(
              JSON_OBJECT(
                  'nombre',e.esq_nom,
                  'file',e.esq_fil,
                  'date',DATE_FORMAT(e.esq_dat,'%d-%m-%Y %h:%i'),
                  'descripcion',e.esq_des
              )
              ORDER BY
                  e.esq_dat
              DESC
          )
      FROM
          esquemas e
      WHERE
          e.esq_nom LIKE CONCAT('%',esq_nom,'%')
    );
    SET @count = (SELECT COUNT(@esquemas));
    
    IF @count >= 1 THEN
      SET @json = (
        SELECT
            concat(
                '{',
                  '"result":true,',
                  '"rows":[',@esquemas,']',
                '}'
            )
      );
      CALL historicoInsertar(esq_nom);
    END IF;
     
    SELECT @json AS json;

END$
#-------------------------------------------
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
#--------------------------------------------
DROP PROCEDURE IF EXISTS historicoSelectAll$
CREATE PROCEDURE historicoSelectAll ()
BEGIN
  SET @json = JSON_OBJECT('result',false,'rows',null);
  SET @historico = (
    SELECT
      GROUP_CONCAT(
        JSON_OBJECT(
          'fecha',DATE_FORMAT(h.his_dat,'%d-%m-%Y %h:%i'),
          'esquema',h.esq_nom,
          'target',h.his_cou
        )
        ORDER BY h.his_dat DESC
      )
    FROM historico h 
  );
  SET @count = (SELECT COUNT(@historico));

  IF @count >= 1 THEN
    SET @json = (
      SELECT
          concat(
              '{',
                '"result":true,',
                '"rows":[',@historico,']',
              '}'
          )
     );
  END IF; 
  SELECT @json;
END$
#---------------------------------------------
DROP PROCEDURE IF EXISTS usuariosRegistrar$
CREATE PROCEDURE usuariosRegistrar (
  usu_nom VARCHAR(50),
  usu_ape VARCHAR(50),
  usu_ema VARCHAR(30),
  usu_pas VARCHAR(32)
)
BEGIN
  SET @json = JSON_OBJECT('result',false,'rows',null);
  INSERT INTO usuarios VALUES (NULL,usu_nom,usu_ape,usu_ema,usu_pas);
  SET @count = (SELECT COUNT(*) FROM usuarios u WHERE u.usu_nom=usu_nom AND u.usu_ape=usu_ape AND u.usu_ema=usu_ema AND u.usu_pas=usu_pas);
  IF @count >= 1 THEN
    SET @json = JSON_OBJECT('result',true,'rows',null);
  END IF; 
  SELECT @json;
END$
#----------------------------------------------
DROP PROCEDURE IF EXISTS usuariosLogin$
CREATE PROCEDURE usuariosLogin (
  usu_ema VARCHAR(30),
  usu_pas VARCHAR(32)
)
BEGIN
  SET @json = JSON_OBJECT('result',false,'rows',true);
  SET @usuario = (SELECT JSON_OBJECT('nombre',usu_nom,'apellido',usu_ape,'email',usu_ema,'administrador',usu_adm) FROM usuarios u WHERE u.usu_ema=usu_ema AND u.usu_pas=usu_pas);
  SET @count = (SELECT COUNT(@usuario));
  IF @count >= 1 THEN
    SET @json = (SELECT CONCAT(
      '{"result":true,"rows":',
      @usuario,
      '}'
    ));
  END IF;
  SELECT @json;
END$
#----------------------------------------------
DELIMITER ;

