# 梦境花园 · 插画艺术家主页

一个为插画艺术家设计的双语作品集主页。视觉方向采用深紫夜色、漂浮画作与柔和星轨，支持桌面和手机浏览。

## 你需要修改的内容

个人信息和作品数据都在 [`content/portfolio.ts`](content/portfolio.ts)：

- 艺术家名称当前设置为 `YoaUuki`。
- 修改所在城市、邮箱、艺术家简介与合作类型。
- 按照 [`ARTWORKS.md`](ARTWORKS.md) 上传真实作品。

带有 `PLACEHOLDER` 标记的抽象画面只是占位，不代表艺术家的真实作品。

## 本地预览

需要 Node.js 22.13 或更新版本：

```bash
npm install
npm run dev
```

打开终端显示的本地地址。

## 发布到 GitHub Pages

项目包含自动发布工作流。推送到 `main` 分支后：

1. 打开仓库的 **Settings → Pages**。
2. 在 **Build and deployment → Source** 中选择 **GitHub Actions**。
3. 等待 **Actions** 页面中的部署完成。

以后更新作品并推送到 `main`，网站会自动重新发布。

## 构建

```bash
npm run build
```

GitHub Pages 使用静态导出：

```bash
GITHUB_PAGES=true GITHUB_REPOSITORY=your-name/repository-name npm run build:pages
```
