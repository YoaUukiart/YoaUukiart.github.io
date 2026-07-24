/**
 * 主页内容都集中在这里。
 * 把 YOUR NAME、城市、邮箱和简介替换成你的真实信息即可。
 * 上传作品的方法见项目根目录 ARTWORKS.md。
 */
export const portfolio = {
  name: "YOUR NAME / 你的名字",
  year: "2026",
  range: "2024—2026",
  eyebrow: "ILLUSTRATION ARTIST · BASED IN YOUR CITY",
  headline: "为日常造一座想象的花园",
  intro:
    "以植物、梦境与城市碎片为线索，记录那些介于真实与虚构之间的瞬间。",
  aboutTitle: "我把稍纵即逝的感受，变成可以停留的图像。",
  about: [
    "这是一段可替换的艺术家简介。你可以在这里介绍自己的创作媒介、长期关注的主题，以及作品希望与观众建立怎样的联系。",
    "我的创作从日常观察出发，在柔软的色彩、植物形态与叙事碎片之间，寻找一种既安静又充满生命力的视觉语言。",
  ],
  facts: [
    { label: "BASED IN", value: "YOUR CITY" },
    { label: "WORKING WITH", value: "EDITORIAL · BOOKS · BRAND" },
    { label: "AVAILABLE FOR", value: "COMMISSIONS · COLLABORATIONS" },
  ],
  contactTitle: "让我们一起种下一个新故事。",
  contactText:
    "欢迎联系插画委托、出版合作、品牌项目与展览邀请。请把项目时间与简单需求写在邮件里。",
  email: "hello@yourname.art",
} as const;

export type PortfolioWork = {
  slug: string;
  title: string;
  titleZh: string;
  year: string;
  medium: string;
  alt: string;
  image?: string;
  artClass: "night" | "geometry" | "rain" | "afternoon";
  featured?: boolean;
};

/**
 * image 留空时显示带 PLACEHOLDER 标记的示例画面。
 * 上传真实作品后填写类似：image: "/works/my-artwork.jpg"
 */
export const works: PortfolioWork[] = [
  {
    slug: "night-garden",
    title: "Night Garden",
    titleZh: "夜之花园",
    year: "2026",
    medium: "DIGITAL ILLUSTRATION",
    alt: "夜色花园中的月亮与发光植物",
    artClass: "night",
    featured: true,
  },
  {
    slug: "soft-geometry",
    title: "Soft Geometry",
    titleZh: "柔软几何",
    year: "2026",
    medium: "MIXED MEDIA",
    alt: "粉紫与青绿色构成的柔软几何",
    artClass: "geometry",
    featured: true,
  },
  {
    slug: "rain-collector",
    title: "Rain Collector",
    titleZh: "收集雨的人",
    year: "2025",
    medium: "DIGITAL ILLUSTRATION",
    alt: "雨幕下收集雨水的人物",
    artClass: "rain",
    featured: true,
  },
  {
    slug: "the-long-afternoon",
    title: "The Long Afternoon",
    titleZh: "漫长午后",
    year: "2025",
    medium: "EDITORIAL ILLUSTRATION",
    alt: "暖色午后与安静人物",
    artClass: "afternoon",
    featured: true,
  },
];
