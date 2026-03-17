document.addEventListener('DOMContentLoaded', () => {
    // Selectores de Elementos
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const backToTop = document.getElementById('backToTop');
    const udsButtons = document.querySelectorAll('[data-uds]');

    // Función Toggle Sidebar
    const toggleSidebar = () => {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    };

    menuToggle.addEventListener('click', toggleSidebar);
    closeSidebar.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // Cerrar sidebar al hacer click en un item (móvil)
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', toggleSidebar);
    });

    // Selector de UDS (Cúcuta / El Zulia)
    udsButtons.forEach(button => {
        button.addEventListener('click', () => {
            udsButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const udsType = button.dataset.uds;
            document.querySelectorAll('.uds-section').forEach(section => {
                section.classList.remove('active');
                if (section.id === `uds-${udsType}`) {
                    section.classList.add('active');
                }
            });
        });
    });

    // Control de Scroll y Botón Back to Top
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.remove('opacity-0', 'invisible');
        } else {
            backToTop.classList.add('opacity-0', 'invisible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Función para el Accordion (global)
function toggleAccordion(id) {
    const content = document.getElementById(id + '-content');
    const icon = document.getElementById(id + '-icon');
    content.classList.toggle('active');
    icon.classList.toggle('rotated');
}