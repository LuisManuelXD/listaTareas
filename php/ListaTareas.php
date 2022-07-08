<?php
    include('./DataBase.php');
    include('./Parametros.php');

    $consulta = "SELECT * FROM tareas";
    $resultadoConsulta = mysqli_query($conexion, $consulta);

    if (!$resultadoConsulta) {
        die('Fallo la conexion para cargar la tabla.' . mysqli_error($conexion)); 
    }

    $json = array();
    while ( $row = mysqli_fetch_array($resultadoConsulta) ) {
        $json[] = array(
            'id' => $row['id'],
            'nombre' => openssl_decrypt($row['nombre'], COD, KEY),
            'descripcion' => openssl_decrypt($row['descripcion'], COD, KEY),
            'realizado' => $row['realizado']
        );
    }
    
    $jsonString = json_encode($json);
    echo $jsonString;
?>