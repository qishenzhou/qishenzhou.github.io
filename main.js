(function () {
  'use strict';

  const i18n = {
    zh: {
      nav_about: '关于',
      nav_research: '研究成果',
      nav_projects: '研究项目',
      nav_team: '研究团队',
      nav_activities: '学术活动',
      nav_gallery: '摄影集',
      name: '您的姓名',
      title: '唐敖庆青年学者 · 副教授',
      org: '吉林大学交通学院｜交通信息工程及控制系',
      contact: '联系方式',
      research_title: '研究成果',
      activities_title: '学术活动',
      projects_title: '研究项目',
      tab_papers: '工作概览',
      tab_overview: '工作概览',
      tab_citations: '文章列表',
      tab_activities: '学术活动',
      tab_resources: '开放资源',
      link_pdf: 'PDF',
      news_title: '学术动态',
      home_news_title: '近期动态',
      notice_title: '公告',
      office_label: '办公地点',
      tagline_zh: '研以致用，行稳致远',
      tagline_en: 'Research for impact',
      intro_title: '个人简介',
      about_me_interests: '研究兴趣',
      team_title: '研究团队',
      gallery_title: '摄影集',
      activities_intro_zh: '会议报告、访问交流等学术活动记录。',
      gallery_intro_zh: '工作之余的随拍与旅途记录。',
      project1_title: '国家自然科学基金面上项目',
      project1_desc: '项目简介……',
      resource_desc: '简要说明与下载说明',
      icon_email: '邮箱',
      icon_linkedin: '领英',
      icon_scholar: '谷歌学术',
      icon_github: 'GitHub',
      icon_orcid: 'ORCID',
      pdf_tba: '文件（待添加）',
      code_tba: '代码（待添加）',
      cite_tba: '引用（待添加）',
      pending_tip: '待添加',
      action_pdf: '文件',
      action_code: '代码',
      action_cite: '引用',
      paper_like: '点赞',
      cite_tooltip: '复制 BibTeX',
      cite_copied: '已复制',
      detail_back: '返回',
      gallery_like: '喜欢',
      gallery_download: '下载',
      view_more: '查看更多 →',
      footer: '© 2025 · 保留所有权利',
    },
    en: {
      nav_about: 'About',
      nav_research: 'Research',
      nav_projects: 'Projects',
      nav_team: 'Research Team',
      nav_activities: 'Activities',
      nav_gallery: 'Gallery',
      name: 'Your Name',
      title: 'Tang Aoqing Young Scholar · Associate Professor',
      org: 'School of Transportation, Jilin University | Department of Traffic Information Engineering and Control',
      contact: 'Contact',
      research_title: 'Research',
      activities_title: 'Academic Activities',
      projects_title: 'Projects',
      tab_papers: 'Work Overview',
      tab_overview: 'Work Overview',
      tab_citations: 'Publication List',
      tab_activities: 'Academic Activities',
      tab_resources: 'Open Resources',
      link_pdf: 'PDF',
      news_title: 'Academic News',
      home_news_title: 'News',
      notice_title: 'Announcements',
      office_label: 'Office',
      tagline_zh: '研以致用，行稳致远',
      tagline_en: 'Research for impact',
      intro_title: 'Brief intro',
      about_me_interests: 'Research interests',
      team_title: 'Research Team',
      gallery_title: 'Gallery',
      activities_intro_en: 'Talks, visits and other academic activities.',
      gallery_intro_en: 'Snapshots and travel photos in my spare time.',
      project1_title: 'NSFC General Program',
      project1_desc: 'Project description…',
      resource_desc: 'Brief description and download info',
      icon_email: 'Email',
      icon_linkedin: 'LinkedIn',
      icon_scholar: 'Google Scholar',
      icon_github: 'GitHub',
      icon_orcid: 'ORCID',
      pdf_tba: 'Document (TBA)',
      code_tba: 'Code (TBA)',
      cite_tba: 'Cite (TBA)',
      pending_tip: 'TBA',
      action_pdf: 'Document',
      action_code: 'Code',
      action_cite: 'Cite',
      paper_like: 'Like',
      cite_tooltip: 'Copy BibTeX',
      cite_copied: 'Copied',
      detail_back: 'Back',
      gallery_like: 'Like',
      gallery_download: 'Download',
      view_more: 'View more →',
      footer: '© 2025 · All rights reserved.',
    },
  };

  var paperDetails = [
    { title_zh: '论文标题示例 / Example Paper Title', title_en: 'Example Paper Title', venue: 'Journal of Transportation Engineering.', year: '2024', abstract_zh: '此处可填写论文摘要或详细说明。请替换为实际内容。', abstract_en: 'Abstract or full description can go here. Replace with your content.' },
    { title_zh: '另一篇论文标题', title_en: 'Another Paper Title', venue: 'Transportation Research Part C.', year: '2023', abstract_zh: '论文摘要或详细说明……', abstract_en: 'Abstract or description…' },
    { title_zh: '更多论文可在此持续添加', title_en: 'More papers can be added here', venue: 'Journal name.', year: '2023', abstract_zh: '添加后在此处填写摘要或详情。', abstract_en: 'Add abstract or details here.' },
  ];

  var resourceDetails = [
    { title_zh: '数据集 / Dataset Name', title_en: 'Dataset Name', desc_zh: '简要说明与下载说明。可在此补充使用方式、格式、引用方式等。', desc_en: 'Brief description and download info. Add usage, format, citation here.' },
    { title_zh: '代码或工具 / Code or Tool', title_en: 'Code or Tool', desc_zh: 'GitHub / 开源链接说明。可补充运行环境、依赖、示例等。', desc_en: 'GitHub / open source link and instructions. Add environment, dependencies, examples.' },
    { title_zh: '更多资源可在此持续添加', title_en: 'More resources can be added here', desc_zh: '说明与下载或访问方式。', desc_en: 'Description and download or access info.' },
  ];

  var activityDetails = [
    { date: '2024.12', title_zh: '参加某某学术会议并作报告', title_en: 'Presented at XXX conference', body_zh: '可在此填写会议名称、地点、报告题目与摘要等详细内容。', body_en: 'Add conference name, venue, talk title and abstract here.' },
    { date: '2024.08', title_zh: '在某校进行学术访问', title_en: 'Academic visit at XXX', body_zh: '可补充访问机构、合作内容、时长等。', body_en: 'Add host institution, collaboration, duration.' },
    { date: '2024.05', title_zh: '更多学术活动可在此持续添加', title_en: 'More academic activities can be added here', body_zh: '添加后在此处填写详细描述。', body_en: 'Add detailed description here.' },
  ];

  var newsDetails = [
    { date: '2025.02', title_zh: '即将入职吉林大学交通学院', title_en: 'Joining Jilin University', body_zh: '任唐敖庆青年学者（副教授）。可在此补充入职时间、岗位职责等详细说明。', body_en: 'As Tang Aoqing Young Scholar (Associate Professor). Add details such as start date and role here.' },
    { date: '2024.12', title_zh: '参加某某学术会议并作报告', title_en: 'Presented at XXX conference', body_zh: '可在此填写会议名称、地点、报告题目与摘要等详细内容。', body_en: 'Add conference name, venue, talk title and abstract here.' },
    { date: '2024.10', title_zh: '论文被 XXX 期刊接收', title_en: 'Paper accepted by XXX journal', body_zh: '可在此补充论文标题、作者、期刊信息及摘要等。', body_en: 'Add paper title, authors, journal and abstract here.' },
  ];

  var galleryDetails = [
    { src: 'https://picsum.photos/seed/g1/800/600', alt: '摄影 1' },
    { src: 'https://picsum.photos/seed/g2/800/600', alt: '摄影 2' },
    { src: 'https://picsum.photos/seed/g3/800/600', alt: '摄影 3' },
    { src: 'https://picsum.photos/seed/g4/800/600', alt: '摄影 4' },
    { src: 'https://picsum.photos/seed/g5/800/600', alt: '摄影 5' },
    { src: 'https://picsum.photos/seed/g6/800/600', alt: '摄影 6' },
    { src: 'https://picsum.photos/seed/g7/800/600', alt: '摄影 7' },
    { src: 'https://picsum.photos/seed/g8/800/600', alt: '摄影 8' },
    { src: 'https://picsum.photos/seed/g9/800/600', alt: '摄影 9' },
  ];

  function getGalleryLiked() {
    try {
      var raw = localStorage.getItem('gallery-liked');
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }
  function setGalleryLiked(id, liked) {
    var o = getGalleryLiked();
    o[id] = liked;
    try { localStorage.setItem('gallery-liked', JSON.stringify(o)); } catch (e) {}
  }

  function getPaperLiked() {
    try {
      var raw = localStorage.getItem('paper-liked');
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }
  function setPaperLiked(id, liked) {
    var o = getPaperLiked();
    o[id] = liked;
    try { localStorage.setItem('paper-liked', JSON.stringify(o)); } catch (e) {}
  }

  var paperBibtex = [
    '@article{example2024,\n  title = {论文标题示例 / Example Paper Title},\n  author = {Your Name},\n  journal = {Journal of Transportation Engineering},\n  year = {2024},\n  volume = {xx},\n  pages = {1--10}\n}',
    '@article{another2023,\n  title = {另一篇论文标题},\n  author = {Your Name},\n  journal = {Transportation Research Part C},\n  year = {2023},\n  volume = {xx},\n  pages = {1--15}\n}',
    '',
  ];

  // 工作概览与文章列表共用：每篇论文的 PDF、代码链接（只改这里即可同步两处）
  var paperLinks = [
    { pdf: '#', code: '#' },
    { pdf: '#', code: null },
    { pdf: null, code: null },
  ];

  function applyPaperLinks() {
    paperLinks.forEach(function (links, i) {
      var pdfEls = document.querySelectorAll('a[data-paper-index="' + i + '"][data-action="pdf"]');
      var codeEls = document.querySelectorAll('a[data-paper-index="' + i + '"][data-action="code"]');
      pdfEls.forEach(function (a) {
        var label = a.querySelector('.paper-action-label');
        if (links.pdf) {
          a.href = links.pdf;
          a.classList.remove('pending');
          a.removeAttribute('data-i18n-title');
          if (label) label.setAttribute('data-i18n', 'action_pdf');
        } else {
          a.href = '#';
          a.classList.add('pending');
          a.setAttribute('data-i18n-title', 'pdf_tba');
          if (label) label.setAttribute('data-i18n', 'action_pdf');
        }
      });
      codeEls.forEach(function (a) {
        var label = a.querySelector('.paper-action-label');
        if (links.code) {
          a.href = links.code;
          a.classList.remove('pending');
          a.removeAttribute('data-i18n-title');
          if (label) label.setAttribute('data-i18n', 'action_code');
        } else {
          a.href = '#';
          a.classList.add('pending');
          a.setAttribute('data-i18n-title', 'code_tba');
          if (label) label.setAttribute('data-i18n', 'action_code');
        }
      });
    });
  }

  var savedLang = typeof localStorage !== 'undefined' && localStorage.getItem('site-lang');
  var browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
  var defaultLang = browserLang.indexOf('zh') === 0 ? 'zh' : 'en';
  var currentLang = savedLang === 'en' || savedLang === 'zh' ? savedLang : defaultLang;

  function setLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    if (typeof localStorage !== 'undefined') localStorage.setItem('site-lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (i18n[currentLang][key] !== undefined) {
        el.textContent = i18n[currentLang][key];
      }
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-title');
      if (i18n[currentLang][key] !== undefined) {
        var text = i18n[currentLang][key];
        el.setAttribute('title', text);
        if (key === 'pdf_tba' || key === 'code_tba' || key === 'cite_tba') {
          el.setAttribute('data-pending-tip', i18n[currentLang].pending_tip);
        }
      }
    });

    document.querySelectorAll('.lang-zh').forEach(function (el) {
      el.classList.toggle('lang-active', currentLang === 'zh');
      el.classList.toggle('hidden', currentLang !== 'zh');
    });
    document.querySelectorAll('.lang-en').forEach(function (el) {
      el.classList.toggle('lang-active', currentLang === 'en');
      el.classList.toggle('hidden', currentLang !== 'en');
    });

    document.querySelectorAll('.lang-option').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-lang') === currentLang);
    });
    var orgLink = document.querySelector('.about-org-link');
    if (orgLink) {
      orgLink.href = currentLang === 'zh' ? 'https://jt.jlu.edu.cn/index.htm' : 'https://jt.jlu.edu.cn/en/index.htm';
    }
    var h = typeof getHashId === 'function' ? getHashId() : null;
    if (h && overlay && overlay.classList.contains('is-open')) {
      renderDetail(h.type, h.id);
    }
  }

  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function (e) {
      var target = e.target.closest('.lang-option');
      if (target) {
        var lang = target.getAttribute('data-lang');
        if (lang) setLang(lang);
      }
    });
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.paper-cite');
    if (!btn) return;
    var idx = btn.getAttribute('data-paper-index');
    if (idx == null || !paperBibtex[idx]) return;
    e.preventDefault();
    var ta = document.createElement('textarea');
    ta.value = paperBibtex[idx];
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showCiteToast(i18n[currentLang].cite_copied);
    } catch (err) {}
    document.body.removeChild(ta);
  });

  function showCiteToast(msg) {
    var el = document.getElementById('cite-toast');
    if (el) {
      el.textContent = msg;
      el.classList.add('show');
      clearTimeout(el._toastTimer);
      el._toastTimer = setTimeout(function () {
        el.classList.remove('show');
      }, 1800);
    }
  }

  var overlay = document.getElementById('detail-overlay');
  var detailContent = document.getElementById('detail-content');

  function getHashId() {
    var hash = (location.hash || '').replace(/^#/, '');
    var m = hash.match(/^(paper|resource|activity|news|gallery)-(\d+)$/);
    return m ? { type: m[1], id: parseInt(m[2], 10) } : null;
  }

  function renderDetail(type, id) {
    if (!detailContent) return;
    var lang = currentLang;
    var html = '';
    if (type === 'paper' && paperDetails[id]) {
      var p = paperDetails[id];
      var title = lang === 'zh' ? p.title_zh : p.title_en;
      var abs = lang === 'zh' ? p.abstract_zh : p.abstract_en;
      html = '<h2>' + escapeHtml(title) + '</h2><p class="detail-meta">' + escapeHtml(p.venue) + ' · ' + escapeHtml(p.year) + '</p><div class="detail-body">' + escapeHtml(abs) + '</div>';
    } else if (type === 'resource' && resourceDetails[id]) {
      var r = resourceDetails[id];
      var rTitle = lang === 'zh' ? r.title_zh : r.title_en;
      var rDesc = lang === 'zh' ? r.desc_zh : r.desc_en;
      html = '<h2>' + escapeHtml(rTitle) + '</h2><div class="detail-body">' + escapeHtml(rDesc) + '</div>';
    } else if (type === 'activity' && activityDetails[id]) {
      var a = activityDetails[id];
      var aTitle = lang === 'zh' ? a.title_zh : a.title_en;
      var aBody = lang === 'zh' ? a.body_zh : a.body_en;
      html = '<h2>' + escapeHtml(aTitle) + '</h2><p class="detail-meta">' + escapeHtml(a.date) + '</p><div class="detail-body">' + escapeHtml(aBody) + '</div>';
    } else if (type === 'news' && newsDetails[id]) {
      var n = newsDetails[id];
      var nTitle = lang === 'zh' ? n.title_zh : n.title_en;
      var nBody = lang === 'zh' ? n.body_zh : n.body_en;
      html = '<h2>' + escapeHtml(nTitle) + '</h2><p class="detail-meta">' + escapeHtml(n.date) + '</p><div class="detail-body">' + escapeHtml(nBody) + '</div>';
    } else if (type === 'gallery' && galleryDetails[id]) {
      var g = galleryDetails[id];
      var liked = getGalleryLiked()[id];
      var imgHtml = g.src
        ? '<img src="' + escapeHtml(g.src) + '" alt="' + escapeHtml(g.alt) + '" />'
        : '<div class="detail-gallery-placeholder">' + escapeHtml(g.alt) + '</div>';
      var likeLabel = i18n[currentLang].gallery_like || '喜欢';
      var dlLabel = i18n[currentLang].gallery_download || '下载';
      html =
        '<div class="detail-gallery-wrap">' +
          '<div class="detail-gallery-image">' + imgHtml + '</div>' +
          '<div class="detail-gallery-actions">' +
            '<button type="button" class="gallery-like-btn' + (liked ? ' liked' : '') + '" data-gallery-id="' + id + '" aria-label="' + escapeHtml(likeLabel) + '">' +
              '<svg class="heart-outline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' +
              '<svg class="heart-filled" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' +
            '</button>' +
            (g.src ? '<a href="' + escapeHtml(g.src) + '" download class="gallery-download-btn" data-i18n="gallery_download">' + dlLabel + '</a>' : '') +
          '</div>' +
        '</div>';
    }
    detailContent.innerHTML = html || '';
    if (type === 'gallery') bindGalleryDetailActions();
  }

  function bindGalleryDetailActions() {
    var btn = detailContent && detailContent.querySelector('.gallery-like-btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var id = this.getAttribute('data-gallery-id');
      if (id == null) return;
      var liked = !this.classList.contains('liked');
      this.classList.toggle('liked', liked);
      setGalleryLiked(id, liked);
    });
  }

  function escapeHtml(s) {
    if (!s) return '';
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function openDetail(type, id) {
    if (type === 'paper') return;
    location.hash = type + '-' + id;
    if (!overlay) return;
    renderDetail(type, id);
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDetail() {
    if (history.replaceState) {
      history.replaceState(null, '', location.pathname + location.search);
    } else {
      location.hash = '';
    }
    if (overlay) {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';
  }

  document.addEventListener('click', function (e) {
    var item = e.target.closest('.detail-item') || e.target.closest('.gallery-item');
    if (!item) return;
    if (item.querySelector('.paper-actions') && e.target.closest('.paper-actions')) return;
    var type = item.getAttribute('data-detail-type');
    var id = item.getAttribute('data-detail-id');
    if (!type || id == null) return;
    e.preventDefault();
    e.stopPropagation();
    openDetail(type, id);
  });

  if (overlay) {
    overlay.querySelector('.detail-backdrop').addEventListener('click', closeDetail);
  }

  window.addEventListener('hashchange', function () {
    var h = getHashId();
    if (h) {
      openDetail(h.type, h.id);
    } else if (overlay && overlay.classList.contains('is-open')) {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });

  var initialHash = getHashId();
  if (initialHash) {
    openDetail(initialHash.type, initialHash.id);
  }

  var tabs = document.querySelectorAll('.research-tab');
  var panels = document.querySelectorAll('.research-panel');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var t = this.getAttribute('data-tab');
      if (!t) return;
      tabs.forEach(function (x) { x.classList.remove('active'); });
      panels.forEach(function (p) {
        p.classList.toggle('active', p.id === 'panel-' + t);
      });
      this.classList.add('active');
    });
  });

  function applyCitePending() {
    document.querySelectorAll('button.paper-cite').forEach(function (btn) {
      var idx = btn.getAttribute('data-paper-index');
      if (idx == null) return;
      if (!paperBibtex[parseInt(idx, 10)]) {
        btn.classList.add('pending');
        btn.setAttribute('data-i18n-title', 'cite_tba');
      } else {
        btn.classList.remove('pending');
        btn.removeAttribute('data-i18n-title');
        btn.removeAttribute('data-pending-tip');
      }
    });
  }

  applyPaperLinks();
  applyCitePending();
  setLang(currentLang);

  document.addEventListener('click', function (e) {
    if (e.target.closest('a.paper-action.pending')) e.preventDefault();
    if (e.target.closest('button.paper-action.pending')) e.preventDefault();
  });

  var paperLiked = getPaperLiked();
  var firebaseDb = null;
  if (typeof window.FIREBASE_CONFIG === 'object' && window.FIREBASE_CONFIG && window.FIREBASE_CONFIG.databaseURL && typeof firebase !== 'undefined' && firebase.database) {
    try {
      firebase.initializeApp(window.FIREBASE_CONFIG);
      firebaseDb = firebase.database();
    } catch (err) { firebaseDb = null; }
  }
  document.querySelectorAll('.paper-like-btn').forEach(function (btn) {
    var id = btn.getAttribute('data-paper-like-index');
    if (id != null && paperLiked[id]) btn.classList.add('liked');
    btn.addEventListener('click', function () {
      var id = this.getAttribute('data-paper-like-index');
      if (id == null) return;
      var liked = !this.classList.contains('liked');
      this.classList.toggle('liked', liked);
      setPaperLiked(id, liked);
      if (liked && firebaseDb) {
        firebaseDb.ref('paper_likes/' + id).push({ t: Date.now() });
      }
    });
  });
})();
