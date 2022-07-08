<?php
    include('./DataBase.php');

    $id = $_POST['id'];
    $realizado = 1;

    $consultarModificacionRealizado = "UPDATE tareas SET realizado='$realizado' WHERE id='$id';";
    $resultadoModificacionRealizado = mysqli_query($conexion, $consultarModificacionRealizado);

    if ( !$resultadoModificacionRealizado ) {
        echo 'Fallo el procesar la tarea finalizada';
    }

    echo 'Se actualizo la tarea a finalizado';
?>