import { renderEvents, setupFilters, openModal, closeModal, loadPreferences } from '../modules/eventsHelpers.js';

document.addEventListener('DOMContentLoaded', async () => {
    const eventsContainer = document.getElementById('events-list');
    const filterForm = document.getElementById('filter-form');
    const modal = document.getElementById('event-modal');
    const modalClose = document.getElementById('modal-close');

    let events = [];
    try {
        const response = await fetch('events.json');
        if (!response.ok) throw new Error('Erro ao carregar eventos.');
        events = await response.json();
    } catch (err) {
        eventsContainer.innerHTML = `<p class="error">${err.message}</p>`;
        return;
    }

    const preferences = loadPreferences();
    if (preferences && preferences.category) {
        filterForm.category.value = preferences.category;
    }

    renderEvents(events, eventsContainer);

    setupFilters(filterForm, events, eventsContainer);

    eventsContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.event-card');
        if (card) {
            const eventId = card.dataset.id;
            const event = events.find(ev => ev.id == eventId);
            if (event) openModal(event, modal);
        }
    });
    modalClose.addEventListener('click', () => closeModal(modal));
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal(modal);
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });
});
