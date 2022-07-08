<?php
    include('./DataBase.php');

    $id = $_POST['id'];
    $realizado = 0;

    $consultaRegresarTarea = "UPDATE tareas SET realizado='$realizado' WHERE id='$id'";
    $resultadoRegresarTarea = mysqli_query($conexion, $consultaRegresarTarea);

    if ( !$resultadoRegresarTarea ) {
        echo 'Fallo el procesar al regrasar la tarea.';
    }

    echo 'Se actualizo la tarea a por finalizar';
?>