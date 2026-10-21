# 如何上传和更新作品

这个主页把个人信息与作品列表集中在 `content/portfolio.ts`，以后不需要改页面结构。

## 添加真实作品

1. 把作品图片放进 `public/works/`。
2. 建议文件名使用英文小写和连字符，例如 `moon-garden.jpg`。
3. 打开 `content/portfolio.ts`，在 `works` 数组里添加或修改一项：

```ts
{
  slug: "moon-garden",
  title: "Moon Garden",
  titleZh: "月亮花园",
  year: "2026",
  medium: "DIGITAL ILLUSTRATION",
  alt: "蓝紫色月光下的植物与人物",
  image: "/works/moon-garden.jpg",
  artClass: "night",
  featured: true,
}
```

`image` 填写后，页面会自动用真实图片替换带有 `PLACEHOLDER` 标记的示例画面。

- `featured: true`：作品会出现在首页首屏，最多显示 4 件。
- `alt`：为看不到图片的访客描述画面，也是搜索引擎理解作品的依据。
- 建议使用 JPG、PNG 或 WebP；单张控制在 3 MB 以内。

## 修改姓名与联系方式

在同一个文件顶部的 `portfolio` 对象中，替换：

- `YOUR NAME / 你的名字`
- `YOUR CITY`
- `hello@yourname.art`
- 艺术家简介、合作类型与联系文案

更新后提交到 GitHub，主页即可重新发布。

## 展示与下载水印

`public/works/` 保留无水印原图。运行开发服务器或构建网站时，
`scripts/generate-download-images.mjs` 会自动生成 `public/downloads/` 下的下载副本，
在图片中央加入半透明、倾斜的 `yoauuki` 水印；不覆盖原图，也不改变尺寸。
生成文件不提交到 Git，GitHub Pages 构建时会重新生成。新增作品沿用同一流程即可。

页面上的轮播、Archive、项目介绍与全屏浏览显示无水印原图。
透明的下载图片层接收常规右键或长按保存操作；全屏右上角也提供带水印下载按钮。
手机浏览器的长按菜单与保存行为可能不同，下载按钮是明确的保存入口。

这是保存行为的引导，不能防止截图、开发者工具或直接访问公开的无水印原图地址。
静态网站无法保证所有提取图片的方式都带水印。
