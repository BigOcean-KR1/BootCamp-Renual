// 모바일 메뉴 토글 + 서브메뉴 아코디언
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.querySelector('.menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      document.body.classList.toggle('nav-open', open);
    });
  }

  // 모바일에서 상위 메뉴 탭 시 하위 메뉴 펼침
  document.querySelectorAll('.menu-item > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 900 && menu.classList.contains('open')) {
        e.preventDefault();
        link.parentElement.classList.toggle('open-sub');
      }
    });
  });
});
