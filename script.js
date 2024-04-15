//funcion que se activa cuando escucha del evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    //Obtencion de elementos del html
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');

    //Se agrega un escuchador de eventos 'click' al boton addButton
    addButton.addEventListener('click', function() {
        //Se eliminan los espacios en blanco al principio y al final del texto
        const taskText = taskInput.value.trim();
        //Validacion de que el input no este vacia
        if (taskText === '') {
            alert('Por favor, escribe una tarea.');
            return;
        }
        //Creacion de elemento tipo lista
        const listItem = document.createElement('li');
        //Se le introduce el texto del input al elemento tipo lista
        listItem.textContent = taskText;

        //Creacion del boton completar para el elemento tipo lista
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Completar';
        completeButton.className = 'complete-btn';
        //Funcion que se activa con un escuchador de eventos 'click' que activa una funcion que cambia el estilo del elemento tipo lista a completado
        completeButton.addEventListener('click', function() {
            listItem.classList.toggle('completed');
        });

        //Creacion del boton eliminar del elemento tipo lista
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.className = 'delete-btn';
        //Funcion que se activa con un escuchador de eventos que elimina el elemento tipo lista 
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(listItem);
        });

        //Se agrega el elemento tipo lista a el HTML con sus respectivos botones de 'completado' y 'eliminar'
        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);

        //Se limpia el taskInput
        taskInput.value = '';
    });
});