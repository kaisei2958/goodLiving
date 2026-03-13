//contents
//タブ切り替え→アコーディオン
document.addEventListener('DOMContentLoaded', () => {
    (() => {
        const triggers = document.querySelectorAll('.js-tab-trigger');
        const targets = document.querySelectorAll('.js-tab-target');
        const classname_active = 'is-active';
        triggers.forEach((trigger) => {
            trigger.addEventListener('click', () => {
                const tab = trigger.dataset.tab;
                triggers.forEach(t => t.classList.remove(classname_active));
                targets.forEach(t => t.classList.remove(classname_active));

                trigger.classList.add(classname_active);
                document.querySelector(`.js-tab-target[data-tab="${tab}"]`)
                    ?.classList.add(classname_active);
            });
        });
    })();

    (() => {
        const targets = document.querySelectorAll('.js-accordion-target');
        const classname_active = 'is-active';
        targets.forEach((target) => {
            const trigger = target.querySelector('.js-accordion-trigger');
            if (!trigger) return;
            trigger.addEventListener('click', () => {
                target.classList.toggle(classname_active);
            });
        });
    })();
});