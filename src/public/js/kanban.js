// Drag & Drop para Kanban
document.addEventListener('DOMContentLoaded', () => {
    const columns = document.querySelectorAll('.kanban-column');
    let draggedElement = null;

    columns.forEach(column => {
        column.addEventListener('dragover', (e) => {
            e.preventDefault();
            column.style.backgroundColor = '#e9ecef';
        });

        column.addEventListener('dragleave', () => {
            column.style.backgroundColor = '#f8f9fa';
        });

        column.addEventListener('drop', (e) => {
            e.preventDefault();
            column.style.backgroundColor = '#f8f9fa';
            
            if (draggedElement) {
                const taskId = draggedElement.dataset.id;
                const nuevoEstado = column.dataset.estado;
                
                // Enviar actualización al servidor
                fetch('/tareas/update-position', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: taskId,
                        estado: nuevoEstado,
                        posicion: column.children.length
                    })
                }).then(response => response.json())
                  .then(data => {
                      if (data.success) {
                          column.appendChild(draggedElement);
                      }
                  })
                  .catch(err => console.error(err));
            }
        });
    });

    const tasks = document.querySelectorAll('.task-card');
    tasks.forEach(task => {
        task.addEventListener('dragstart', () => {
            draggedElement = task;
            task.style.opacity = '0.5';
        });

        task.addEventListener('dragend', () => {
            draggedElement = null;
            task.style.opacity = '1';
        });
    });
});