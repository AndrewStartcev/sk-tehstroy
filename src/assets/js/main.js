document.addEventListener('DOMContentLoaded', function () {
  // Находим все элементы с классом has-submenu
  const submenuParents = document.querySelectorAll('.menu-parent');
  const header = document.querySelector('.header');
  const burger = document.querySelector('.header__burger');
  const mobileMenu = document.querySelector('.mobile-menu');

  burger.addEventListener('click', function (e) {
    mobileMenu.classList.toggle('show');
    burger.classList.toggle('show');
  });

  function checkHeader() {
    if (window.scrollY > 30) {
      header.classList.add('header-show');
    } else {
      header.classList.remove('header-show');
    }
  }

  submenuParents.forEach(function (parent) {
    const link = parent.querySelector('.menu-parent__item');
    const submenu = parent.querySelector('.sub-menu');

    // Показываем подменю при наведении
    parent.addEventListener('mouseenter', function () {
      submenu.style.display = 'block';
      submenu.style.opacity = '0';
      submenu.style.transition = 'opacity 0.3s ease';
      link.classList.add('show');

      // Небольшая задержка для плавного появления
      setTimeout(function () {
        submenu.style.opacity = '1';
      }, 10);
    });

    // Скрываем подменю при уходе курсора
    parent.addEventListener('mouseleave', function () {
      submenu.style.opacity = '0';

      // После завершения анимации скрываем полностью
      setTimeout(function () {
        if (submenu.style.opacity === '0') {
          submenu.style.display = 'none';
          link.classList.remove('show');
        }
      }, 300);
    });

    // Для мобильных устройств - по клику
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 1159) {
        // Мобильное устройство
        e.preventDefault();
        const isOpen = submenu.style.display === 'block';

        // Закрываем все открытые подменю
        document.querySelectorAll('.sub-menu').forEach(function (menu) {
          if (menu !== submenu) {
            menu.style.display = 'none';
            link.classList.toggle('show');
          }
        });

        // Открываем/закрываем текущее
        submenu.style.display = isOpen ? 'none' : 'block';
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (window.innerWidth <= 768) {
      const isClickInside = Array.from(submenuParents).some(parent => parent.contains(e.target));

      if (!isClickInside) {
        document.querySelectorAll('.sub-menu').forEach(function (menu) {
          menu.style.display = 'none';
        });
      }
    }
  });

  window.addEventListener('load', checkHeader);
  window.addEventListener('scroll', checkHeader);

  const popupTriggers = document.querySelectorAll('[data-popup]');
  const closeButtonsPopup = document.querySelectorAll('.popup__close, .popup-close');

  function closePopup() {
    document.querySelectorAll('.popup.show').forEach(popup => {
      popup.classList.remove('show');
    });
  }

  popupTriggers.forEach(popupTrigger => {
    popupTrigger.addEventListener('click', function (event) {
      event.preventDefault();

      const popupId = popupTrigger.getAttribute('data-popup');
      const popupElement = document.querySelector(popupId);

      if (!popupElement) {
        console.error(`Popup с id ${popupId} не найден.`);
        return;
      }

      closePopup(); // Закрываем все попапы перед открытием нового
      popupElement.classList.add('show');
    });
  });

  closeButtonsPopup.forEach(closeButton => {
    closeButton.addEventListener('click', function (event) {
      event.preventDefault();
      closePopup();
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closePopup();
    }
  });

  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('popup')) {
      closePopup();
    }
  });

  document.querySelectorAll('input[type="tel"]').forEach(input => {
    if (input) {
      new PhoneInputFormatter(input);
    }
  });

  new Swiper('.hero__slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: '.hero .swiper-pagination',
      clickable: true,
      type: 'bullets',
    },
    navigation: {
      nextEl: '.hero .swiper-btn-next',
      prevEl: '.hero .swiper-btn-prev',
    },
  });

  new Swiper('.service-prices__slider', {
    slidesPerView: 1,
    spaceBetween: 0,

    navigation: {
      nextEl: '.service-prices__btn-next',
      prevEl: '.service-prices__btn-prev',
    },
  });

  new Swiper('.arenda-gallery__slider', {
    slidesPerView: 1,
    spaceBetween: 100,
    loop: true,
    initialSlide: 1,
    centeredSlides: true,
    pagination: {
      el: '.arenda-gallery .swiper-pagination',
      clickable: true,
      type: 'bullets',
    },
    navigation: {
      nextEl: '.arenda-gallery__btn-next',
      prevEl: '.arenda-gallery__btn-prev',
    },
  });

  new Swiper('.gallary-block__slider', {
    slidesPerView: 1.15,
    spaceBetween: 10,
    loop: false,
    navigation: {
      nextEl: '.gallary-block__btn-next',
      prevEl: '.gallary-block__btn-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });
});

class PhoneInputFormatter {
  constructor(input) {
    this.input = input;
    this.initEvents();
  }

  getInputNumbersValue() {
    return this.input.value ? this.input.value.replace(/\D/g, '') : '';
  }

  onPhonePaste(e) {
    const inputNumbersValue = this.getInputNumbersValue();
    const pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      const pastedText = pasted.getData('Text');
      if (/\D/g.test(pastedText)) {
        this.input.value = inputNumbersValue;
      }
    }
  }

  onPhoneInput(e) {
    let inputNumbersValue = this.getInputNumbersValue(),
      selectionStart = this.input.selectionStart,
      formattedInputValue = '';

    if (!inputNumbersValue) {
      return (this.input.value = '');
    }

    if (this.input.value.length !== selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        this.input.value = inputNumbersValue;
      }
      return;
    }

    if (['7', '8', '9'].includes(inputNumbersValue[0])) {
      if (inputNumbersValue[0] === '9') inputNumbersValue = '7' + inputNumbersValue;
      const firstSymbols = inputNumbersValue[0] === '8' ? '8' : '+7';
      formattedInputValue = firstSymbols + ' ';
      if (inputNumbersValue.length > 1) {
        formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
      }
    } else {
      formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
    }
    this.input.value = formattedInputValue;
  }

  onPhoneKeyDown(e) {
    const inputValue = this.input.value.replace(/\D/g, '');
    if (e.keyCode === 8 && inputValue.length === 1) {
      this.input.value = '';
    }
  }

  initEvents() {
    this.input.addEventListener('keydown', e => this.onPhoneKeyDown(e));
    this.input.addEventListener('input', e => this.onPhoneInput(e), false);
    this.input.addEventListener('paste', e => this.onPhonePaste(e), false);
  }
}
