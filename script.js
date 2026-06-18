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

// 교육과정 상세 모달
document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById('courseModal');
  if (!modal) return;
  var contents = modal.querySelectorAll('.modal-content');

  function open(id) {
    contents.forEach(function (c) {
      c.classList.toggle('show', c.getAttribute('data-id') === id);
    });
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-modal]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      open(btn.getAttribute('data-modal'));
    });
  });

  modal.querySelector('.modal-close').addEventListener('click', close);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
});

// 교육과정 신청 모달 (탭 + 데이터 테이블 + 랜덤 진행현황)
document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById('applyModal');
  if (!modal) return;

  var LOGIN_URL = 'https://bootcamp.dongyang.ac.kr/member/login.do';
  var wrap = document.getElementById('applyTableWrap');

  // 진행현황 랜덤 (약 60% 모집중)
  function status() {
    return Math.random() < 0.6
      ? '<span class="st ing">모집중</span>'
      : '<span class="st closed">마감</span>';
  }
  function lv(level) {
    var map = { '초급': 'beginner', '중급': 'mid', '고급': 'adv' };
    return '<span class="lv ' + map[level] + '">' + level + '</span>';
  }

  // 마이크로디그리 데이터
  var md = [
    ['자동화공학과', 'auto', '반도체설비설계', '고급', 500, 238, '2026-03-05 ~ 03-26'],
    ['자동화공학과', 'auto', '반도체장비S/W운용', '고급', 500, 237, '2026-03-05 ~ 03-26'],
    ['반도체전자공학과', 'elec', '반도체공정측정분석', '중급', 500, 172, '2026-03-05 ~ 03-27'],
    ['반도체전자공학과', 'elec', '반도체레이아웃설계', '중급', 500, 171, '2026-03-05 ~ 03-27'],
    ['자동화공학과', 'auto', '반도체설비유지보수', '중급', 500, 237, '2026-03-05 ~ 03-26'],
    ['자동화공학과', 'auto', '반도체설비운용', '중급', 500, 235, '2026-03-05 ~ 03-26'],
    ['자동화공학과', 'auto', '반도체장비제어', '중급', 500, 240, '2026-03-05 ~ 03-26'],
    ['자동화공학과', 'auto', '반도체설비자동화', '중급', 500, 239, '2026-03-05 ~ 03-26'],
    ['반도체전자공학과', 'elec', '반도체소자 및 공정기초', '초급', 500, 121, '2026-03-05 ~ 03-27'],
    ['자동화공학과', 'auto', '반도체공정 및 설비기초', '초급', 500, 237, '2026-03-05 ~ 03-26']
  ];
  // 몰입형 데이터
  var immersive = [
    ['도면 이해 및 SolidWorks 실무', '중급', '(주)이엑스솔루션', 30, 69, '2026-05-27 ~ 08-03'],
    ['협동 로봇 오퍼레이션 실무', '중급', '두산로보틱스(주)', 24, 66, '2026-05-27 ~ 07-20'],
    ['반도체장비기구설계실무', '고급', '(주)이엑스솔루션', 30, 53, '2026-05-27 ~ 07-06'],
    ['반도체 공정 장비 실무', '중급', '디지털테크레이드', 30, 50, '2026-05-27 ~ 06-01'],
    ['반도체 레이아웃 설계 실무', '중급', '(주)아나패스', 20, 50, '2026-05-27 ~ 06-01'],
    ['반도체 위험물 관리 실무', '중급', '태민과학', 30, 67, '2026-05-27 ~ 06-23']
  ];
  // 기타 데이터
  var etc = [
    [13, '2026', '1학기', '캡스톤디자인', '캡스톤디자인 경진대회'],
    [12, '2026', '1학기', '현장견학', '램리서치코리아 반도체 제조시설 현장견학'],
    [11, '2025', '2학기', '현장견학', '2025년 부트캠프사업 해외기업탐방 및 전시회 참관'],
    [10, '2025', '2학기', '멘토링 특강', '반도체 분야 Career Fair 프로그램'],
    [9, '2025', '2학기', '캡스톤디자인', '창의과제(캡스톤디자인) 경진대회'],
    [8, '2025', '2학기', '멘토링 특강', '자신감 UP! 반도체 취UP! 프로그램'],
    [7, '2025', '2학기', '취업캠프', 'ROUND UP!(합동캠프)'],
    [6, '2025', '2학기', '현장견학', '반도체 대전(SEDEX 2025) 현장견학'],
    [5, '2025', '2학기', '멘토링 특강', '램리서치코리아 채용설명회'],
    [4, '2025', '1학기', '멘토링 특강', '램리서치매뉴팩춰링코리아 취업설명회'],
    [3, '2025', '1학기', '캡스톤디자인', '캡스톤디자인 경진대회'],
    [2, '2025', '1학기', '현장견학', '(주)이오테크닉스 반도체 교육시설 현장견학'],
    [1, '2025', '1학기', '멘토링 특강', '캡스톤디자인 산업체 멘토링 프로그램']
  ];

  function render(tab) {
    var html = '';
    if (tab === 'md') {
      html = '<table class="atab"><thead><tr><th>No</th><th>운영연도</th><th>개설 학과</th><th>교육과정</th><th>과정등급</th><th>접수기간</th><th>정원</th><th>신청인원</th><th>진행현황</th></tr></thead><tbody>';
      md.forEach(function (r, i) {
        html += '<tr><td>' + (i + 1) + '</td><td>2026</td><td><span class="dept ' + r[1] + '">' + r[0] + '</span></td>'
          + '<td class="course-nm">' + r[2] + '</td><td>' + lv(r[3]) + '</td>'
          + '<td class="period">' + r[6] + '</td><td>' + r[4] + '</td><td>' + r[5] + '</td><td>' + status() + '</td></tr>';
      });
      html += '</tbody></table>';
    } else if (tab === 'immersive') {
      html = '<table class="atab"><thead><tr><th>No</th><th>운영연도</th><th>교육과정</th><th>과정등급</th><th>참여기업</th><th>접수기간</th><th>정원</th><th>신청인원</th><th>진행현황</th></tr></thead><tbody>';
      immersive.forEach(function (r, i) {
        html += '<tr><td>' + (i + 1) + '</td><td>2026</td><td class="course-nm">' + r[0] + '</td>'
          + '<td>' + lv(r[1]) + '</td><td>' + r[2] + '</td><td class="period">' + r[5] + '</td>'
          + '<td>' + r[3] + '</td><td>' + r[4] + '</td><td>' + status() + '</td></tr>';
      });
      html += '</tbody></table>';
    } else {
      html = '<table class="atab"><thead><tr><th>No</th><th>학년도</th><th>학기</th><th>영역</th><th>프로그램명</th><th>진행</th></tr></thead><tbody>';
      etc.forEach(function (r) {
        html += '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td>'
          + '<td class="area">' + r[3] + '</td><td class="course-nm">' + r[4] + '</td><td>' + status() + '</td></tr>';
      });
      html += '</tbody></table>';
    }
    wrap.innerHTML = html;
    // 행 클릭 시 로그인 이동
    wrap.querySelectorAll('tbody tr').forEach(function (tr) {
      tr.addEventListener('click', function () {
        window.open(LOGIN_URL, '_blank', 'noopener');
      });
    });
  }

  function open() {
    document.querySelector('.apply-tab.active');
    render('md');
    modal.querySelectorAll('.apply-tab').forEach(function (t, i) {
      t.classList.toggle('active', i === 0);
    });
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-apply]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      open();
    });
  });
  modal.querySelectorAll('.apply-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      modal.querySelectorAll('.apply-tab').forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      render(tab.getAttribute('data-tab'));
    });
  });
  modal.querySelector('.modal-close').addEventListener('click', close);
  modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
});

// 교육과정 안내 모달 (마이크로디그리 10개 과정 상세)
document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById('infoModal');
  if (!modal) return;
  var list = document.getElementById('infoList');

  var data = [
    { lv: 'beginner', lvName: '초급', name: '반도체공정 및 설비기초',
      goal: '반도체의 물리적 특성과 기본 소자를 이해하고, 반도체 산업의 메모리 및 기본 공정·설비를 학습합니다.',
      subjects: '반도체기초 (2학년 2학기 / 45시간 / 3학점)',
      immersive: '', std: 'C학점 이상', job: '' },
    { lv: 'beginner', lvName: '초급', name: '반도체소자 및 공정기초',
      goal: 'DIODE, TRANSISTOR, FET를 기초로 반도체를 정의하고, 기본 동작 방식과 제작 흐름을 학습합니다.',
      subjects: '반도체공학 (1학년 2학기 / 30시간 / 2학점)',
      immersive: '', std: 'C학점 이상', job: '' },
    { lv: 'mid', lvName: '중급', name: '반도체설비자동화',
      goal: '반도체설비를 자동화하기 위한 기초 지식과 실무 능력을 갖춘 인력을 양성합니다.',
      subjects: '캡스톤디자인(3/1·90h·4학점), PLC제어(2/2·45h·3학점), PC기반제어(2/2·45h·3학점), 창의과제(캡스톤디자인)(2/2·45h·3학점)',
      immersive: '협동로봇오퍼레이션 실무 (2·3학년 / 45시간 / 3학점)',
      std: '4개 교과목 이상이고 10학점 이상 이수',
      job: '반도체 공정 모니터링 및 설비자동화 설계·제작을 학습하여 반도체 제조공정 분야 취업에 도움.' },
    { lv: 'mid', lvName: '중급', name: '반도체장비제어',
      goal: '반도체 장비를 제어하기 위한 기초 지식과 실무 능력을 갖춘 인력을 양성합니다.',
      subjects: 'PLC프로그래밍(2/1·45h·3학점), 캡스톤디자인(3/1·90h·4학점), PC기반제어(2/2·45h·3학점), PLC제어(2/2·45h·3학점)',
      immersive: 'PLC 실무 (3학년 / 45시간 / 3학점)',
      std: '4개 교과목 이상이고 10학점 이상 이수',
      job: 'PLC 응용 모듈로 설비자동화 설계·제작을 익히고, PLC실무 인증으로 반도체장비 제어 직무 취업 가능.' },
    { lv: 'mid', lvName: '중급', name: '반도체설비운용',
      goal: '반도체설비를 운용할 수 있는 실무 역량을 갖춘 인재를 양성합니다.',
      subjects: 'PLC프로그래밍(2/1·45h·3학점), 반도체설비(3/1·45h·3학점), 공압제어(2/1·45h·3학점), 반도체제조공정(2/2·45h·3학점)',
      immersive: '반도체장비유지보수 실무 (2학년 / 30시간 / 2학점), PLC실무 (2학년 / 45시간 / 3학점)',
      std: '4개 교과목 이상이고 10학점 이상 이수 (몰입형 1~2개 이수 가능)',
      job: '반도체 장비 운용·점검 및 핵심부품 기술을 습득하여 장비를 최적 상태로 유지·보수하는 실무 직무 능력 배양.' },
    { lv: 'mid', lvName: '중급', name: '반도체설비유지보수',
      goal: '반도체설비를 유지·보수하기 위한 기초 지식과 실무 능력을 갖춘 인력을 양성합니다.',
      subjects: 'PLC프로그래밍(2/1·45h·3학점), 마이크로컨트롤러(2/1·45h·3학점), PC기반제어(2/1·45h·3학점), 반도체기초(2/2·45h·3학점)',
      immersive: '반도체위험물관리 실무 (2·3학년 / 45시간 / 3학점)',
      std: '4개 교과목 이상이고 10학점 이상 이수',
      job: '유틸리티 장치 설치·운전, 반도체 품질 안전관리, 위험물관리 유지보수 직무 취업 가능.' },
    { lv: 'mid', lvName: '중급', name: '반도체레이아웃설계',
      goal: '반도체 레이아웃 설계 직무를 위한 이론 및 실기 능력을 갖춘 인재를 양성합니다.',
      subjects: '전자회로(2/1·30h·2학점), 집적회로설계(2/1·45h·3학점), 반도체특성실험(2/1·45h·3학점), 반도체레이아웃(2/2·45h·3학점)',
      immersive: '반도체레이아웃설계 실무 (2·3학년 / 45시간 / 3학점)',
      std: '4개 교과목 이상이고 10학점 이상 이수',
      job: '소프트웨어·도구로 반도체 성능과 안정성을 최적화하는 정밀 실무 중심 직무 취업 가능.' },
    { lv: 'mid', lvName: '중급', name: '반도체공정측정분석',
      goal: '반도체공정 측정분석 직무를 위한 이론 및 실기 능력을 갖춘 인재를 양성합니다.',
      subjects: '반도체특성실험(2/1·45h·3학점), 반도체제조공정(2/1·45h·3학점), 반도체장비실무(2/2·45h·3학점), 종합설계(2/2·45h·3학점)',
      immersive: '반도체공정장비 실무 (2학년 / 30시간 / 2학점)',
      std: '4개 교과목 이상이고 10학점 이상 이수',
      job: '반도체 공정기술 개발, 품질 개선 등 공정·소자 특성분석 관련 직무에 적합.' },
    { lv: 'adv', lvName: '고급', name: '반도체장비S/W운용',
      goal: '반도체장비 제어 소프트웨어를 운영·유지보수할 수 있는 실무 역량을 갖춘 인재를 양성합니다.',
      subjects: '인공지능개론(2/1·45h·3학점), 자동화통신(3/1·45h·3학점), 캡스톤디자인(3/1·90h·4학점), PC기반제어(2/2·45h·3학점)',
      immersive: '반도체장비S/W 실무 (2·3학년 / 45시간 / 3학점)',
      std: '4개 교과목 이상이고 10학점 이상 이수',
      job: '반도체 설계·개발 및 생산 공정 문제를 종합 진단·처리하는 유지보수 업무에 적합.' },
    { lv: 'adv', lvName: '고급', name: '반도체설비설계',
      goal: '반도체설비 구성 및 관련 도면을 이해할 수 있는 실무 역량을 갖춘 인재를 양성합니다.',
      subjects: '캡스톤디자인(3/1·90h·4학점), 반도체설비(3/1·45h·3학점), 창의과제(캡스톤디자인)(2/2·45h·3학점)',
      immersive: '도면이해 및 Solidworks 실무 (2·3학년 / 45시간 / 3학점), 반도체장비기구설계 실무 (2·3학년 / 30시간 / 2학점)',
      std: '4개 교과목 이상이고 10학점 이상 이수 (몰입형 1~2개 이수 가능)',
      job: '반도체 부품 모델링·조립 실습과 설비 구성·원리 학습으로 반도체 설비 직무 취업에 적합.' }
  ];

  var groupLabel = { beginner: '초급 과정', mid: '중급 과정', adv: '고급 과정' };
  var order = ['beginner', 'mid', 'adv'];

  function build() {
    var html = '';
    order.forEach(function (g) {
      var items = data.filter(function (d) { return d.lv === g; });
      html += '<div class="info-group-label ' + g + '"><span class="lvdot"></span>' + groupLabel[g] + ' (' + items.length + '개)</div>';
      items.forEach(function (d) {
        html += '<div class="acc"><div class="acc-head"><span class="nm">' + d.name
          + '<span class="lv ' + d.lv + '">' + d.lvName + '</span></span><span class="arr">▾</span></div>'
          + '<div class="acc-body">'
          + '<span class="lbl">교육 목표</span>' + d.goal
          + '<span class="lbl">교과목 구성 [교과형]</span><span class="courses">' + d.subjects + '</span>'
          + (d.immersive ? '<span class="lbl">[몰입형]</span><span class="courses">' + d.immersive + '</span>' : '')
          + '<span class="lbl">이수 기준</span>' + d.std
          + (d.job ? '<span class="lbl">취업 관련 직무</span>' + d.job : '')
          + '</div></div>';
      });
    });
    list.innerHTML = html;
    list.querySelectorAll('.acc-head').forEach(function (h) {
      h.addEventListener('click', function () { h.parentElement.classList.toggle('open'); });
    });
  }

  function open() { if (!list.innerHTML) build(); modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function close() { modal.classList.remove('open'); document.body.style.overflow = ''; }

  document.querySelectorAll('[data-info]').forEach(function (btn) {
    btn.addEventListener('click', function (e) { e.preventDefault(); open(); });
  });
  modal.querySelector('.modal-close').addEventListener('click', close);
  modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
});

// 부트일정 모달
document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById('scheduleModal');
  if (!modal) return;
  var list = document.getElementById('schList');

  var months = [
    { m: 1, note: '방학 중 몰입형 교육 집중', events: [
      { kind: '몰입형', cls: '', title: '반도체장비S/W실무 개강', date: '01.06(월) 10:00 ~ 01.16(금) 12:00' },
      { kind: '몰입형', cls: '', title: 'PLC실무 개강', date: '01.19(월) 10:00 ~ 01.28(수) 12:00' }
    ]},
    { m: 2, note: '동계방학 종료·신학기 준비', events: [] },
    { m: 3, note: '1학기 정규 과정 시작', events: [
      { kind: '신청', cls: 'fld', title: '2026년 1학기 마이크로디그리 교육과정 신청', date: '03.05(수) 12:00 ~ 03.20(금) 18:00' }
    ]},
    { m: 4, note: '중간고사 기간', events: [] },
    { m: 5, note: '기업 연계·현장 감각 고도화', events: [
      { kind: '현장견학', cls: 'cap', title: '램리서치코리아 반도체 제조시설 현장견학', date: '05.14(목) 09:00 ~ 14:00' }
    ]},
    { m: 6, note: '1학기 성과 마무리', events: [
      { kind: '경진대회', cls: 'cap', title: '캡스톤디자인 경진대회', date: '06.01(월) 14:00 ~ 18:00' }
    ]},
    { m: 7, note: '하계 몰입형 교육(예정)', events: [] },
    { m: 8, note: '하계 몰입형 교육(예정)', events: [] },
    { m: 9, note: '2학기 마이크로디그리 신청(예정)', events: [] },
    { m: 10, note: '', events: [] },
    { m: 11, note: '', events: [] },
    { m: 12, note: '', events: [] }
  ];

  function build() {
    var html = '';
    months.forEach(function (mo) {
      var empty = mo.events.length === 0;
      html += '<div class="sch-month' + (empty ? ' empty' : '') + '">'
        + '<div class="sch-mlabel">' + mo.m + '월' + (mo.note ? '<small>' + mo.note + '</small>' : '') + '</div>'
        + '<div class="sch-events">';
      if (empty) {
        html += '<span class="sch-none">등록된 일정 없음</span>';
      } else {
        mo.events.forEach(function (e) {
          html += '<div class="sch-ev"><div class="et"><span class="ek ' + e.cls + '">' + e.kind + '</span>'
            + e.title + '</div><div class="ed">' + e.date + '</div></div>';
        });
      }
      html += '</div></div>';
    });
    list.innerHTML = html;
  }

  function open() { if (!list.innerHTML) build(); modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function close() { modal.classList.remove('open'); document.body.style.overflow = ''; }

  document.querySelectorAll('[data-schedule]').forEach(function (btn) {
    btn.addEventListener('click', function (e) { e.preventDefault(); open(); });
  });
  modal.querySelector('.modal-close').addEventListener('click', close);
  modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
});
