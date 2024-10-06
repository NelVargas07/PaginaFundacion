const swiper = new Swiper('.hero-image-slider', {
    loop: true, // Habilita el bucle
    autoplay: {
        delay: 3000, // Cambia cada 3 segundos
        disableOnInteraction: false, // Permite continuar la reproducción después de interactuar
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Controlar el cambio de los radio buttons al hacer clic
const radios = document.querySelectorAll('input[type="radio"]');
radios.forEach((radio, index) => {
    radio.addEventListener('change', () => {
        swiper.slideTo(index); // Cambia al slide correspondiente
    });
});

// Actualiza el estado de los radio buttons en función del slide activo
swiper.on('slideChange', () => {
    radios.forEach((radio, index) => {
        radio.checked = index === swiper.activeIndex; // Marca el radio correspondiente
    });
});

// Establece el radio button inicial como activo
if (radios.length > 0 && radios[swiper.activeIndex]) {
    radios[swiper.activeIndex].checked = true; // Asegúrate de que el radio inicial esté marcado
}

document.addEventListener('DOMContentLoaded', function () {
    //Inicio Implementacion de los modales
    const modalButtons = document.querySelectorAll('.modal-button');
    const closeButtons = document.querySelectorAll('.close');
    const modals = document.querySelectorAll('.modal');

    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = document.querySelector(button.getAttribute('data-target'));
            if (!target) {
                console.error(`No se encontró el modal con el selector: ${button.getAttribute('data-target')}`);
                return;
            }
            const modalContent = target.querySelector('.modal-content');
            if (!modalContent) {
                console.error(`No se encontró el contenido del modal dentro del modal con el selector: ${button.getAttribute('data-target')}`);
                return;
            }

            const marginModal = 10;
            const buttonRect = button.getBoundingClientRect();

            target.style.display = 'block';

            const positionModal = buttonRect.x + modalContent.offsetWidth > window.innerWidth ? (buttonRect.x - (buttonRect.x + ((modalContent.offsetWidth / 2) - window.innerWidth))) - marginModal : buttonRect.x + modalContent.offsetWidth / 2;

            setTimeout(() => {
                modalContent.style.left = `${positionModal}px`;
                target.classList.add('show');
            }, 100); // Permite que la clase `show` tome efecto antes de cambiar el display
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.closest('.modal');
            if (!target) {
                console.error('No se encontró el modal padre del botón de cierre.');
                return;
            }
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