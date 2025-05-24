async function getMembers() {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displayMembers(members, 'grid');
}

function displayMembers(members, view = 'grid') {
    const container = document.querySelector('.business-cards');
    container.innerHTML = '';
    container.className = 'business-cards ' + (view === 'list' ? 'list-view' : 'grid-view');

    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'business-card';

        card.innerHTML = `
            <div class="business-info">
                <h3>${member.name}</h3>
                <h4>${member.description || member.tagline || ''}</h4>
                <hr>
                <div class="business-details-row">
                    <div class="business-img">
                        <img src="images/${member.image}" alt="${member.name}">
                    </div>
                    <div class="business-details">
                        <div><strong>EMAIL:</strong> ${member.email || '-'}</div>
                        <div><strong>PHONE:</strong> ${member.phone || '-'}</div>
                        <div><strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website.replace(/^https?:\/\//, '')}</a></div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Toggle view logic
document.addEventListener('DOMContentLoaded', () => {
    let membersData = [];
    const gridBtn = document.getElementById('gridViewBtn');
    const listBtn = document.getElementById('listViewBtn');

    fetch('data/members.json')
        .then(res => res.json())
        .then(data => {
            membersData = data;
            displayMembers(membersData, 'grid');
        });

    gridBtn.addEventListener('click', () => {
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
        displayMembers(membersData, 'grid');
    });

    listBtn.addEventListener('click', () => {
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
        displayMembers(membersData, 'list');
    });
});