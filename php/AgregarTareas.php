<?php
    include('./DataBase.php');
    include('./Parametros.php');

    if ( isset($_POST['nombre']) ) {
        $nombre = openssl_encrypt($_POST['nombre'], COD, KEY);
        $descripcion = openssl_encrypt($_POST['descripcion'], COD, KEY);
        $realizado = 0;

        $consultaAgregar = "INSERT INTO tareas (nombre, descripcion, realizado) VALUES ('$nombre', '$descripcion', '$realizado')";
        $guardarAgregar = mysqli_query($conexion, $consultaAgregar);

        if (!$guardarAgregar) {
            die('La consulta a fallado');
        }
        echo "Tarea agregada con exito";
    }
?>