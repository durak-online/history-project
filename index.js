document.addEventListener('DOMContentLoaded', () => {
    // ========== ПОДСВЕТКА СЕКЦИЙ ПРИ СКРОЛЛЕ (для маркеров таймлайна) ==========
    const sections = document.querySelectorAll('.section');

    function updateActiveSection() {
        let activeSection = null;
        let minDistance = Infinity;
        const viewportMiddle = window.innerHeight / 2;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top + rect.height / 2 - viewportMiddle);
            if (distance < minDistance) {
                minDistance = distance;
                activeSection = section;
            }
        });

        if (activeSection) {
            sections.forEach(s => s.classList.remove('active-timeline'));
            activeSection.classList.add('active-timeline');
        }
    }

    window.addEventListener('scroll', updateActiveSection);
    window.addEventListener('resize', updateActiveSection);
    updateActiveSection();

    // ========== ПЕРЕКЛЮЧАТЕЛИ (миф / реальность) ==========
    // По умолчанию показываем только миф, реальность скрыта
    const groups = document.querySelectorAll('.myth-reality-group');

    groups.forEach(group => {
        const mythCard = group.querySelector('.myth-card');
        const realityCard = group.querySelector('.reality-card');
        const btns = group.querySelectorAll('.pov-switch-btn');

        if (!mythCard || !realityCard || btns.length === 0) return;

        function setLocalView(view) {
            btns.forEach(btn => {
                if (btn.dataset.localView === view) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            if (view === 'myth') {
                mythCard.classList.remove('hide-myth');
                realityCard.classList.add('hide-reality');
            } else if (view === 'reality') {
                mythCard.classList.add('hide-myth');
                realityCard.classList.remove('hide-reality');
            }
        }

        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                setLocalView(btn.dataset.localView);
            });
        });

        // ИНИЦИАЛИЗАЦИЯ: показываем только МИФ
        setLocalView('myth');
    });
});