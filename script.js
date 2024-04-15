// Escucha el evento DOMContentLoaded para asegurar que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {

    // Función para guardar las tareas en Local Storage
    function saveTasks() {
        const tasks = [];
        // Recorre cada elemento de la lista de tareas
        document.querySelectorAll('#task-list li').forEach(function(taskItem) {
            // Guarda el texto de cada tarea y su estado (completada o no) en un objeto
            const taskObj = {
                text: taskItem.textContent.replace('CompletarEliminar', ''), // Asume que el texto de los botones se añade al texto de la tarea, lo cual se debería manejar de otra manera
                completed: taskItem.classList.contains('completed')
            };
            tasks.push(taskObj); // Añade el objeto de la tarea al array de tareas
        });
        // Guarda el array de tareas en Local Storage como una cadena JSON
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Función para cargar las tareas de Local Storage
    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks'); // Obtiene las tareas guardadas de Local Storage
        if (storedTasks) {
            const tasks = JSON.parse(storedTasks); // Convierte la cadena JSON a un objeto JavaScript
            tasks.forEach(function(task) {
                const listItem = document.createElement('li'); // Crea un nuevo elemento de lista para la tarea
                listItem.textContent = task.text; // Establece el texto de la tarea
                if (task.completed) {
                    listItem.classList.add('completed'); // Marca la tarea como completada si es necesario
                }
                addTaskButtons(listItem); // Añade los botones de completar y eliminar a la tarea
                taskList.appendChild(listItem); // Añade la tarea a la lista en el DOM
            });
        }
    }

    // Función para añadir botones de completar y eliminar a una tarea
    function addTaskButtons(listItem) {
        // Crea y configura el botón de completar
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Completar';
        completeButton.className = 'complete-btn';
        completeButton.addEventListener('click', function() {
            listItem.classList.toggle('completed'); // Alterna la clase 'completed' para marcar la tarea como completada o no
            saveTasks(); // Guarda el estado actualizado de las tareas
        });

        // Crea y configura el botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.className = 'delete-btn';
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(listItem); // Elimina la tarea de la lista
            saveTasks(); // Guarda el estado actualizado de las tareas
        });

        // Añade los botones al elemento de la lista
        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);
    }

    // Obtiene referencias a elementos del DOM
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');

    // Añade un escuchador de eventos al botón de añadir tarea
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim(); // Obtiene y limpia el texto ingresado
        if (taskText === '') {
            alert('Por favor, escribe una tarea.'); // Alerta si el campo está vacío
            return;
        }
        const listItem = document.createElement('li'); // Crea un nuevo elemento de lista para la tarea
        listItem.textContent = taskText; // Establece el texto de la tarea
        addTaskButtons(listItem); // Añade los botones de completar y eliminar a la tarea
        taskList.appendChild(listItem); // Añade la tarea a la lista en el DOM
        taskInput.value = ''; // Limpia el campo de entrada
        saveTasks(); // Guarda el estado actualizado de las tareas
    });

    // Carga las tareas al iniciar la página
    loadTasks();
});