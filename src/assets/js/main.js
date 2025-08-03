document.addEventListener('DOMContentLoaded', function () {
  // Находим все элементы с классом has-submenu
  const submenuParents = document.querySelectorAll('.menu-parent');
  const header = document.querySelector('.header');

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
      if (window.innerWidth <= 768) {
        // Мобильное устройство
        e.preventDefault();
        const isOpen = submenu.style.display === 'block';

        // Закрываем все открытые подменю
        document.querySelectorAll('.sub-menu').forEach(function (menu) {
          if (menu !== submenu) {
            menu.style.display = 'none';
            link.classList.add('show');
          }
        });

        // Открываем/закрываем текущее
        submenu.style.display = isOpen ? 'none' : 'block';
        link.classList.toogle('show');
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
});
