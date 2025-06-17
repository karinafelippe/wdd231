export function renderEvents(events, container) {
    if (!Array.isArray(events) || events.length === 0) {
        container.innerHTML = '<p>Nenhum evento encontrado.</p>';
        return;
    }
    container.innerHTML = events.map(event => `
    <article class="event-card" tabindex="0" data-id="${event.id}" aria-label="${event.title}">
      <img src="${event.image}" alt="Imagem do evento: ${event.title}" loading="lazy" width="320" height="180">
      <div class="event-info">
        <h2>${event.title}</h2>
        <p class="event-date">${formatDate(event.date)}</p>
        <p class="event-location">${event.location}</p>
        <p class="event-category">${event.category}</p>
      </div>
    </article>
  `).join('');
}

export function setupFilters(form, events, container) {
    form.addEventListener('input', () => {
        const category = form.category.value;
        const filtered = category ? events.filter(ev => ev.category === category) : events;
        renderEvents(filtered, container);
        savePreferences({ category });
    });
}

export function openModal(event, modal) {
    modal.querySelector('.modal-title').textContent = event.title;
    modal.querySelector('.modal-date').textContent = formatDate(event.date);
    modal.querySelector('.modal-location').textContent = event.location;
    modal.querySelector('.modal-category').textContent = event.category;
    modal.querySelector('.modal-description').textContent = event.description;
    modal.querySelector('.modal-image').src = event.image;
    modal.querySelector('.modal-image').alt = `Imagem do evento: ${event.title}`;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    modal.focus();
}

export function closeModal(modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
}

export function savePreferences(prefs) {
    localStorage.setItem('eventPrefs', JSON.stringify(prefs));
}

export function loadPreferences() {
    try {
        return JSON.parse(localStorage.getItem('eventPrefs'));
    } catch {
        return null;
    }
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}
