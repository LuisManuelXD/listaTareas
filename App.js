let editar = false;

obtenerTareas();

// Insertar o agregar una nueva tarea
let formulario = document.querySelector( '#formularioTareas' );
formulario.onsubmit = function(e) {  
    let id = document.querySelector( '#tareaId' ).value;
    let nombre = document.querySelector( '#txtNombre' ).value;
    let descripcion = document.querySelector( '#txtDescripcion' ).value;

    if (nombre == '' || descripcion == '') {
        alert('Rellene los campos faltantes.');
        e.preventDefault();
    } else {
        let formTarea = new FormData();
            formTarea.append('id', id);
            formTarea.append('nombre', nombre);
            formTarea.append('descripcion', descripcion);

        e.preventDefault();

        let url = editar === false ? './php/AgregarTareas.php' : './php/ModificarTarea.php';
        console.log(url);
            
        let ajax = new XMLHttpRequest();  
            ajax.open( 'post', url, true );
            ajax.onload = function() {
                obtenerTareas();

                document.querySelector( '#txtNombre' ).value = null;
                descripcion = document.querySelector( '#txtDescripcion' ).value = null;

                console.log(ajax.response);
            }
            
        ajax.send( formTarea );
    }
}

function obtenerTareas() {
    let faltanteTareas = document.querySelector( '#tareasFaltantes' );
    let realizadoTareas = document.querySelector( '#tareasFinalizadas' );

    let ajax = new XMLHttpRequest();
        ajax.open( 'get', './php/ListaTareas.php', true );
        ajax.onload = function() {
            // console.log( JSON.parse( ajax.response ) );
            let tareas = JSON.parse( ajax.response );
            let plantillaFaltantes = '';
            let plantillaRealizados = '';

            tareas.forEach(tareas => {
                if (tareas.realizado == 0) {
                    plantillaFaltantes += `
                        <tr id="${tareas.id}">
                            <td>${tareas.id}</td>
                            <td><a onclick="modificarTarea(${tareas.id})" class="tareaNombre text-decoration-none">${tareas.nombre}</a></td>
                            <td>${tareas.descripcion}</td>
                            <td>
                                <button id="btnTerminado" onclick="terminarTarea(${tareas.id})" class="btnTerminado btn btn-outline-success" title="Presiona este botón para marcar la tarea como realizada."><img src="./img/listo.png" alt="editar.png" width="26"></button>
                            </td>
                            <td>
                                <button id="btnEditar" onclick="modificarTarea(${tareas.id})" class="btnModificarTarea btn btn-outline-warning" title="Presiona este botón para comenzar a modificar esta tarea."><img src="./img/editar.png" alt="editar.png" width="26"></button>
                                <button id="btnBorrar" onclick="borrarTarea(${tareas.id})" class="eliminarTarea btn btn-outline-danger" title="Presiona este botón para eliminar esta tarea."><img src="./img/eliminar.png" alt="eliminar.png" width="26"></button>
                            </td>
                        </tr>
                    `
                } else if (tareas.realizado == 1) {
                    plantillaRealizados += `
                        <tr id="${tareas.id}">
                            <td>${tareas.id}</td>
                            <td>${tareas.nombre}</td>
                            <td>${tareas.descripcion}</td>
                            <td>Finalizado</td>
                            <td>
                                <button id="btnRegresar" onclick="regresarTarea(${tareas.id})" class="btnRegresarTarea btn btn-outline-info" title="Presiona este botón para regresar la tarea a pendiente."><img src="./img/regresar.png" alt="regresar.png" width="26"></button>
                                <button id="btnBorrar" onclick="borrarTarea(${tareas.id})" class="eliminarTarea btn btn-outline-danger" title="Presiona este botón para eliminar esta tarea."><img src="./img/eliminar.png" alt="eliminar.png" width="26"></button>
                            </td>
                        </tr>
                    `
                }
            });

            faltanteTareas.innerHTML = plantillaFaltantes;
            realizadoTareas.innerHTML = plantillaRealizados;
        }
    
    ajax.send();
}

// Eliminar
function borrarTarea( valorId ) {
    if ( confirm('¿Estas seguro de elimnar la tarea?') ) {
        let id = valorId;

        let obtenerId = new FormData();
            obtenerId.append( 'id', id );

        let ajax = new XMLHttpRequest();  
            ajax.open( 'post', './php/EliminarTarea.php', true );
            ajax.onload = function() {
                obtenerTareas();
                console.log(ajax.response);
            }
            
            ajax.send( obtenerId );
        }
}

// Modificar
function modificarTarea( valorId ) {
    let id = valorId;
    let nombre = document.querySelector( '#txtNombre' );
    let descripcion = document.querySelector( '#txtDescripcion' );

    let obtenerId = new FormData();
        obtenerId.append( 'id', id );

    let ajax = new XMLHttpRequest();  
        ajax.open( 'post', './php/ConsultarTarea.php', true );
        ajax.onload = function() {
            const tareas = JSON.parse(ajax.response);
            // console.log(tareas);

            tareas.forEach(tareas => {
                document.querySelector( '#tareaId' ).value = tareas.id;
                nombre.value = tareas.nombre;
                descripcion.value = tareas.descripcion;

                editar = true;
            });
        }
        
        ajax.send( obtenerId );
}

function terminarTarea( valorId ) {
    if ( confirm('¿Estás seguro de colocar por finalizado esta tarea?') ) {
        let id = valorId;
    
        let obtenerId = new FormData();
            obtenerId.append( 'id', id );
    
        let ajax = new XMLHttpRequest();  
            ajax.open( 'post', './php/RealizadoTarea.php', true );
            ajax.onload = function() {
                obtenerTareas();
                console.log(ajax.response);
            }
            
            ajax.send( obtenerId );
    }
}

function regresarTarea( valorId ) {
    if ( confirm('¿Estás seguro de regresar esta tarea a por realizar?') ) {
        let id = valorId;
    
        let obtenerId = new FormData();
            obtenerId.append( 'id', id );
    
        let ajax = new XMLHttpRequest();  
            ajax.open( 'post', './php/RegresarTarea.php', true );
            ajax.onload = function() {
                obtenerTareas();
                console.log(ajax.response);
            }
            
            ajax.send( obtenerId );
    }
}