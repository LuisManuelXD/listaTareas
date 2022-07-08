<?php
    include('./DataBase.php');
    include('./Parametros.php');

    if( isset($_POST['id']) ) {
        $valorId = $_POST['id'];

        $consultarTarea = "SELECT *FROM tareas WHERE id='$valorId'";
        $resultadoConsultaTarea = mysqli_query($conexion, $consultarTarea);

        if ( !$resultadoConsultaTarea ) {
            die('Consulta fallida');
        }

        $json = array();
        while ( $row = mysqli_fetch_array($resultadoConsultaTarea) ) {
            $json[] = array(
                'id' => $row['id'],
                'nombre' => openssl_decrypt($row['nombre'], COD, KEY),
                'descripcion' => openssl_decrypt($row['descripcion'], COD, KEY),
                'realizado' => $row['realizado']
            );
        }

        $jsonString = json_encode($json);
        echo $jsonString;
    }
?>