const sections = document.querySelectorAll('.section1 > div');

sections.forEach(section => {
    const buttons = section.querySelectorAll('button');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});