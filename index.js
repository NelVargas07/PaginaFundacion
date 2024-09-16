// Inicialización de Swiper
document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.swiper-container', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    //Inicio Implementacion de los modales
    const modalButtons = document.querySelectorAll('.modal-button');
    const closeButtons = document.querySelectorAll('.close');
    const modals = document.querySelectorAll('.modal');

    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = document.querySelector(button.getAttribute('data-target'));
            
            const modalContent = target.querySelector('.modal-content'); // Asegúrate de seleccionar el contenido del modal

            const buttonRect = button.getBoundingClientRect();

            target.style.display = 'block';
            
            
            setTimeout(() => {
                modalContent.style.left = `${buttonRect.right - (modalContent.offsetWidth/2)}px`;

                target.classList.add('show');    
            }, 100); // Permite que la clase `show` tome efecto antes de cambiar el display
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.closest('.modal');
            target.classList.remove('show');
            setTimeout(() => {
                target.style.display = 'none';
            }, 500); // Esperar a que termine la transición
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('show');
            setTimeout(() => {
                event.target.style.display = 'none';
            }, 500); // Esperar a que termine la transición
        }
    });
    //Fin de la implementacion de los modales

});
