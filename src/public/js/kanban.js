/* ── KANDEX KANBAN JS ── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── DRAG & DROP ── */
  const cards   = document.querySelectorAll('.tcard[draggable]');
  const columns = document.querySelectorAll('.kcol');

  let draggedCard = null;

  cards.forEach(card => {
    card.addEventListener('dragstart', () => {
      draggedCard = card;
      setTimeout(() => card.classList.add('dragging'), 0);
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      draggedCard = null;
      columns.forEach(col => col.classList.remove('drag-over'));
    });
  });

  columns.forEach(col => {
    col.addEventListener('dragover', e => {
      e.preventDefault();
      col.classList.add('drag-over');
      const afterEl = getDragAfterElement(col, e.clientY);
      if (afterEl === null) {
        col.appendChild(draggedCard);
      } else {
        col.insertBefore(draggedCard, afterEl);
      }
    });

    col.addEventListener('dragleave', () => {
      col.classList.remove('drag-over');
    });

    col.addEventListener('drop', e => {
      e.preventDefault();
      col.classList.remove('drag-over');
      updateColumnCounts();
      // Aquí se puede hacer fetch a /api/tasks/:id para persistir el cambio
    });
  });

  function getDragAfterElement(container, y) {
    const draggableEls = [...container.querySelectorAll('.tcard:not(.dragging)')];
    return draggableEls.reduce((closest, child) => {
      const box    = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      }
      return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element || null;
  }

  function updateColumnCounts() {
    document.querySelectorAll('.kcol').forEach(col => {
      const count  = col.querySelectorAll('.tcard').length;
      const label  = col.querySelector('.col-lbl span');
      if (label) label.textContent = count;
    });
  }

});
