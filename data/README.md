# 数据文件夹 · 维护说明

本目录存放**所有需要你维护的内容数据**。网站会从这里自动读取并展示，无需改 HTML/JS。

## 文件一览

| 文件 | 用途 |
|------|------|
| **papers_eng.bib** / **papers_cn.bib** | 论文（工作概览 + 文章列表）。扩展字段：abstract、url、code、cover。引用按钮复制英文 BibTeX 并自动去掉上述扩展字段。 |
| **activities_ch.json** / **activities_eng.json** | 学术活动时间线。每项：`date`, `title`, `body`；可选 **`image`**（本地图片路径，**仅用于二级内容**：图片显示在活动介绍正文后面，不显示在三级卡片中；空或不写则不显示）；可选 **`children`**（三级子卡片，无图片字段）。children 每项：`title`, `body`。两文件顺序一致，children 条数、顺序一致。 |
| **projects_ch.json** / **projects_eng.json** | 研究项目列表。每项：`title`, `body`。两文件顺序一致。 |
| **resources_ch.json** / **resources_eng.json** | 开放资源（二级）。每项：`title`, `body`, `link`，可选 **children**（三级，点击资源后展开）。children 每项：`title`, `body`, `link`。 |
| **about_me_ch.json** / **about_me_eng.json** | 关于页与首页：`name`, `title`（职位）, `org`, `org_url`, `intro`（个人简介）, `interests`（研究兴趣）, `links`（email / linkedin / scholar / github / orcid）, `notice`（公告数组，每项 `title`, `body`）, **`news`**（近期动态数组）。每条动态：`date`, `title`, `body`；可选 **`image`**（本地图片路径，空则不显示，图片在时间线中显示在文字下方）；可选 **`children`**（三级子卡片）。children 每项：`title`, `body`。中英文两文件顺序一致，children 条数、顺序一致。 |
| **team_ch.json** / **team_eng.json** | 研究团队。每项：`name`, `role`, `desc`；可选 `photo`（头像图片路径）。**若两文件均为空数组 `[]`，页面显示「团队建设中」。** |
| **gallery_list.json** | 摄影集图片列表（由 `node scripts/build-gallery.js` 根据 `gallery/` 文件夹自动生成，也可手动编辑）。 |

## 图片与资源路径

- **论文配图**：放在站点根目录的 **paper_cover/** 下，在 papers_eng.bib 里用 `cover = {paper_cover/文件名}` 引用。
- **摄影集图片**：路径在 **gallery_list.json** 中，为相对站点根目录。运行 `node scripts/build-gallery.js` 会扫描根目录 **gallery/** 并生成路径如 `gallery/xxx.jpg`；若你手动编辑 JSON（如写 `images/gallery/xxx.jpg`），请确保该路径下确有文件，否则会渲染失败。
- **学术活动图片**：在 **activities_eng.json** 的每条 `image` 字段填写相对站点的路径（如 `images/activities/xxx.jpg`），图片放在站点根目录对应路径；留空则不显示。**图片路径只从英文 JSON 读取，中文 JSON 不参与。**
- **近期动态图片**：在 **about_me_eng.json** 的 `news` 每条的 `image` 字段填写相对站点的路径（如 `images/news/xxx.jpg`），图片在时间线中显示在文字下方；留空则不显示。**图片路径只从英文 JSON 读取，中文 JSON 不参与。**

## 中英文对应

所有 `*_ch.json` 与 `*_eng.json` 需**条目顺序一致**，网站按当前语言选择显示对应字段。
