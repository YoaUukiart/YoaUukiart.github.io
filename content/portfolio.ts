/**
 * 主页内容都集中在这里。
 * 把城市、邮箱和简介替换成你的真实信息即可。
 * 上传作品的方法见项目根目录 ARTWORKS.md。
 */
export const portfolio = {
  name: "YoaUuki",
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
    slug: "digital-painting-01",
    title: "Digital Painting 01",
    titleZh: "数字绘画 01",
    year: "2026",
    medium: "DIGITAL PAINTING",
    alt: "蓝色背景中，双手、白色百合与绿色枝叶交织",
    image: "/works/digital-painting-01.jpg",
    artClass: "night",
    featured: true,
  },
  {
    slug: "digital-painting-02",
    title: "Digital Painting 02",
    titleZh: "数字绘画 02",
    year: "2026",
    medium: "DIGITAL PAINTING",
    alt: "红色背景中，被绿色藤蔓缠绕的白色人物躯干",
    image: "/works/digital-painting-02.jpg",
    artClass: "geometry",
    featured: true,
  },
  {
    slug: "digital-painting-03",
    title: "Digital Painting 03",
    titleZh: "数字绘画 03",
    year: "2026",
    medium: "DIGITAL PAINTING",
    alt: "红色背景中，两个人物侧脸由绿色植物线条连接",
    image: "/works/digital-painting-03.jpg",
    artClass: "rain",
    featured: true,
  },
  {
    slug: "digital-painting-04",
    title: "Digital Painting 04",
    titleZh: "数字绘画 04",
    year: "2026",
    medium: "DIGITAL PAINTING",
    alt: "蓝色背景中，双臂、双手、百合与绿色叶片向下延伸",
    image: "/works/digital-painting-04.jpg",
    artClass: "afternoon",
    featured: true,
  },
  {
    slug: "digital-painting-05",
    title: "Digital Painting 05",
    titleZh: "数字绘画 05",
    year: "2026",
    medium: "DIGITAL PAINTING",
    alt: "蓝色背景中，交叠的手足与成簇白色百合",
    image: "/works/digital-painting-05.jpg",
    artClass: "night",
    featured: true,
  },
  {
    slug: "digital-painting-06",
    title: "Digital Painting 06",
    titleZh: "数字绘画 06",
    year: "2026",
    medium: "DIGITAL PAINTING",
    alt: "蓝紫色背景中，人物拥抱花束，深绿色叶片环绕身体",
    image: "/works/digital-painting-06.jpg",
    artClass: "geometry",
    featured: true,
  },
  {
    slug: "digital-painting-07",
    title: "Digital Painting 07",
    titleZh: "数字绘画 07",
    year: "2026",
    medium: "DIGITAL PAINTING",
    alt: "蓝色背景中，蜷坐的人物肩头盛开白色百合",
    image: "/works/digital-painting-07.jpg",
    artClass: "rain",
    featured: true,
  },
  {
    slug: "digital-painting-08",
    title: "Digital Painting 08",
    titleZh: "数字绘画 08",
    year: "2026",
    medium: "DIGITAL PAINTING",
    alt: "蓝色渐变背景中，一只手托起白色百合",
    image: "/works/digital-painting-08.jpg",
    artClass: "afternoon",
    featured: true,
  },
  {
    slug: "digital-painting-09",
    title: "Digital Painting 09",
    titleZh: "数字绘画 09",
    year: "2026",
    medium: "DIGITAL PAINTING",
    alt: "蓝色渐变背景中，白色裙装、双腿、百合与紫色缎带",
    image: "/works/digital-painting-09.jpg",
    artClass: "night",
    featured: true,
  },
  {
    slug: "digital-painting-10",
    title: "Digital Painting 10",
    titleZh: "数字绘画 10",
    year: "2026",
    medium: "DIGITAL PAINTING",
    alt: "蓝色背景中，人物侧脸靠近盛开的白色百合",
    image: "/works/digital-painting-10.jpg",
    artClass: "geometry",
    featured: true,
  },
];
