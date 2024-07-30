import Swiper from 'swiper';
import {Navigation, Pagination} from 'swiper/modules';

(function () {
  const leaderSection = document.querySelector('.leader');
  const sliderContainer = leaderSection.querySelector('.leader__wrapper');

  const BULLET_ACTIVE_THRESHOLD = 5;
  const PAGINATION_ELEMENT_WIDTH = '64px';
  let swiperContainerWidth;

  const paddingValues = {
    mobile: {outer: 15, inner: 15},
    tablet: {outer: 15, inner: 20},
  };

  const mob = window.matchMedia('(min-width: 0px) and (max-width: 639px)');
  const tab = window.matchMedia('(min-width: 640px) and (max-width: 959px)');

  const detectDeviceType = () => {
    if (mob.matches) {
      return 'mobile';
    } else if (tab.matches) {
      return 'tablet';
    }
    return null;
  };

  const calculateSwiperWidth = () => {
    const viewportWidth = window.innerWidth;
    const deviceType = detectDeviceType();

    if (deviceType === 'mobile') {
      swiperContainerWidth = Math.round(viewportWidth - paddingValues.mobile.outer * 2 - paddingValues.mobile.inner * 2);
    } else if (deviceType === 'tablet') {
      swiperContainerWidth = Math.round(viewportWidth - paddingValues.tablet.outer * 2 - paddingValues.tablet.inner * 2);
    }
  };

  calculateSwiperWidth();

  const swiperInstance = new Swiper('.leader .container', {
    init: false,
    watchSlidesProgress: true,
    observer: true,
    slidesPerView: 'auto',
    resizeObserver: true,
    updateOnWindowResize: true,
    modules: [Navigation, Pagination],
    navigation: {
      prevEl: '.leader__button--prev',
      nextEl: '.leader__button--next',
    },
    pagination: {
      el: '.leader__pagination',
      bulletActiveClass: 'leader__bullet--active',
      bulletClass: 'leader__bullet',
      type: 'bullets',
      bulletElement: 'div',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 6,
      renderBullet(index, className) {
        return `<button class="${className}" type="button" tabindex="0"></button>`;
      },
    },
    breakpoints: {
      320: {
        width: swiperContainerWidth,
        spaceBetween: 15,
      },
      640: {
        width: swiperContainerWidth,
        spaceBetween: 25,
      },
    },
    on: {
      init() {
        updatePagination();
      },
      breakpoint() {
        const isMobileOrTablet = mob.matches || tab.matches;
        if (isMobileOrTablet) {
          this.enable();
          calculateSwiperWidth();
          this.update();
        } else {
          this.disable();
          setTimeout(() => {
            sliderContainer.style.transform = 'translate3d(0px, 0px, 0px)';
          }, 300);
        }
      },
      resize() {
        const isMobileOrTablet = mob.matches || tab.matches;
        if (isMobileOrTablet) {
          this.enable();
          calculateSwiperWidth();
          this.update();
        } else {
          this.disable();
          setTimeout(() => {
            sliderContainer.style.transform = 'translate3d(0px, 0px, 0px)';
          }, 300);
        }
      },
    },
  });

  const updatePagination = () => {
    const paginationElement = leaderSection.querySelector('.leader__pagination');
    const paginationBullets = paginationElement.querySelectorAll('.leader__bullet');

    paginationBullets.forEach((bullet, index) => {
      bullet.dataset.id = index;
    });

    const activeBullet = paginationElement.querySelector('.leader__bullet--active');
    const activeBulletIndex = +activeBullet.getAttribute('data-id');

    if (activeBulletIndex >= BULLET_ACTIVE_THRESHOLD && activeBulletIndex < paginationBullets.length - 1) {
      paginationBullets[activeBulletIndex - BULLET_ACTIVE_THRESHOLD].classList.remove('leader__bullet--active-main');
      paginationBullets[activeBulletIndex + 1].classList.add('leader__bullet--active-main');
    }

    if (activeBulletIndex > 0 && activeBulletIndex < paginationBullets.length - BULLET_ACTIVE_THRESHOLD) {
      paginationBullets[activeBulletIndex - 1].classList.add('leader__bullet--active-main');
      paginationBullets[activeBulletIndex + BULLET_ACTIVE_THRESHOLD].classList.remove('leader__bullet--active-main');
    }

    if (mob.matches || tab.matches) {
      paginationElement.style.width = PAGINATION_ELEMENT_WIDTH;
    }
  };

  const initializeSwiper = () => {
    if (mob.matches || tab.matches) {
      swiperInstance.init();
      updatePagination();
    }
  };

  initializeSwiper();
  swiperInstance.on('paginationUpdate', updatePagination);
})();
