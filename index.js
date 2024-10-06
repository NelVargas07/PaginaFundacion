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
radios[swiper.activeIndex].checked = true; // Asegúrate de que el radio inicial esté marcado

document.addEventListener('DOMContentLoaded', function () {
    
    //Inicio Implementacion de los modales
    const modalButtons = document.querySelectorAll('.modal-button');
    const closeButtons = document.querySelectorAll('.close');
    const modals = document.querySelectorAll('.modal');

    modalButtons.forEach(button => {

        button.addEventListener('click', () => {

            //no deja que coexitan varios modales a la vez cuando se presiona otra opcion
            // document.querySelectorAll('.show').forEach((element) => {
            //     element.classList.remove('show');
            // });

            const target = document.querySelector(button.getAttribute('data-target'));
            
            const modalContent = target.querySelector('.modal-content'); // Asegúrate de seleccionar el contenido del modal

            //Para que no quede tan pegado a la parte derecha de la pantalla
            //cuando se deba desplegar en esa posicion
            const marginModal = 10;
            
            const buttonRect = button.getBoundingClientRect();

            target.style.display = 'block';
            
            //Manejar las posiciones del modal para que no se salga de la pantalla y este colocado donde se presiona el boton
            const positionModal = buttonRect.x + modalContent.offsetWidth > window.innerWidth ? (buttonRect.x - (buttonRect.x + ((modalContent.offsetWidth/2) - window.innerWidth))) - marginModal  : buttonRect.x + modalContent.offsetWidth/2;
            
            setTimeout(() => {
                modalContent.style.left = `${positionModal}px`;

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

            //desaparecer todos los modales cuando se presiona en la pantalla, pero
            //pueden coexistir varios mientra no se presione en la pantalla

            // document.querySelectorAll('.show').forEach((element) => {
            //     element.classList.remove('show');
            // });

            setTimeout(() => {
                event.target.style.display = 'none';
            }, 500); // Esperar a que termine la transición
        }

    });
    //Fin de la implementacion de los modales
});