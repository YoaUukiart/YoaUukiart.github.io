/**
 * 主页内容都集中在这里。
 * 把城市、邮箱和简介替换成你的真实信息即可。
 * 上传作品的方法见项目根目录 ARTWORKS.md。
 */
export const portfolio = {
  name: "YoaUuki",
  year: "2026",
  range: "2024—2026",
  eyebrow: "ILLUSTRATION ARTIST · BASED IN CHINA",
  headline: "YoaUuki’s Illustration Collection",
  intro:
    "以植物、梦境与城市碎片为线索，记录那些介于真实与虚构之间的瞬间。",
  aboutTitle: "我把稍纵即逝的感受，变成可以停留的图像。",
  about: [
    "这是一段可替换的艺术家简介。你可以在这里介绍自己的创作媒介、长期关注的主题，以及作品希望与观众建立怎样的联系。",
    "我的创作从日常观察出发，在柔软的色彩、植物形态与叙事碎片之间，寻找一种既安静又充满生命力的视觉语言。",
  ],
  facts: [
    { label: "BASED IN", value: "CHINA" },
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
  titleZh?: string;
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
    title: "Through my blood",
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

export const throughMyBloodProject = {
  slug: "through-my-blood",
  title: "Through my blood",
  year: "2026",
  medium: "Digital",
  description:
    "A series of ten digital paintings in which bodies, lilies and vine-like forms move across saturated fields of blue and red. Viewed as a sequence, the images connect touch, tension and transformation through a shared visual language.",
  works,
} as const;

export const addictedRedWorks: PortfolioWork[] = [
  {
    slug: "addicted-red-01",
    title: "Addicted red 01",
    year: "2026",
    medium: "DIGITAL PAINTING",
    alt: "Four mirrored figures in red dresses framed by green looping stems",
    image: "/works/addicted-red-01.jpg",
    artClass: "night",
    featured: true,
  },
  {
    slug: "addicted-red-02",
    title: "Addicted red 02",
    year: "2026",
    medium: "DIGITAL PAINTING",
    alt: "A braided figure in a red dress standing in a pastel dream landscape",
    image: "/works/addicted-red-02.jpg",
    artClass: "geometry",
    featured: true,
  },
  {
    slug: "addicted-red-03",
    title: "Addicted red 03",
    year: "2026",
    medium: "DIGITAL PAINTING",
    alt: "A figure in red seated above a glossy red sphere between giant eyes",
    image: "/works/addicted-red-03.jpg",
    artClass: "afternoon",
    featured: true,
  },
  {
    slug: "addicted-red-04",
    title: "Addicted red 04",
    year: "2026",
    medium: "DIGITAL PAINTING",
    alt: "Three intertwined figures in red dresses against a deep red field",
    image: "/works/addicted-red-04.jpg",
    artClass: "night",
    featured: true,
  },
  {
    slug: "addicted-red-05",
    title: "Addicted red 05",
    year: "2026",
    medium: "DIGITAL PAINTING",
    alt: "Figures in white dresses gather around black horses on a blue field",
    image: "/works/addicted-red-05.jpg",
    artClass: "geometry",
    featured: true,
  },
  {
    slug: "addicted-red-06",
    title: "Addicted red 06",
    year: "2026",
    medium: "DIGITAL PAINTING",
    alt: "Two figures in red dresses moving beneath looping green stems",
    image: "/works/addicted-red-06.jpg",
    artClass: "rain",
    featured: true,
  },
  {
    slug: "addicted-red-07",
    title: "Addicted red 07",
    year: "2026",
    medium: "DIGITAL PAINTING",
    alt: "A mirrored red-dressed figure surrounded by silver sculptural forms",
    image: "/works/addicted-red-07.jpg",
    artClass: "afternoon",
    featured: true,
  },
  {
    slug: "addicted-red-08",
    title: "Addicted red 08",
    year: "2026",
    medium: "DIGITAL PAINTING",
    alt: "Three red-dressed figures arranged inside a theatrical pink interior",
    image: "/works/addicted-red-08.jpg",
    artClass: "geometry",
    featured: true,
  },
  {
    slug: "addicted-red-09",
    title: "Addicted red 09",
    year: "2026",
    medium: "DIGITAL PAINTING",
    alt: "Two figures in luminous red dresses standing beneath falling ribbons",
    image: "/works/addicted-red-09.jpg",
    artClass: "night",
    featured: true,
  },
  {
    slug: "addicted-red-10",
    title: "Addicted red 10",
    year: "2026",
    medium: "DIGITAL PAINTING",
    alt: "Two red skirts and stepping legs towering above a miniature night town",
    image: "/works/addicted-red-10.jpg",
    artClass: "rain",
    featured: true,
  },
];

export const addictedRedProject = {
  slug: "addicted-red",
  title: "Addicted red",
  year: "2026",
  medium: "Digital painting",
  description:
    "A series of ten digital paintings shaped by red dresses, repeated bodies, mirrored gestures and theatrical spaces. Across the sequence, saturated colour and looping forms turn repetition into a visual rhythm of desire, performance and entanglement.",
  works: addictedRedWorks,
} as const;

export const transientSpaceWorks: PortfolioWork[] = [
  {
    slug: "transient-space-01",
    title: "Transient space 01",
    year: "2024-2025",
    medium: "WATERCOLOR ON PAPER",
    alt: "A green and blue architectural space filled with looping botanical lines",
    image: "/works/transient-space-01.jpg",
    artClass: "rain",
    featured: true,
  },
  {
    slug: "transient-space-02",
    title: "Transient space 02",
    year: "2024-2025",
    medium: "WATERCOLOR ON PAPER",
    alt: "White flowers and long green stems emerging through layered geometric forms",
    image: "/works/transient-space-02.jpg",
    artClass: "geometry",
    featured: true,
  },
  {
    slug: "transient-space-03",
    title: "Transient space 03",
    year: "2024-2025",
    medium: "WATERCOLOR ON PAPER",
    alt: "A dark suspended rectangular volume surrounded by vertical blue-green lines",
    image: "/works/transient-space-03.jpg",
    artClass: "night",
    featured: true,
  },
  {
    slug: "transient-space-04",
    title: "Transient space 04",
    year: "2024-2025",
    medium: "WATERCOLOR ON PAPER",
    alt: "A luminous green room containing hills, flowers and looping stems",
    image: "/works/transient-space-04.jpg",
    artClass: "afternoon",
    featured: true,
  },
  {
    slug: "transient-space-05",
    title: "Transient space 05",
    year: "2024-2025",
    medium: "WATERCOLOR ON PAPER",
    alt: "Eight green geometric boxes connected by winding architectural lines",
    image: "/works/transient-space-05.jpg",
    artClass: "geometry",
    featured: true,
  },
  {
    slug: "transient-space-06",
    title: "Transient space 06",
    year: "2024-2025",
    medium: "WATERCOLOR ON PAPER",
    alt: "An expansive grid of green folded spaces threaded with looping lines",
    image: "/works/transient-space-06.jpg",
    artClass: "rain",
    featured: true,
  },
  {
    slug: "transient-space-07",
    title: "Transient space 07",
    year: "2024-2025",
    medium: "WATERCOLOR ON PAPER",
    alt: "Stacked green structures and winding stems beneath a red circular sky",
    image: "/works/transient-space-07.jpg",
    artClass: "afternoon",
    featured: true,
  },
  {
    slug: "transient-space-08",
    title: "Transient space 08",
    year: "2024-2025",
    medium: "WATERCOLOR ON PAPER",
    alt: "A deep green angular interior crossed by long horizontal plant-like lines",
    image: "/works/transient-space-08.jpg",
    artClass: "night",
    featured: true,
  },
  {
    slug: "transient-space-09",
    title: "Transient space 09",
    year: "2024-2025",
    medium: "WATERCOLOR ON PAPER",
    alt: "Two transparent geometric vessels holding layered organic green forms",
    image: "/works/transient-space-09.jpg",
    artClass: "geometry",
    featured: true,
  },
  {
    slug: "transient-space-10",
    title: "Transient space 10",
    year: "2024-2025",
    medium: "WATERCOLOR ON PAPER",
    alt: "A yellow and green room framing a red basin and three white flowers",
    image: "/works/transient-space-10.jpg",
    artClass: "afternoon",
    featured: true,
  },
];

export const transientSpaceProject = {
  slug: "transient-space",
  title: "Transient space",
  year: "2024-2025",
  medium: "Watercolor on paper",
  description:
    "A series of ten watercolours on paper exploring temporary architectures, looping botanical lines and shifting geometric enclosures. Green, blue and luminous yellow spaces hover between interior, landscape and remembered place.",
  works: transientSpaceWorks,
} as const;

export const projects = [
  throughMyBloodProject,
  addictedRedProject,
  transientSpaceProject,
] as const;
