# 个人主页 · 学者版

吉林大学交通学院 · 唐敖庆青年学者个人主页，中英双语，**分页设计**。

## 使用方式

用浏览器直接打开 `index.html` 即可本地预览。部署时把整个文件夹上传到任意静态空间（如 GitHub Pages、学校服务器）即可。

## 分页结构

| 页面 | 说明 |
|------|------|
| **index.html**（首页） | 关于（完整）+ 研究 / 学术动态 / 摄影集的**最新摘要**，每块带「查看更多」进入详细页 |
| **research.html** | 研究完整页：发表文章、研究项目、开放资源（标签切换） |
| **news.html** | 学术动态完整页：时间线列表 |
| **gallery.html** | 摄影集完整页：图片网格 |

顶部导航栏可随时点击进入对应详细页；首页下拉可看各板块最新内容，再点「查看更多」进入该板块完整页。语言选择会保存在浏览器中，切换页面后仍保持中/英。

## 如何修改内容（数据文件维护）

**所有需要维护的数据文件都放在 `data/` 文件夹**，网站会自动读取，无需改 HTML/JS。详见 **data/README.md**。

### 文件一览（均在 data/ 下）

| 文件 | 用途 |
|------|------|
| **papers_eng.bib** / **papers_cn.bib** | 论文（工作概览、文章列表、引用）。扩展字段：abstract、url、code、cover。引用按钮复制英文并去掉扩展字段。 |
| **activities_ch.json** / **activities_eng.json** | 学术活动。每项：`date`, `title`, `body`。 |
| **projects_ch.json** / **projects_eng.json** | 研究项目。每项：`title`, `body`。 |
| **resources_ch.json** / **resources_eng.json** | 开放资源（二级）。每项：`title`, `body`, `link`；可选 **children**（三级，点击后展开）。 |
| **about_me_ch.json** / **about_me_eng.json** | 关于 + 首页：姓名、职位、单位、各 icon 链接、个人简介、研究兴趣、公告、近期动态（news）。 |
| **team_ch.json** / **team_eng.json** | 研究团队。每项：`name`, `role`, `desc`；可选 `photo`。空则显示「团队建设中」。 |
| **gallery_list.json** | 摄影集列表（由脚本根据 gallery/ 生成，见下）。 |

### 摄影集图片

- 将图片放入根目录 **gallery/** 文件夹。
- 在项目根目录执行：**`node scripts/build-gallery.js`**，会在 **data/** 下生成/更新 **gallery_list.json**。新增或删除图片后重新运行一次即可。

### 其他（仍改页面或样式）

- **个人信息与简介、头像**：编辑 `index.html` 中「关于」区块；头像为 `about_me.jpg` 时已配置好。

## 语言切换

右上角「中 / EN」可切换中英文；需新增翻译时，在 `main.js` 的 `i18n.zh` 与 `i18n.en` 中补全对应键值即可。

## 配色说明

- 主色：深靛蓝（学术、稳重）
- 背景：米白 / 暖灰（类纸张）
- 点缀：古铜色（标题下划线、年份、时间线圆点）

如需调整颜色，可修改 `styles.css` 顶部的 `:root` 变量。
