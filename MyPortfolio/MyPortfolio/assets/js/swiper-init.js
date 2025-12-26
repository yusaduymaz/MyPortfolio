
/* ===== SWIPER INITIALIZATION ===== */
const projectsSwiper = new Swiper('.projects__container', {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        // Mobile: 1 card
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        // Tablet: 2 cards
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        // Desktop: 3 cards
        1024: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
    },
});
