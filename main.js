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
      name: '周启申',
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
      team_building: '团队建设中',
      footer: '© 2025 · 保留所有权利',
    },
    en: {
      nav_about: 'About',
      nav_research: 'Research',
      nav_projects: 'Projects',
      nav_team: 'Research Team',
      nav_activities: 'Activities',
      nav_gallery: 'Gallery',
      name: 'Qishen Zhou',
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
      team_building: 'Team under construction',
      footer: '© 2025 · All rights reserved.',
    },
  };

  var paperDetails = [];
  var paperBibtex = [];
  var paperLinks = [];

  var resourceDetails = [];
  var projectDetails = [];
  var teamDetails = [];

  var activityDetails = [];
  var newsDetails = [];
  var aboutMe = { zh: {}, en: {} };

  var galleryDetails = [];

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

  function setBackgroundFromImageEdge(img, container) {
    if (!img || !container || !img.complete || img.naturalWidth === 0) return;
    try {
      var w = Math.min(32, img.naturalWidth);
      var h = Math.min(32, img.naturalHeight);
      var c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      var ctx = c.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, w, h);
      var data = ctx.getImageData(0, 0, w, h).data;
      var r = 0, g = 0, b = 0, n = 0;
      var sample = function (x, y) {
        var i = (y * w + x) * 4;
        r += data[i]; g += data[i + 1]; b += data[i + 2]; n += 1;
      };
      sample(0, 0);
      sample(w - 1, 0);
      sample(0, h - 1);
      sample(w - 1, h - 1);
      if (n) container.style.backgroundColor = 'rgb(' + Math.round(r / n) + ',' + Math.round(g / n) + ',' + Math.round(b / n) + ')';
    } catch (e) {}
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

  function parseBibFile(text) {
    var entries = [];
    var re = /@(\w+)\s*\{\s*([^,]+),/g;
    var m;
    while ((m = re.exec(text)) !== null) {
      var type = m[1];
      var key = m[2].trim();
      var start = m.index + m[0].length;
      var depth = 1;
      var end = start;
      for (var i = start; i < text.length; i++) {
        if (text[i] === '{') depth++;
        else if (text[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
      }
      var rest = text.slice(start, end);
      var fields = {};
      var fieldRe = /(\w+)\s*=\s*(\{|")/g;
      var fm;
      while ((fm = fieldRe.exec(rest)) !== null) {
        var fname = fm[1].toLowerCase();
        var open = fm[2];
        var vstart = fm.index + fm[0].length;
        var vend;
        if (open === '{') {
          var d = 1;
          vend = vstart;
          while (vend < rest.length && d > 0) {
            if (rest[vend] === '{') d++;
            else if (rest[vend] === '}') d--;
            vend++;
          }
          fields[fname] = rest.slice(vstart, vend - 1).replace(/\s+/g, ' ').trim();
        } else {
          vend = rest.indexOf('"', vstart);
          fields[fname] = (vend === -1 ? rest.slice(vstart) : rest.slice(vstart, vend)).replace(/\s+/g, ' ').trim();
        }
      }
      entries.push({ type: type, key: key, fields: fields });
    }
    return entries;
  }

  function bibEntryToCiteBibtex(entry) {
    var omit = { abstract: 1, url: 1, code: 1, cover: 1 };
    var lines = ['@' + entry.type + '{' + entry.key + ','];
    for (var k in entry.fields) {
      if (omit[k]) continue;
      var v = entry.fields[k];
      if (!v) continue;
      lines.push('  ' + k + ' = {' + v + '},');
    }
    if (lines[lines.length - 1].endsWith(',')) lines[lines.length - 1] = lines[lines.length - 1].slice(0, -1);
    return lines.join('\n');
  }

  function loadPapers() {
    return Promise.all([
      fetch('data/papers_eng.bib').then(function (r) { return r.text(); }),
      fetch('data/papers_cn.bib').then(function (r) { return r.text(); })
    ]).then(function (texts) {
      var engEntries = parseBibFile(texts[0]);
      var cnEntries = parseBibFile(texts[1]);
      paperDetails.length = 0;
      paperBibtex.length = 0;
      paperLinks.length = 0;
      for (var i = 0; i < engEntries.length; i++) {
        var e = engEntries[i];
        var c = cnEntries[i] || e;
        var f = e.fields;
        var cf = c.fields;
        paperDetails.push({
          title_zh: cf.title || f.title,
          title_en: f.title,
          venue: f.journal || f.booktitle || '',
          year: f.year || '',
          abstract_zh: cf.abstract || f.abstract || '',
          abstract_en: f.abstract || '',
          cover: (f.cover || '').trim()
        });
        paperBibtex.push(bibEntryToCiteBibtex(e));
        var url = (f.url || '').trim();
        var code = (f.code || '').trim();
        paperLinks.push({ pdf: url || null, code: code || null });
      }
    }).catch(function () {
      paperDetails.length = 0;
      paperBibtex.length = 0;
      paperLinks.length = 0;
    });
  }

  function renderResearchPapers() {
    var listEl = document.getElementById('paper-list');
    var citeListEl = document.getElementById('citation-list');
    if (!listEl && !citeListEl) return;
    var paperActionTpl = '<a href="#" class="paper-action" data-paper-index="INDEX" data-action="pdf" aria-label="PDF"><span class="paper-action-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 2 L 19 2 L 19 16 L 14 22 L 5 22 Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M19 16 L 14 22 L 14 16 Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg></span><span class="paper-action-label" data-i18n="action_pdf">文件</span></a><a href="#" class="paper-action" data-paper-index="INDEX" data-action="code" aria-label="Code"><span class="paper-action-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18L4 12l5-6M15 6l5 6-5 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="paper-action-label" data-i18n="action_code">代码</span></a><button type="button" class="paper-action paper-cite" data-paper-index="INDEX" aria-label="Cite" data-i18n-title="cite_tooltip"><span class="paper-action-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7.24c0-.6-.24-1.18-.66-1.59L16.35 2.66A2.25 2.25 0 0 0 14.76 2H10c-1.1 0-2 .9-2 2z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M16 2v5h5M4 14v4c0 1.1.9 2 2 2h2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span><span class="paper-action-label" data-i18n="action_cite">引用</span></button><button type="button" class="paper-action paper-like-btn" data-paper-like-index="INDEX" aria-label="点赞"><span class="paper-action-icon"><svg class="heart-outline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg><svg class="heart-filled" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></span><span class="paper-action-label" data-i18n="paper_like">点赞</span></button>';
    if (listEl) {
      var lang = typeof currentLang !== 'undefined' ? currentLang : 'zh';
      var zhVis = lang === 'zh' ? '' : ' hidden';
      var enVis = lang === 'en' ? '' : ' hidden';
      listEl.innerHTML = '';
      paperDetails.forEach(function (p, i) {
        var thumbBlock = p.cover
          ? '<div class="paper-thumb"><img src="' + escapeHtml(p.cover) + '" alt="" /></div>'
          : '';
        var li = document.createElement('li');
        li.setAttribute('data-paper-index', i);
        li.innerHTML = '<div class="paper-header"><strong class="paper-title"><span class="lang-zh' + zhVis + '">' + escapeHtml(p.title_zh) + '</span><span class="paper-title-en lang-en' + enVis + '">' + escapeHtml(p.title_en) + '</span></strong><span class="paper-venue">' + escapeHtml(p.venue) + ' · ' + escapeHtml(p.year) + '</span></div><div class="paper-content">' + thumbBlock + '<div class="paper-abstract-wrap"><p class="paper-abstract lang-zh' + zhVis + '">' + escapeHtml(p.abstract_zh) + '</p><p class="paper-abstract lang-en' + enVis + '">' + escapeHtml(p.abstract_en) + '</p></div></div><div class="paper-actions">' + paperActionTpl.replace(/INDEX/g, i) + '</div>';
        listEl.appendChild(li);
      });
    }
    if (citeListEl) {
      citeListEl.innerHTML = '';
      paperDetails.forEach(function (p, i) {
        var actions = paperActionTpl.replace(/INDEX/g, i);
        var li = document.createElement('li');
        li.innerHTML = '<span class="citation-text">' + escapeHtml(p.title_en) + '. ' + escapeHtml(p.venue) + ', ' + escapeHtml(p.year) + '.</span><div class="citation-actions">' + actions + '</div>';
        citeListEl.appendChild(li);
      });
    }
  }

  function loadActivities() {
    return Promise.all([
      fetch('data/activities_ch.json').then(function (r) { return r.json(); }),
      fetch('data/activities_eng.json').then(function (r) { return r.json(); })
    ]).then(function (arrs) {
      var zh = arrs[0] || [];
      var en = arrs[1] || [];
      activityDetails.length = 0;
      for (var i = 0; i < Math.max(zh.length, en.length); i++) {
        var z = zh[i] || {};
        var e = en[i] || {};
        var base = z || e;
        var children = [];
        var zhChildren = z.children || [];
        var enChildren = e.children || [];
        for (var j = 0; j < Math.max(zhChildren.length, enChildren.length); j++) {
          children.push({
            title_zh: (zhChildren[j] || {}).title || '',
            title_en: (enChildren[j] || {}).title || '',
            body_zh: (zhChildren[j] || {}).body || '',
            body_en: (enChildren[j] || {}).body || ''
          });
        }
        activityDetails.push({
          date: base.date || '',
          title_zh: z.title || '',
          title_en: e.title || '',
          body_zh: z.body || '',
          body_en: e.body || '',
          image: (e.image || '').trim(),
          children: children
        });
      }
    }).catch(function () { activityDetails.length = 0; });
  }

  function renderActivitiesTimeline() {
    var container = document.querySelector('.section-activities .timeline');
    if (!container || activityDetails.length === 0) return;
    container.innerHTML = '';
    activityDetails.forEach(function (a, i) {
      var art = document.createElement('article');
      art.className = 'timeline-item detail-item';
      art.setAttribute('data-detail-type', 'activity');
      art.setAttribute('data-detail-id', i);
      var imgBlock = a.image ? '<div class="timeline-image"><img src="' + escapeHtml(a.image) + '" alt="' + escapeHtml(a.title_zh || a.title_en) + '" /></div>' : '';
      art.innerHTML = '<span class="timeline-date">' + escapeHtml(a.date) + '</span><div class="timeline-content"><p class="lang-zh">' + escapeHtml(a.body_zh || a.title_zh) + '</p><p class="lang-en hidden">' + escapeHtml(a.body_en || a.title_en) + '</p></div>' + imgBlock;
      container.appendChild(art);
    });
  }

  function loadGallery() {
    return fetch('data/gallery_list.json').then(function (r) { return r.json(); }).then(function (paths) {
      galleryDetails.length = 0;
      (paths || []).forEach(function (path, i) {
        galleryDetails.push({ src: path, alt: '摄影 ' + (i + 1) });
      });
    }).catch(function () { galleryDetails.length = 0; });
  }

  function renderGalleryGrid() {
    var grid = document.querySelector('.gallery-grid');
    if (!grid || galleryDetails.length === 0) return;
    grid.innerHTML = '';
    galleryDetails.forEach(function (g, i) {
      var div = document.createElement('div');
      div.className = 'gallery-item';
      div.setAttribute('data-detail-type', 'gallery');
      div.setAttribute('data-detail-id', i);
      div.innerHTML = '<img src="' + escapeHtml(g.src) + '" alt="' + escapeHtml(g.alt) + '" />';
      grid.appendChild(div);
      var img = div.querySelector('img');
      if (img) {
        img.onload = function () { setBackgroundFromImageEdge(img, div); };
        if (img.complete) setBackgroundFromImageEdge(img, div);
      }
    });
  }

  function loadProjects() {
    return Promise.all([
      fetch('data/projects_ch.json').then(function (r) { return r.json(); }),
      fetch('data/projects_eng.json').then(function (r) { return r.json(); })
    ]).then(function (arrs) {
      var zh = arrs[0] || [];
      var en = arrs[1] || [];
      projectDetails.length = 0;
      for (var i = 0; i < Math.max(zh.length, en.length); i++) {
        projectDetails.push({
          title_zh: (zh[i] || {}).title || '',
          title_en: (en[i] || {}).title || '',
          body_zh: (zh[i] || {}).body || '',
          body_en: (en[i] || {}).body || ''
        });
      }
    }).catch(function () { projectDetails.length = 0; });
  }

  function renderProjectsPage() {
    var listEl = document.getElementById('project-list');
    if (!listEl || projectDetails.length === 0) return;
    listEl.innerHTML = '';
    projectDetails.forEach(function (p) {
      var li = document.createElement('li');
      li.innerHTML = '<strong><span class="lang-zh">' + escapeHtml(p.title_zh) + '</span><span class="lang-en hidden">' + escapeHtml(p.title_en) + '</span></strong><p class="project-desc lang-zh">' + escapeHtml(p.body_zh) + '</p><p class="project-desc lang-en hidden">' + escapeHtml(p.body_en) + '</p>';
      listEl.appendChild(li);
    });
  }

  function loadResources() {
    return Promise.all([
      fetch('data/resources_ch.json').then(function (r) { return r.json(); }),
      fetch('data/resources_eng.json').then(function (r) { return r.json(); })
    ]).then(function (arrs) {
      var zh = arrs[0] || [];
      var en = arrs[1] || [];
      resourceDetails.length = 0;
      for (var i = 0; i < Math.max(zh.length, en.length); i++) {
        var z = zh[i] || {};
        var e = en[i] || {};
        var children = [];
        var zc = z.children || [];
        var ec = e.children || [];
        for (var j = 0; j < Math.max(zc.length, ec.length); j++) {
          children.push({
            title_zh: (zc[j] || {}).title || '',
            title_en: (ec[j] || {}).title || '',
            body_zh: (zc[j] || {}).body || '',
            body_en: (ec[j] || {}).body || '',
            link: (zc[j] || ec[j] || {}).link || ''
          });
        }
        resourceDetails.push({
          title_zh: z.title || '',
          title_en: e.title || '',
          desc_zh: z.body || '',
          desc_en: e.body || '',
          link_zh: z.link || '',
          link_en: e.link || '',
          children: children
        });
      }
    }).catch(function () { resourceDetails.length = 0; });
  }

  function renderResourceList() {
    var listEl = document.getElementById('resource-list');
    if (!listEl || resourceDetails.length === 0) return;
    listEl.innerHTML = '';
    resourceDetails.forEach(function (r, i) {
      var li = document.createElement('li');
      li.className = 'detail-item';
      li.setAttribute('data-detail-type', 'resource');
      li.setAttribute('data-detail-id', i);
      var title = currentLang === 'zh' ? r.title_zh : r.title_en;
      var desc = currentLang === 'zh' ? r.desc_zh : r.desc_en;
      var link = currentLang === 'zh' ? r.link_zh : r.link_en;
      var aHref = link ? escapeHtml(link) : '#';
      var aExtra = link ? ' target="_blank" rel="noopener noreferrer"' : '';
      li.innerHTML = '<a href="' + aHref + '"' + aExtra + '>' + escapeHtml(title) + '</a><span class="resource-desc">' + escapeHtml(desc) + '</span>';
      listEl.appendChild(li);
    });
  }

  function loadAboutMe() {
    return Promise.all([
      fetch('data/about_me_ch.json').then(function (r) { return r.json(); }),
      fetch('data/about_me_eng.json').then(function (r) { return r.json(); })
    ]).then(function (arrs) {
      aboutMe.zh = arrs[0] || {};
      aboutMe.en = arrs[1] || {};
      var z = aboutMe.zh;
      var e = aboutMe.en;
      if (i18n && i18n.zh) {
        i18n.zh.name = z.name || i18n.zh.name;
        i18n.zh.title = z.title || i18n.zh.title;
        i18n.zh.org = z.org || i18n.zh.org;
      }
      if (i18n && i18n.en) {
        i18n.en.name = e.name || i18n.en.name;
        i18n.en.title = e.title || i18n.en.title;
        i18n.en.org = e.org || i18n.en.org;
      }
      newsDetails.length = 0;
      var nz = z.news || [];
      var ne = e.news || [];
      for (var i = 0; i < Math.max(nz.length, ne.length); i++) {
        var nzi = nz[i] || {};
        var nei = ne[i] || {};
        var children = [];
        var zc = nzi.children || [];
        var ec = nei.children || [];
        for (var j = 0; j < Math.max(zc.length, ec.length); j++) {
          children.push({
            title_zh: (zc[j] || {}).title || '',
            title_en: (ec[j] || {}).title || '',
            body_zh: (zc[j] || {}).body || '',
            body_en: (ec[j] || {}).body || ''
          });
        }
        var imgPath = (nei.image || '').trim();
        newsDetails.push({
          date: (nzi.date || nei.date || ''),
          title_zh: nzi.title || '',
          title_en: nei.title || '',
          body_zh: nzi.body || '',
          body_en: nei.body || '',
          image: imgPath || '',
          children: children
        });
      }
    }).catch(function () {
      aboutMe.zh = {};
      aboutMe.en = {};
      newsDetails.length = 0;
    });
  }

  function renderAboutMe() {
    var z = aboutMe.zh;
    var e = aboutMe.en;
    var nameEl = document.getElementById('about-name');
    var titleEl = document.getElementById('about-title');
    var orgLink = document.getElementById('about-org-link');
    if (nameEl) {
      nameEl.innerHTML = '<span class="lang-zh">' + escapeHtml(z.name || '') + '</span><span class="lang-en hidden">' + escapeHtml(e.name || '') + '</span>';
    }
    if (titleEl) {
      titleEl.innerHTML = '<span class="lang-zh">' + escapeHtml(z.title || '') + '</span><span class="lang-en hidden">' + escapeHtml(e.title || '') + '</span>';
    }
    if (orgLink) {
      orgLink.innerHTML = '<span class="lang-zh">' + escapeHtml(z.org || '') + '</span><span class="lang-en hidden">' + escapeHtml(e.org || '') + '</span>';
      orgLink.href = z.org_url || e.org_url || '#';
    }
    var links = z.links || e.links || {};
    document.querySelectorAll('.about-link[data-link]').forEach(function (a) {
      var key = a.getAttribute('data-link');
      if (links[key]) {
        a.href = links[key];
      }
    });
    var introZh = document.getElementById('about-intro-zh');
    var introEn = document.getElementById('about-intro-en');
    var interestsZh = document.getElementById('about-interests-zh');
    var interestsEn = document.getElementById('about-interests-en');
    if (introZh) introZh.textContent = z.intro || '';
    if (introEn) introEn.textContent = e.intro || '';
    if (interestsZh) interestsZh.textContent = z.interests || '';
    if (interestsEn) interestsEn.textContent = e.interests || '';
    var noticeList = document.getElementById('notice-list');
    if (noticeList) {
      var notices = z.notice || [];
      var noticesEn = e.notice || [];
      noticeList.innerHTML = '';
      for (var i = 0; i < Math.max(notices.length, noticesEn.length); i++) {
        var nz = notices[i] || {};
        var ne = noticesEn[i] || {};
        var art = document.createElement('article');
        art.className = 'notice-item';
        art.innerHTML = '<h3 class="notice-item-title lang-zh">' + escapeHtml(nz.title || '') + '</h3><h3 class="notice-item-title lang-en hidden">' + escapeHtml(ne.title || '') + '</h3><p class="notice-item-desc lang-zh">' + escapeHtml(nz.body || '') + '</p><p class="notice-item-desc lang-en hidden">' + escapeHtml(ne.body || '') + '</p>';
        noticeList.appendChild(art);
      }
    }
  }

  var NEWS_LIST_MAX = 5;

  function renderNewsTimeline() {
    var container = document.getElementById('news-timeline');
    if (!container) return;
    if (newsDetails.length === 0) return;
    var parent = container.parentNode;
    if (!parent) return;
    var wrap = document.createElement('div');
    wrap.className = 'news-timeline-wrap';
    wrap.id = 'news-timeline-wrap';
    var listEl = document.createElement('div');
    listEl.className = 'timeline';
    listEl.id = 'news-timeline';
    var toShow = newsDetails.slice(0, NEWS_LIST_MAX);
    toShow.forEach(function (n, i) {
      var art = document.createElement('article');
      art.className = 'timeline-item detail-item';
      art.setAttribute('data-detail-type', 'news');
      art.setAttribute('data-detail-id', i);
      var imgBlock = n.image ? '<div class="timeline-image"><img src="' + escapeHtml(n.image) + '" alt="' + escapeHtml(n.title_zh || n.title_en) + '" /></div>' : '';
      art.innerHTML = '<span class="timeline-date">' + escapeHtml(n.date) + '</span><div class="timeline-content"><p class="lang-zh">' + escapeHtml(n.body_zh || n.title_zh) + '</p><p class="lang-en hidden">' + escapeHtml(n.body_en || n.title_en) + '</p></div>' + imgBlock;
      listEl.appendChild(art);
    });
    wrap.appendChild(listEl);
    if (newsDetails.length > NEWS_LIST_MAX) {
      var moreWrap = document.createElement('div');
      moreWrap.className = 'news-more-wrap';
      var moreBtn = document.createElement('button');
      moreBtn.type = 'button';
      moreBtn.className = 'news-more-btn';
      moreBtn.setAttribute('data-i18n', 'view_more');
      moreBtn.textContent = i18n[currentLang].view_more || '查看更多 →';
      moreBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openNewsFullList();
      });
      moreWrap.appendChild(moreBtn);
      wrap.appendChild(moreWrap);
    }
    parent.replaceChild(wrap, container);
  }

  function openNewsFullList() {
    if (!overlay || !detailContent) return;
    var lang = currentLang;
    var html = '<div class="news-full-panel"><button type="button" class="detail-close news-full-close" aria-label="' + (lang === 'zh' ? '关闭' : 'Close') + '">×</button><h2 class="news-full-title">' + (lang === 'zh' ? '近期动态' : 'News') + '</h2><div class="news-full-list">';
    newsDetails.forEach(function (n, i) {
      var title = lang === 'zh' ? n.title_zh : n.title_en;
      var body = lang === 'zh' ? n.body_zh : n.body_en;
      var imgBlock = n.image ? '<div class="timeline-image"><img src="' + escapeHtml(n.image) + '" alt="' + escapeHtml(title) + '" /></div>' : '';
      html += '<article class="news-full-item detail-item" data-detail-type="news" data-detail-id="' + i + '"><span class="news-full-date">' + escapeHtml(n.date) + '</span><h3 class="news-full-item-title">' + escapeHtml(title) + '</h3><p class="news-full-item-body">' + escapeHtml(body) + '</p>' + imgBlock + '</article>';
    });
    html += '</div></div>';
    detailContent.innerHTML = html;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var closeBtn = detailContent.querySelector('.news-full-close');
    if (closeBtn) closeBtn.addEventListener('click', closeDetail);
    document.querySelectorAll('.news-full-item.detail-item').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var id = el.getAttribute('data-detail-id');
        if (id != null) {
          closeDetail();
          location.hash = 'news-' + id;
          overlay.classList.add('is-open');
          overlay.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
          renderDetail('news', parseInt(id, 10));
        }
      });
    });
  }

  function loadTeam() {
    return Promise.all([
      fetch('data/team_ch.json').then(function (r) { return r.json(); }),
      fetch('data/team_eng.json').then(function (r) { return r.json(); })
    ]).then(function (arrs) {
      var zh = arrs[0] || [];
      var en = arrs[1] || [];
      teamDetails.length = 0;
      for (var i = 0; i < Math.max(zh.length, en.length); i++) {
        var z = zh[i] || {};
        var e = en[i] || {};
        teamDetails.push({
          name_zh: z.name || '',
          name_en: e.name || '',
          role_zh: z.role || '',
          role_en: e.role || '',
          desc_zh: z.desc || '',
          desc_en: e.desc || '',
          photo: z.photo || e.photo || ''
        });
      }
    }).catch(function () { teamDetails.length = 0; });
  }

  function renderTeamPage() {
    var container = document.getElementById('team-content');
    if (!container) return;
    if (teamDetails.length === 0) {
      container.innerHTML = '<p class="team-building lang-zh">' + (i18n.zh.team_building || '团队建设中') + '</p><p class="team-building lang-en hidden">' + (i18n.en.team_building || 'Team under construction') + '</p>';
      return;
    }
    var ul = document.createElement('ul');
    ul.className = 'team-list';
    teamDetails.forEach(function (m) {
      var li = document.createElement('li');
      li.className = 'team-item';
      var photoHtml = m.photo
        ? '<img class="team-avatar" src="' + escapeHtml(m.photo) + '" alt="" />'
        : '<div class="team-avatar"></div>';
      li.innerHTML = photoHtml + '<div class="team-info"><strong><span class="lang-zh">' + escapeHtml(m.name_zh) + '</span><span class="lang-en hidden">' + escapeHtml(m.name_en) + '</span></strong><p class="team-role lang-zh">' + escapeHtml(m.role_zh) + '</p><p class="team-role lang-en hidden">' + escapeHtml(m.role_en) + '</p><p class="team-desc lang-zh">' + escapeHtml(m.desc_zh) + '</p><p class="team-desc lang-en hidden">' + escapeHtml(m.desc_en) + '</p></div>';
      ul.appendChild(li);
    });
    container.innerHTML = '';
    container.appendChild(ul);
  }

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
      if (aboutMe.zh.org_url || aboutMe.en.org_url) {
        orgLink.href = currentLang === 'zh' ? (aboutMe.zh.org_url || aboutMe.en.org_url || '#') : (aboutMe.en.org_url || aboutMe.zh.org_url || '#');
      } else {
        orgLink.href = currentLang === 'zh' ? 'https://jt.jlu.edu.cn/index.htm' : 'https://jt.jlu.edu.cn/en/index.htm';
      }
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
      if (r.children && r.children.length > 0) {
        html += '<div class="detail-children"><h3 class="detail-children-title">' + (lang === 'zh' ? '相关内容' : 'Related') + '</h3><ul class="detail-children-list">';
        r.children.forEach(function (ch) {
          var chTitle = lang === 'zh' ? ch.title_zh : ch.title_en;
          var chBody = lang === 'zh' ? ch.body_zh : ch.body_en;
          var chLink = ch.link ? '<a href="' + escapeHtml(ch.link) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(chTitle) + '</a>' : escapeHtml(chTitle);
          html += '<li class="detail-child-item"><strong>' + chLink + '</strong><p>' + escapeHtml(chBody) + '</p></li>';
        });
        html += '</ul></div>';
      }
    } else if (type === 'activity' && activityDetails[id]) {
      var a = activityDetails[id];
      var aTitle = lang === 'zh' ? a.title_zh : a.title_en;
      var aBody = lang === 'zh' ? a.body_zh : a.body_en;
      html = '<h2>' + escapeHtml(aTitle) + '</h2><p class="detail-meta">' + escapeHtml(a.date) + '</p><div class="detail-body">' + escapeHtml(aBody) + '</div>';
      if (a.children && a.children.length > 0) {
        html += '<div class="detail-children"><h3 class="detail-children-title">' + (lang === 'zh' ? '更多详情' : 'More details') + '</h3><ul class="detail-children-list">';
        a.children.forEach(function (ch) {
          var chTitle = lang === 'zh' ? ch.title_zh : ch.title_en;
          var chBody = lang === 'zh' ? ch.body_zh : ch.body_en;
          html += '<li class="detail-child-item"><strong>' + escapeHtml(chTitle) + '</strong><p>' + escapeHtml(chBody) + '</p></li>';
        });
        html += '</ul></div>';
      }
    } else if (type === 'news' && newsDetails[id]) {
      var n = newsDetails[id];
      var nTitle = lang === 'zh' ? n.title_zh : n.title_en;
      var nBody = lang === 'zh' ? n.body_zh : n.body_en;
      html = '<h2>' + escapeHtml(nTitle) + '</h2><p class="detail-meta">' + escapeHtml(n.date) + '</p><div class="detail-body">' + escapeHtml(nBody) + '</div>';
      if (n.children && n.children.length > 0) {
        html += '<div class="detail-children"><h3 class="detail-children-title">' + (lang === 'zh' ? '更多详情' : 'More details') + '</h3><ul class="detail-children-list">';
        n.children.forEach(function (ch) {
          var chTitle = lang === 'zh' ? ch.title_zh : ch.title_en;
          var chBody = lang === 'zh' ? ch.body_zh : ch.body_en;
          html += '<li class="detail-child-item"><strong>' + escapeHtml(chTitle) + '</strong><p>' + escapeHtml(chBody) + '</p></li>';
        });
        html += '</ul></div>';
      }
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
    if (type === 'gallery') {
      bindGalleryDetailActions();
      var wrap = detailContent.querySelector('.detail-gallery-image');
      var detailImg = wrap && wrap.querySelector('img');
      if (detailImg) {
        detailImg.onload = function () { setBackgroundFromImageEdge(detailImg, wrap); };
        if (detailImg.complete) setBackgroundFromImageEdge(detailImg, wrap);
      }
    }
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
    var link = e.target.closest('a[href]');
    if (link && link.getAttribute('href') && link.getAttribute('href').indexOf('http') === 0) return;
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

  setLang(currentLang);

  document.addEventListener('click', function (e) {
    if (e.target.closest('a.paper-action.pending')) e.preventDefault();
    if (e.target.closest('button.paper-action.pending')) e.preventDefault();
  });

  function bindPaperLikeButtons() {
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
  }

  loadPapers().then(function () {
    renderResearchPapers();
    applyPaperLinks();
    applyCitePending();
    setLang(currentLang);
    bindPaperLikeButtons();
  });

  loadActivities().then(function () {
    renderActivitiesTimeline();
    setLang(currentLang);
  });

  loadGallery().then(function () {
    renderGalleryGrid();
  });

  loadProjects().then(function () {
    renderProjectsPage();
    setLang(currentLang);
  });

  loadResources().then(function () {
    renderResourceList();
    setLang(currentLang);
  });

  loadAboutMe().then(function () {
    renderAboutMe();
    renderNewsTimeline();
    setLang(currentLang);
  });

  loadTeam().then(function () {
    renderTeamPage();
    setLang(currentLang);
  });
})();
