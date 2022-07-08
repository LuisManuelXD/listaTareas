<?php
    include('./DataBase.php');

    if ( isset($_POST['id']) ) {
        $valorId = $_POST['id'];

        $consultaEliminar = "DELETE FROM tareas WHERE id='$valorId'";
        $guardarEliminacion = mysqli_query($conexion, $consultaEliminar);

        if ( !$guardarEliminacion ) {
            die('Fallo en la eliminacion.');
        }

        echo 'Tarea eliminada correctamente.';
    }

?>