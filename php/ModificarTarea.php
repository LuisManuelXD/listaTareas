<?php
    include('./DataBase.php');
    include('./Parametros.php');

    $id = $_POST['id'];
    $nombre = openssl_encrypt($_POST['nombre'], COD, KEY);
    $descripcion = openssl_encrypt($_POST['descripcion'], COD, KEY);

    $consultarModificar = "UPDATE tareas SET nombre='$nombre', descripcion='$descripcion' WHERE id='$id'";
    $resultadoConsultaModificar = mysqli_query($conexion, $consultarModificar);

    if ( !$resultadoConsultaModificar ) {
        die('Fallo la modificacion.');
    }

    echo 'Se actualizo correctamente';
?>