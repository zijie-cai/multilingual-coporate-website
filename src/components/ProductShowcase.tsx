import { motion, AnimatePresence, useInView } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import LanguageSwitchBoundary from './LanguageSwitchBoundary';

interface ProductShowcaseProps {
  lang: 'en' | 'ja' | 'zh';
}

interface Product {
  titleJa: string;
  titleEn: string;
  titleZh: string;
  scope: string;
  scopeJa: string;
  scopeZh: string;
  description: string;
  descriptionJa: string;
  descriptionZh: string;
  images: string[];
  tags: string[];
  tagsJa?: string[];
  tagsZh?: string[];
}

const products: Product[] = [
  {
    titleJa: "砥石",
    titleEn: "Grinding Wheels",
    titleZh: "砂轮",
    scope: "Materials & Consumables",
    scopeJa: "材料・消耗品",
    scopeZh: "材料与耗材",
    description: "Grinding wheels are composed of three elements: abrasive grains, bond, and pores. They are manufactured by four methods: vitrified (V), resinoid (B), rubber (R), and magnesia (Mg). According to the application, the optimal abrasive and method are selected to grind, polish, and cut—primarily in metalworking. Grinding wheels are used widely across core industries such as steel, shipbuilding, construction, automotive, bearing, electrical, and machinery, underpinning manufacturing.",
    descriptionJa: "研削砥石は、砥粒（グレーン）、結合材（ボンド）、気孔（ボア）の3要素で構成されています。製法は4種類あり、ビトリファイド法（V）、レジノイド法（B）、ゴム法（R）、マグネシア法（Mg）に分かれます。用途に応じて最適な砥粒・製法を選択し、『削る・磨く・切る』といった主に金属加工分野で使用されます。砥石は鉄鋼、造船、建設、自動車、ベアリング、電気、機械など基幹産業の広い分野で用いられ、“ものづくり”を下支えしています。",
    descriptionZh: "研磨砂轮由三要素构成：磨粒、结合剂、气孔。制造方法有四种：陶瓷（V）、树脂（B）、橡胶（R）和镁（Mg）。根据用途选择合适的磨粒与工法，用于“磨、抛、切”，主要应用于金属加工领域。砂轮广泛应用于钢铁、造船、建筑、汽车、轴承、电气、机械等基础产业，支撑着制造业。",
    images: [
      "/multilingual-coporate-website/products/grinding-wheels-1.png",
      "/multilingual-coporate-website/products/grinding-wheels-2.png",
      "/multilingual-coporate-website/products/grinding-wheels-3.png",
      "/multilingual-coporate-website/products/grinding-wheels-4.png"
    ],
    tags: ["PVA", "FBB", "Ito Buff", "UB", "Centerless UB", "PVA Wheel Buff"],
    tagsJa: ["PVA", "FBB", "イトバフ", "UB砥石", "センターレスUB", "PVAホイールバフ"],
    tagsZh: ["PVA", "FBB", "Ito Buff", "UB砂轮", "无心UB砂轮", "PVA抛光轮"]
  },
  {
    titleJa: "難燃剤",
    titleEn: "Flame Retardant",
    titleZh: "阻燃剂",
    scope: "Materials & Consumables",
    scopeJa: "材料・消耗品",
    scopeZh: "材料与耗材",
    description: "Flame retardants are additives used to make combustible materials such as plastics, rubber, fibers, paper, and wood more resistant to ignition and to prevent flame spread. Halogenated compounds are commonly used, alongside phosphorus- and nitrogen-based systems.",
    descriptionJa: "難燃剤（Flame Retardant）とは、プラスチック・ゴム・繊維・紙・木材などの可燃性の素材に添加してそれらを燃えにくくし、あるいは炎が広がらないようにする薬剤です。主にハロゲン化合物が用いられます。",
    descriptionZh: "难燃剂（Flame Retardant）是一类添加剂，添加到塑料、橡胶、纤维、纸张、木材等可燃材料中，使其不易着火或抑制火焰蔓延。常用的是卤系化合物，也包含磷系、氮系体系。",
    images: [
      "https://images.unsplash.com/photo-1760907217271-00728f049547?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbGFtZSUyMHJldGFyZGFudCUyMGNoZW1pY2FsfGVufDF8fHx8MTc2MTMyNzc3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVtaWNhbCUyMGxhYiUyMGdsYXNzd2FyZXxlbnwxfHx8fDE3NjEzMjc3Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1709296167942-799280f2a55c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVtaWNhbCUyMHBvd2RlciUyMGxhYm9yYXRvcnl8ZW58MXx8fHwxNzYxMzI4MTMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1705247086319-e42324391db8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZldHklMjBjaGVtaWNhbCUyMGNvbnRhaW5lcnN8ZW58MXx8fHwxNzYxMzI4MTMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    tags: ["APP", "APP-XG", "MC", "PNP", "PNA", "PNA220", "ES", "TRIS"],
    tagsJa: ["APP", "APP-XG", "MC", "PNP", "PNA", "PNA220", "ES", "TRIS"],
    tagsZh: ["APP", "APP-XG", "MC", "PNP", "PNA", "PNA220", "ES", "TRIS"]
  },
  {
    titleJa: "化学製品",
    titleEn: "Chemical Products",
    titleZh: "化学产品",
    scope: "Materials & Consumables",
    scopeJa: "材料・消耗品",
    scopeZh: "材料与耗材",
    description: "Acetylacetone (CAS 123-54-6, C5H8O2) is a clear, flammable keto–enol liquid that dissolves in water and organics and forms stable metal chelates. Uses include heterocycle synthesis, catalyst precursors (metal acac), extraction/chelation, anti‑corrosion, radical initiators, and intermediates for pharmaceuticals, vitamin B6/K, and pesticides.",
    descriptionJa: "アセチルアセトン（CAS 123-54-6、C5H8O2）は、ケト–エノール互変を示す無色可燃性液体で、水や有機溶媒に溶解し、金属と安定なキレートを形成します。用途：複素環合成、金属アセチルアセトナトの触媒前駆体、抽出／キレート、防錆、重合開始剤、医薬・ビタミンB6／K・農薬の中間体。",
    descriptionZh: "乙酰丙酮（CAS 123-54-6，C5H8O2）为无色易燃液体，具酮–烯醇互变，溶于水及多种有机溶剂，并与金属形成稳定螯合物。用途：杂环合成、金属乙酰丙酮酸盐催化剂前体、萃取/螯合、防腐、聚合引发剂，以及医药、维生素B6/K 与农药的中间体。",
    images: [
      "/multilingual-coporate-website/products/chemical-1.png",
      "/multilingual-coporate-website/products/chemical-2.png",
      "/multilingual-coporate-website/products/chemical-3.png",
      "/multilingual-coporate-website/products/chemical-4.png"
    ],
    tags: [
      "Acetylacetone",
      "CAS 123-54-6",
      "C5H8O2",
      "Chelation",
      "Catalyst",
      "Intermediate"
    ],
    tagsJa: [
      "アセチルアセトン",
      "CAS 123-54-6",
      "C5H8O2",
      "キレート",
      "触媒",
      "中間体"
    ],
    tagsZh: [
      "乙酰丙酮",
      "CAS 123-54-6",
      "C5H8O2",
      "螯合",
      "催化",
      "中间体"
    ]
  },
  {
    titleJa: "音響製品",
    titleEn: "Audio System",
    titleZh: "音响产品",
    scope: "Electronic Components",
    scopeJa: "電子部品",
    scopeZh: "电子元件",
    description: "Portable audio for everyday and travel use. Our Bluetooth 3.0 speakers pair quickly, and compact woofers deliver clear, room‑filling sound in a lightweight, durable body.",
    descriptionJa: "日常から旅先まで活躍するポータブルオーディオ。Bluetooth 3.0 による素早い接続と、小型ウーファーが軽量で堅牢なボディでクリアかつ広がりのある音を実現します。",
    descriptionZh: "适用于日常与出行的便携音响。Bluetooth 3.0 快速连接，小型低音单元在轻巧坚固的机身中带来清晰且充盈的声音。",
    images: [
      "https://images.unsplash.com/photo-1755625655404-ddabb0d3004f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdWRpbyUyMGNvbm5lY3RvcnMlMjBlbGVjdHJvbmljc3xlbnwxfHx8fDE3NjEzMjc3NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "/multilingual-coporate-website/products/audio-1.png",
      "/multilingual-coporate-website/products/audio-2.png",
      "/multilingual-coporate-website/products/audio-3.png"
    ],
    tags: ["BEYO", "BEMINE", "BELOVE", "Bluetooth 3.0", "PortableSpeaker", "Woofer"],
    tagsJa: ["BEYO", "BEMINE", "BELOVE", "Bluetooth 3.0", "ポータブルスピーカー", "ウーファー"],
    tagsZh: ["BEYO", "BEMINE", "BELOVE", "蓝牙3.0", "便携音箱", "低音单元"]
  },
  {
    titleJa: "プレスプレート / 研磨",
    titleEn: "Press Plate / Polishing",
    titleZh: "压板 / 抛光",
    scope: "Optical Glass & Filters",
    scopeJa: "光学ガラス・フィルター",
    scopeZh: "光学玻璃与滤光片",
    description: "Press plates for phenolic/epoxy CCL and multilayer PCB lamination. Thickness 1.0–2.0 mm (±0.1), max 1,270 × 3,200 mm; flatness 2/3/5 mm (jig plates 0.5/1). Finishes: No.6/6M/8M. Drilling tolerances: hole Ø to ±0.01 mm; pitch ±0.025/±0.050 mm. Grades: 304 1/4H (HV ≥ 275), 301 1/2H (HV ≥ 330), 301H/630H (HV ≥ 430). Polished stainless (mirror, vibration) supported.",
    descriptionJa: "フェノール系／エポキシ系CCLおよび多層PCBラミネーション用プレスプレート。板厚1.0～2.0mm（許容差±0.1）、最大1,270×3,200mm、平坦度2/3/5mm（治具板0.5/1）。仕上げ：No.6／6M／8M。穴径公差±0.01mm、ピッチ±0.025／±0.050mm。材質：304 1/4H（HV≥275）、301 1/2H（HV≥330）、301H／630H（HV≥430）。鏡面・バイブレーション仕上げの研磨ステンレスにも対応。",
    descriptionZh: "用于酚醛/环氧CCL 与多层PCB 层压的压板。厚度1.0–2.0 mm（公差±0.1），最大1,270×3,200 mm；平整度2/3/5 mm（治具板0.5/1）。表面：No.6/6M/8M。孔径精度至±0.01 mm，孔距±0.025/±0.050 mm。材质：304 1/4H（HV ≥ 275）、301 1/2H（HV ≥ 330）、301H/630H（HV ≥ 430）。支持镜面、振纹等抛光不锈钢。",
    images: [
      "/multilingual-coporate-website/products/press-1.png",
      "/multilingual-coporate-website/products/press-2.png",
      "/multilingual-coporate-website/products/press-3.png",
      "/multilingual-coporate-website/products/press-4.png"
    ],
    tags: ["PressPlate", "PCB", "CCL", "No.6", "Mirror", "Vibration"],
    tagsJa: ["プレスプレート", "PCB", "CCL", "No.6", "鏡面", "バイブレーション"],
    tagsZh: ["压板", "PCB", "CCL", "No.6", "镜面", "振纹"]
  },
  {
    titleJa: "ガラス加工",
    titleEn: "Glass Processing",
    titleZh: "玻璃加工",
    scope: "Optical Glass & Filters",
    scopeJa: "光学ガラス・フィルター",
    scopeZh: "光学玻璃与滤光片",
    description: "End‑to‑end glass processing for optical/semiconductor parts — from external shaping to grinding, lapping, polishing, and vacuum thin‑film deposition. Materials: optical/specialty glass, quartz, sapphire, etc.",
    descriptionJa: "光学・半導体向けガラス部品を、外形加工から研削・ラップ・ポリッシング、真空蒸着薄膜まで一貫対応。材料：光学ガラス・各種特殊ガラス・水晶・石英・サファイア等。",
    descriptionZh: "面向光学/半导体的玻璃部件一体化加工：外形加工、研削、研磨/抛光、真空蒸镀薄膜等。材料涵盖光学玻璃、特种玻璃、水晶、石英、蓝宝石等。",
    images: [
      "/multilingual-coporate-website/products/glass-1.png",
      "https://images.unsplash.com/photo-1666868446465-0dc784d17e83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcHRpY2FsJTIwZ2xhc3MlMjBsZW5zfGVufDF8fHx8MTc2MDI3NjEwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "/multilingual-coporate-website/products/glass-2.png",
      "https://images.unsplash.com/photo-1760294300835-a531d4e0c63d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcHRpY2FsJTIwbGVucyUyMGFycmF5fGVufDF8fHx8MTc2MTMyODEzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    tags: ["OpticalGlass", "Quartz", "Sapphire", "Grinding", "Polishing", "VacuumDeposition"],
    tagsJa: ["光学ガラス", "石英", "サファイア", "研削", "ポリッシング", "真空蒸着"],
    tagsZh: ["光学玻璃", "石英", "蓝宝石", "研削", "抛光", "真空蒸镀"]
  },
  {
    titleJa: "精密プレス・ラッピング",
    titleEn: "Precision Press & Lapping",
    titleZh: "精密冲压与研磨",
    scope: "Machined Parts",
    scopeJa: "機械加工部品",
    scopeZh: "机械加工零件",
    description: "In‑house die design with engineers overseeing die build and press‑part QC through start of mass production. Capabilities include high/low‑speed press, progressive/drawing dies, in‑die lamination (motor cores), injection/insert molding, and micron‑level double‑side lapping for metal/plastic parts.",
    descriptionJa: "金型設計は社内で行い、設計技術者が金型製作およびプレス品の品質管理を量産立上げまで一貫担当。低速～高速プレス、順送・絞り金型、金型内積層（モーターコア）、射出・インサート成形、金属／樹脂部品のミクロン級両面ラップまで対応。",
    descriptionZh: "模具设计由公司内部完成，工程师负责从制模到量产导入的冲压件质量管理。能力涵盖低/高速冲压、级进/深拉模、模内叠片（电机铁芯）、注塑/嵌件成型，以及金属/塑料零件的微米级双面研磨。",
    images: [
      "/multilingual-coporate-website/products/precision-1.png",
      "/multilingual-coporate-website/products/precision-2.png",
      "/multilingual-coporate-website/products/precision-3.png",
      "/multilingual-coporate-website/products/precision-4.png"
    ],
    tags: [
      "PrecisionPress",
      "DieDesign",
      "ProgressiveDie",
      "InDieLamination",
      "MotorCore",
      "DoubleSideLapping"
    ],
    tagsJa: [
      "精密プレス",
      "金型設計",
      "順送金型",
      "金型内積層",
      "モーターコア",
      "両面ラップ"
    ],
    tagsZh: [
      "精密冲压",
      "模具设计",
      "级进模",
      "模内叠片",
      "电机铁芯",
      "双面研磨"
    ]
  },
  {
    titleJa: "機械加工",
    titleEn: "Machine Processing",
    titleZh: "机械加工",
    scope: "Machined Parts",
    scopeJa: "機械加工部品",
    scopeZh: "机械加工零件",
    description: "Precision part machining across many materials and industries. Capabilities: precision cutting, hard turning, thin‑wall, one‑chuck/burr‑less, special gears, transfer‑press draw parts, and more.",
    descriptionJa: "多品種・多業種の精密部品加工に対応。精密切削、ハードターニング、薄肉、ワンチャック／バリレス、特殊歯車、トランスファープレス絞りなどに対応。",
    descriptionZh: "面向多品类、多行业的精密零件加工。能力涵盖精密切削、硬车、薄壁、一夹持/去毛刺、特殊齿轮、转移冲压深拉等。",
    images: [
      "/multilingual-coporate-website/products/machine-1.png",
      "/multilingual-coporate-website/products/machine-2.png",
      "https://images.unsplash.com/photo-1701448149957-b96dbd1926ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDTkMlMjBtaWxsaW5nJTIwb3BlcmF0aW9ufGVufDF8fHx8MTc2MTMyODEzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1758873263563-5ba4aa330799?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVjaXNpb24lMjBtYW51ZmFjdHVyaW5nJTIwd29ya3Nob3B8ZW58MXx8fHwxNzYxMzI4MTM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    tags: ["PrecisionMachining", "HardTurning", "ThinWall", "OneChuck", "Burrless", "SpecialGears"],
    tagsJa: ["精密加工", "ハードターニング", "薄肉", "ワンチャック", "バリレス", "特殊歯車"],
    tagsZh: ["精密加工", "硬车", "薄壁", "一夹持", "去毛刺", "特殊齿轮"]
  }
];

const titles = {
  en: { main: "Product Categories", subtitle: "WHAT WE OFFER" },
  ja: { main: "製品カテゴリー", subtitle: "取扱製品" },
  zh: { main: "产品类别", subtitle: "我们提供的产品" }
};

// Shared section header animation (matches AboutSection)
const sectionHeaderVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export default function ProductShowcase({ lang }: ProductShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState(0);
  const ref = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.2 });
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeProduct = products[activeCategory];

  const getTitle = (product: Product) => {
    if (lang === 'ja') return product.titleJa;
    if (lang === 'zh') return product.titleZh;
    return product.titleEn;
  };

  const getScope = (product: Product) => {
    if (lang === 'ja') return product.scopeJa;
    if (lang === 'zh') return product.scopeZh;
    return product.scope;
  };

  const getDescription = (product: Product) => {
    if (lang === 'ja') return product.descriptionJa;
    if (lang === 'zh') return product.descriptionZh;
    return product.description;
  };

  // Localized offerings list for Grinding Wheels (first product)
  const getOfferings = (): string[] => {
    if (activeCategory !== 0) return [];
    if (lang === 'ja') {
      return ['PVA', 'FBB', 'イトバフ', 'UB砥石', 'センターレスUB砥石', 'PVAホイールバフ'];
    }
    if (lang === 'zh') {
      return ['PVA', 'FBB', 'Ito Buff', 'UB砂轮', '无心UB砂轮', 'PVA抛光轮'];
    }
    return ['PVA', 'FBB', 'Ito Buff', 'UB Grinding Wheel', 'Centerless UB Grinding Wheel', 'PVA Wheel Buff'];
  };

  // Map canonical tag tokens to localized labels
  const tagLabel = (token: 'pva' | 'ub' | 'abrasives' | 'polishing' | 'grinding') => {
    if (lang === 'ja') {
      switch (token) {
        case 'pva': return 'PVA';
        case 'ub': return 'UB';
        case 'abrasives': return '研磨材';
        case 'polishing': return 'ポリッシング';
        case 'grinding': return '研削';
      }
    }
    if (lang === 'zh') {
      switch (token) {
        case 'pva': return 'PVA';
        case 'ub': return 'UB';
        case 'abrasives': return '磨料';
        case 'polishing': return '抛光';
        case 'grinding': return '研磨';
      }
    }
    // default en
    switch (token) {
      case 'pva': return 'PVA';
      case 'ub': return 'UB';
      case 'abrasives': return 'Abrasives';
      case 'polishing': return 'Polishing';
      case 'grinding': return 'Grinding';
    }
  };

  // Localized offerings text for Flame Retardants (second product)
  const getFROfferingsText = (): string => {
    if (activeCategory !== 1) return '';
    if (lang === 'ja') {
      return '一木では、APPシリーズ（APP、APP101R、APP102、APP103N、APP104、APP104MF、APP300）、APP-XG、MCシリーズ（MC15、MC25、MC50、MC810）、PNPシリーズ（PNP1C、PNP1D、PNP2D、PNP3D）、PNAシリーズ（PNA、PNA350、PNA370、PNA660）、PNA220シリーズ（PNA220、PNA220-A、PNA220-M）、ESシリーズ（ES-10、ES-20、ES-30）、TRIS（FR-370）を提供しています。';
    }
    if (lang === 'zh') {
      return '在一木，我们提供 APP 系列（APP、APP101R、APP102、APP103N、APP104、APP104MF、APP300）、APP-XG、MC 系列（MC15、MC25、MC50、MC810）、PNP 系列（PNP1C、PNP1D、PNP2D、PNP3D）、PNA 系列（PNA、PNA350、PNA370、PNA660）、PNA220 系列（PNA220、PNA220-A、PNA220-M）、ES 系列（ES-10、ES-20、ES-30）及 TRIS（FR-370）。';
    }
    return 'At Ichiboku, we offer APP Series (APP, APP101R, APP102, APP103N, APP104, APP104MF, APP300), APP-XG, MC Series (MC15, MC25, MC50, MC810), PNP Series (PNP1C, PNP1D, PNP2D, PNP3D), PNA Series (PNA, PNA350, PNA370, PNA660), PNA220 Series (PNA220, PNA220-A, PNA220-M), ES Series (ES-10, ES-20, ES-30), and TRIS (FR-370).';
  };

  // Highlighted concluding sentence for Glass Processing (category 5)
  const getGlassHighlightText = (): string => {
    if (activeCategory !== 5) return '';
    if (lang === 'ja') return '国内は短納期・小ロット試作、中国は量産で、納期・品質・価格の最適条件をご提案します。';
    if (lang === 'zh') return '国内承接短交期小批试作，中国工厂承接量产，实现交期/品质/价格最优。';
    return 'We support fast prototypes and small lots domestically, and mass production in China to balance lead‑time, quality and cost.';
  };

  // Additional concluding highlight text for other categories (2,3,4,6,7)
  const getExtraHighlightText = (): string => {
    switch (activeCategory) {
      case 2: // Chemical Products
        if (lang === 'ja') return '一木では、アセチルアセトン（CAS 123‑54‑6）を安定品質・確実なリードタイムで供給します。';
        if (lang === 'zh') return '在一木，我们稳定供应乙酰丙酮（CAS 123‑54‑6），品质可靠、交期有保障。';
        return 'At Ichiboku, we supply Acetylacetone (CAS 123‑54‑6) with consistent quality and dependable lead‑times.';
      case 3: // Audio System
        if (lang === 'ja') return '一木では、BEYO・BEMINE・BELOVE のポータブルスピーカーを提供しています。';
        if (lang === 'zh') return '在一木，我们提供 BEYO、BEMINE、BELOVE 等便携音箱。';
        return 'At Ichiboku, we offer BEYO, BEMINE and BELOVE portable speakers.';
      case 4: // Press Plate / Polishing
        if (lang === 'ja') return '一木では、CCL・多層PCB用プレスプレートを最適な納期・品質・価格で供給します。';
        if (lang === 'zh') return '在一木，我们以最优交期/品质/价格供应用于 CCL 与多层 PCB 的压板。';
        return 'At Ichiboku, we supply press plates for CCL and multilayer PCBs with optimal lead‑time, quality and cost.';
      case 6: // Precision Press & Lapping
        if (lang === 'ja') return '一木では、プレスのみ・ラップのみの案件も承り、中国工場の組立・両面ラップでコスト低減を実現します。';
        if (lang === 'zh') return '在一木，我们可仅承接冲压或研磨项目，并通过中国工厂的装配/双面研磨降低成本。';
        return 'At Ichiboku, we also accept press‑only or lapping‑only jobs and reduce cost via China assembly and double‑side lapping.';
      case 7: // Machine Processing
        if (lang === 'ja') return '一木では、要求に合わせた最適な材質・工程をご提案します。';
        if (lang === 'zh') return '在一木，我们根据您的需求提出最优材料与工艺路线。';
        return 'At Ichiboku, we propose optimal materials and machining routes tailored to your needs.';
      default:
        return '';
    }
  };

  // Localized tablist label
  const tablistLabel =
    lang === 'ja' ? '製品カテゴリー' : lang === 'zh' ? '产品类别' : 'Product categories';

  // Keyboard navigation for category tabs with roving tabindex + focus management
  const handleCategoryKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const total = products.length;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 700;
    const cols = isMobile ? 4 : total; // 2x4 on mobile, single-row on desktop

    const move = (newIndex: number) => {
      setActiveCategory(newIndex);
      // Move focus to the newly active tab
      if (typeof window !== 'undefined') {
        requestAnimationFrame(() => tabRefs.current[newIndex]?.focus());
      }
    };

    switch (e.key) {
      case 'ArrowRight':
      case 'Right':
        e.preventDefault();
        move((index + 1) % total);
        break;
      case 'ArrowLeft':
      case 'Left':
        e.preventDefault();
        move((index - 1 + total) % total);
        break;
      case 'ArrowDown':
      case 'Down':
        if (isMobile) {
          e.preventDefault();
          move(Math.min(index + cols, total - 1));
        }
        break;
      case 'ArrowUp':
      case 'Up':
        if (isMobile) {
          e.preventDefault();
          move(Math.max(index - cols, 0));
        }
        break;
      case 'Home':
        e.preventDefault();
        move(0);
        break;
      case 'End':
        e.preventDefault();
        move(total - 1);
        break;
      case 'Enter':
      case ' ': // Space
        e.preventDefault();
        setActiveCategory(index);
        break;
      default:
        break;
    }
  };

  // Persist active tab in session
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = window.sessionStorage.getItem('activeCategory');
    if (saved !== null) {
      const parsed = Number(saved);
      if (!Number.isNaN(parsed)) {
        const clamped = Math.min(products.length - 1, Math.max(0, parsed));
        if (clamped !== activeCategory) setActiveCategory(clamped);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.sessionStorage.setItem('activeCategory', String(activeCategory));
  }, [activeCategory]);

  return (
    <section
      ref={ref}
      id="products"
      aria-labelledby="products-heading"
      lang={lang}
      style={{
        backgroundColor: '#F5EDE3',
        padding: '4rem 1rem',
        boxSizing: 'border-box',
      }}
    >
      <div className="productshowcase-container">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <LanguageSwitchBoundary lang={lang}>
            {/* Subtitle */}
            <div
              className="font-['Roboto_Mono'] uppercase tracking-widest mb-4"
              style={{ fontSize: "0.875rem", color: "#5A1F1F" }}
            >
              {lang === "ja"
                ? "私たちの製品"
                : lang === "zh"
                ? "我们的产品"
                : "WHAT WE MAKE"}
            </div>
            {/* Main Header */}
            <h2
              className="font-['Playfair_Display']"
              id="products-heading"
              style={{ fontSize: "2.5rem", fontWeight: 600, color: "#1E1E1E" }}
            >
              {lang === "ja"
                ? "製品一覧"
                : lang === "zh"
                ? "产品一览"
                : "Our Products"}
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={headerInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-[2px] bg-[#5A1F1F] mx-auto mt-6"
              style={{ width: '80px', transformOrigin: 'center' }}
            />
          </LanguageSwitchBoundary>
        </motion.div>

        {/* Category Grid - Framer Motion shared highlight layout for smooth transitions */}
        <div
          className="product-labels-grid productshowcase-category-grid relative"
          role="tablist"
          aria-orientation="horizontal"
          aria-label={tablistLabel}
        >
          {products.map((product, index) => {
            const isActive = activeCategory === index;
            return (
              <motion.button
                type="button"
                ref={(el) => (tabRefs.current[index] = el)}
                key={`${lang}-${index}`}
                initial={{ opacity: 0, y: 30, scale: 0.9, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`product-label relative productshowcase-category-btn${isActive ? ' active' : ''}`}
                onClick={() => setActiveCategory(index)}
                style={{
                  border: isActive ? 'none' : '1px solid #D4C4B0',
                  outline: 'none',
                  zIndex: 1,
                  transition: 'color 0.15s ease, transform 0.1s ease',
                }}
                role="tab"
                aria-selected={isActive}
                aria-controls={`product-panel-${index}`}
                id={`product-tab-${index}`}
                aria-posinset={index + 1}
                aria-setsize={products.length}
                tabIndex={isActive ? 0 : -1}
                onKeyDown={(e) => handleCategoryKeyDown(e, index)}
              >
                {isActive && (
                  <motion.div
                    layoutId="categoryHighlight"
                    className="category-highlight absolute inset-0 rounded-[0.75rem]"
                    style={{
                      background: 'linear-gradient(135deg, #5A1F1F 0%, #7C3E3E 100%)',
                      boxShadow: '0 10px 30px -10px rgba(90,31,31,0.45), inset 0 1px 0 rgba(255,255,255,0.22)',
                      zIndex: 0,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 110,
                      damping: 20,
                      mass: 1,
                      restDelta: 0.001,
                    }}
                  />
                )}
                <div className="relative z-10 flex flex-col items-center justify-center">
                  {/* Number */}
                  <div
                    className="productshowcase-category-number"
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      marginBottom: '0.5rem',
                      color: isActive ? '#F5EDE3' : '#5A1F1F',
                      transition: 'color 0.15s ease',
                    }}
                  >
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                  {/* Title */}
                  <div
                    className="productshowcase-category-title"
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      lineHeight: 1.2,
                      color: isActive ? '#F5EDE3' : '#1E1E1E',
                      transition: 'color 0.15s ease',
                    }}
                  >
                    {lang === 'ja'
                      ? product.titleJa
                      : lang === 'zh'
                      ? product.titleZh
                      : product.titleEn}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Product Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${lang}-${activeCategory}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="productshowcase-card"
            style={{
              backgroundColor: '#F5EDE3',
              borderRadius: '1rem',
              overflow: 'hidden',
              marginTop: 0,
            }}
          >
            <div className="productshowcase-flexrow">
              {/* Image Gallery */}
              <motion.div
                className="product-collage productshowcase-gallery"
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* First image spans 2 columns */}
                <div className="productshowcase-gallery-mainimg">
                  <ImageWithFallback
                    src={activeProduct.images[0]}
                    alt={getTitle(activeProduct)}
                    className="w-full h-full object-cover"
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    sizes="(min-width: 700px) 44vw, 100vw"
                  />
                  {/* On-image subtle tag overlay for quick context */}
                  <div className="productshowcase-mainimg-overlay">
                    {(activeCategory === 0
                      ? [tagLabel('pva')]
                      : (lang === 'ja'
                          ? activeProduct.tagsJa || activeProduct.tags
                          : lang === 'zh'
                          ? activeProduct.tagsZh || activeProduct.tags
                          : activeProduct.tags
                        ).slice(0,2)
                    ).map((t, i) => (
                      <span key={i} className="productshowcase-overlay-badge">#{t}</span>
                    ))}
                  </div>
                </div>
                {activeProduct.images.slice(1, 4).map((image, idx) => {
                  const overlayTags =
                    activeCategory === 0
                      ? [
                          [tagLabel('abrasives')], // image 2
                          [tagLabel('grinding'), tagLabel('polishing')],                         // image 3
                          [tagLabel('ub')],                               // image 4
                        ][idx]
                      : [];
                  return (
                    <div
                      key={idx}
                      className={`productshowcase-gallery-img${idx === 0 ? ' productshowcase-gallery-img-wide' : ''}`}
                    >
                      <ImageWithFallback
                        src={image}
                        alt={getTitle(activeProduct)}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        sizes="(min-width: 700px) 22vw, 50vw"
                      />
                      {overlayTags.length > 0 && (
                        <div className="productshowcase-img-overlay">
                          {overlayTags.map((t, i2) => (
                            <span key={i2} className="productshowcase-overlay-badge">#{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </motion.div>
              {/* Content Area */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="productshowcase-content"
                role="tabpanel"
                id={`product-panel-${activeCategory}`}
                aria-labelledby={`product-tab-${activeCategory}`}
                tabIndex={0}
              >
                {/* A11y announcement of currently active product */}
                <div className="sr-only" role="status" aria-live="polite">
                  {getScope(activeProduct)} — {getTitle(activeProduct)}
                </div>
                {/* Scope */}
                <motion.div
                  className="font-['Roboto_Mono'] uppercase tracking-widest mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.05,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  style={{ fontSize: '0.85rem', color: '#5A1F1F' }}
                >
                  {getScope(activeProduct)}
                </motion.div>

                {/* Title */}
                <motion.h3
                  className="font-['Playfair_Display'] mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  style={{ fontSize: '2rem', fontWeight: 600, color: '#1E1E1E' }}
                >
                  {getTitle(activeProduct)}
                </motion.h3>

                {/* Description (refined) with offerings sentence for Grinding Wheels and Flame Retardants */}
                <motion.p
                  className="productshowcase-desc"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <LanguageSwitchBoundary as="span" lang={lang}>
                    {getDescription(activeProduct)}{' '}
                    {activeCategory === 0 && (
                      <span className="productshowcase-desc-highlight">
                        {lang === 'ja'
                          ? `一木では、${getOfferings().join('、')} を提供しています。`
                          : lang === 'zh'
                          ? `在一木，我们提供 ${getOfferings().join('、')}。`
                          : `At Ichiboku, we offer ${getOfferings().join(', ')}.`}
                      </span>
                    )}
                    {activeCategory === 1 && (
                      <span className="productshowcase-desc-highlight">{getFROfferingsText()}</span>
                    )}
                    {activeCategory === 5 && (
                      <span className="productshowcase-desc-highlight">{getGlassHighlightText()}</span>
                    )}
                    {![0,1,5].includes(activeCategory) && getExtraHighlightText() && (
                      <span className="productshowcase-desc-highlight">{getExtraHighlightText()}</span>
                    )}
                  </LanguageSwitchBoundary>
                </motion.p>

                {/* Tags */}
                <motion.div
                  className="productshowcase-tags"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.25,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  style={{
                    // Ensure no overflow hidden or fixed height
                    overflow: 'visible',
                    maxWidth: '100%',
                  }}
                >
                  {(
                    lang === 'ja'
                      ? activeProduct.tagsJa || activeProduct.tags
                      : lang === 'zh'
                      ? activeProduct.tagsZh || activeProduct.tags
                      : activeProduct.tags
                  ).map((tag, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: '#5A1F1F',
                        color: '#F5EDE3',
                      }}
                      transition={{ duration: 0.3 }}
                      className="productshowcase-tag-badge"
                      style={{
                        color: '#5A1F1F',
                        backgroundColor: '#EFE9E1',
                        border: '1px solid rgba(90, 31, 31, 0.15)',
                        borderRadius: '999px',
                        cursor: 'pointer',
                        userSelect: 'none',
                        lineHeight: 1.25,
                        fontWeight: 500,
                        transition: 'background 0.2s, color 0.2s',
                        display: 'inline-block',
                        margin: 0,
                        boxSizing: 'border-box',
                        // Allow shrink in flex containers without clipping
                        minWidth: 0,
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </motion.div>

                {/* CTAs removed for streamlined layout */}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Inline CSS for responsive grid and spacing & enhanced category label transitions */}
      <style>{`
        .productshowcase-container {
          max-width: 88rem;
          margin-left: auto;
          margin-right: auto;
          /* Color tokens for easier theming */
          --brand: #5A1F1F;
          --brand-2: #7C3E3E;
          --cream-1: #F9F4EC;
          --cream-2: #EFE3D3;
          --ink: #1E1E1E;
        }
        /* Refined description styling */
        .productshowcase-desc {
          color: #1E1E1E;
          line-height: 1.78;
          font-size: 1.05rem;
          margin-bottom: 1.75rem;
          background: linear-gradient(180deg, rgba(196,164,116,0.08) 0%, rgba(239,233,225,0.45) 100%);
          border-left: 3px solid #C4A474;
          padding: 1rem 1.25rem;
          border-radius: 0.75rem;
          box-shadow: 0 6px 22px -14px rgba(90,31,31,0.20);
        }
        .productshowcase-desc::first-letter {
          font-size: 1.18em;
          font-weight: 700;
          color: #5A1F1F;
        }
        .productshowcase-desc-highlight {
          color: #5A1F1F;
          font-weight: 600;
        }
        .productshowcase-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        /* --- Category Grid Layout --- */
        .productshowcase-category-grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 0.75rem;
          margin-bottom: 2rem;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }
        /* Force strict 2x4 layout on mobile */
        @media (max-width: 699px) {
          .productshowcase-category-grid {
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(2, 1fr);
          }
        }
        /* Always exactly 1 row (8 columns) on larger screens */
        @media (min-width: 700px) {
          .productshowcase-category-grid {
            grid-template-columns: repeat(8, 1fr);
            grid-template-rows: 1fr;
          }
        }
        /* --- Product Label Styles --- */
        .productshowcase-category-btn {
          border: none;
          border-radius: 0.75rem;
          /* Subtle shimmer gradient background */
          background: linear-gradient(120deg, var(--cream-1) 0%, var(--cream-2) 60%, var(--cream-1) 100%);
          position: relative;
          overflow: hidden;
          width: 100%;
          min-height: 72px;
          height: 88px;
          padding: 1rem 0.75rem 1rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          outline: none;
          box-sizing: border-box;
          font-family: inherit;
          z-index: 1;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
          /* Only transition background and color for smoothness, not transform or size */
          transition: background 0.3s cubic-bezier(0.4,0,0.2,1), color 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1);
          will-change: background, color, box-shadow;
          backface-visibility: hidden;
          text-align: center;
          box-shadow:
            0 1px 2px rgba(0,0,0,0.04),
            inset 0 1px 0 rgba(255,255,255,0.6);
          font-size: 0.95rem;
        }
        /* Dynamic shimmer on hover/tap */
        .productshowcase-category-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            120deg,
            rgba(255,255,255,0) 60%,
            rgba(255,255,255,0.20) 70%,
            rgba(255,255,255,0) 80%
          );
          opacity: 0;
          transition: opacity 0.35s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1);
          z-index: 2;
          will-change: opacity, transform;
        }
        /* Ambient glow ring for active tab */
        .productshowcase-category-btn.active::after {
          content: "";
          position: absolute;
          inset: -2px;
          pointer-events: none;
          border-radius: 0.85rem;
          background: radial-gradient(60% 60% at 50% 20%, rgba(124,62,62,0.25) 0%, rgba(124,62,62,0.08) 40%, rgba(124,62,62,0) 70%);
          z-index: 0;
        }
        @media (hover: hover) and (pointer: fine) {
          .productshowcase-category-btn:hover::before {
            opacity: 1;
            transform: translateX(6%);
            transition: opacity 0.35s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1);
          }
          .productshowcase-category-btn:hover {
            /* Remove scale/transform on hover for size consistency */
            /* Only background, color, and shadow transitions */
            box-shadow: 0 6px 24px -4px rgba(90,31,31,0.10), 0 2px 8px rgba(90,31,31,0.09);
            filter: brightness(1.03) saturate(1.03);
            transition: background 0.3s cubic-bezier(0.4,0,0.2,1), color 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1);
          }
        }
        /* Touch shimmer on tap (mobile) */
        @media (hover: none) and (pointer: coarse) {
          .productshowcase-category-btn:active::before {
            opacity: 1;
            transform: translateX(6%);
            transition: opacity 0.25s cubic-bezier(0.4,0,0.2,1), transform 0.25s cubic-bezier(0.4,0,0.2,1);
          }
        }
        .productshowcase-category-btn:focus-visible {
          box-shadow: 0 0 0 3px #5A1F1F44, 0 2px 8px rgba(90,31,31,0.10);
        }
        .productshowcase-category-btn.active {
          background: var(--brand);
          color: #F5EDE3;
          box-shadow:
            0 12px 28px -10px rgba(90,31,31,0.35),
            inset 0 2px 0 rgba(255,255,255,0.25);
          /* No transform for size consistency */
          filter: none;
          /* Don't animate all, only color/background/shadow */
          transition: background 0.3s ease-out, color 0.3s ease-out, box-shadow 0.3s ease-out;
        }
        /* Smooth color/opacity transition for active highlight */
        .productshowcase-category-btn.active .productshowcase-category-number,
        .productshowcase-category-btn.active .productshowcase-category-title {
          color: #F5EDE3 !important;
          transition: color 0.3s ease;
        }
        /* Touch feedback: only darken on tap, no scale */
        .productshowcase-category-btn:active {
          /* Removed transform: scale for size consistency */
          filter: brightness(0.96) saturate(0.98);
          transition: background 0.18s cubic-bezier(0.4,0,0.2,1), color 0.18s cubic-bezier(0.4,0,0.2,1), box-shadow 0.18s cubic-bezier(0.4,0,0.2,1);
        }
        .productshowcase-category-number,
        .productshowcase-category-title {
          text-align: center;
          align-self: center;
          /* Fixed height for number/title block to avoid label size jump */
        }
        .productshowcase-category-number {
          font-size: 1.25rem;
          opacity: 0.8;
          letter-spacing: 0.03em;
          margin-bottom: 0.5rem;
          font-family: inherit;
          font-weight: 700;
          height: 1.5em;
          line-height: 1.2;
          transition: color 0.3s;
        }
        .productshowcase-category-title {
          font-size: clamp(0.65rem, 0.9vw, 0.8rem);
          font-weight: 600;
          letter-spacing: 0.03em;
          line-height: 1.25;
          word-break: keep-all;
          white-space: normal;
          overflow: visible;
          text-align: center;
          display: block;
          width: 100%;
          max-width: 100%;
          font-family: inherit;
          transition: color 0.3s;
          padding: 0 0.25rem;
          box-sizing: border-box;
          word-wrap: break-word;
        }
        :lang(en) .productshowcase-category-title {
          font-size: clamp(0.6rem, 0.8vw, 0.75rem);
          white-space: normal;
          word-break: keep-all;
          text-align: center;
        }
        @media (max-width: 699px) {
          .productshowcase-category-title {
            font-size: clamp(0.6rem, 1.5vw, 0.75rem);
            line-height: 1.25;
          }
          :lang(en) .productshowcase-category-title {
            font-size: clamp(0.55rem, 1.3vw, 0.7rem);
          }
        }
        /* Highlight animation/gradient overlay is always beneath content and does not affect box size */
        .product-label .absolute.inset-0 {
          pointer-events: none;
          z-index: 0;
        }
        /* Richer highlight with subtle border sheen */
        .category-highlight {
          position: absolute;
          inset: 0;
          border-radius: 0.75rem;
          background: linear-gradient(135deg, var(--brand) 0%, var(--brand-2) 100%);
        }
        .category-highlight::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px; /* border thickness */
          background: linear-gradient(180deg, rgba(255,255,255,0.5), rgba(255,255,255,0.06));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
                  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
        }
        .productshowcase-category-active-indicator {
          /* See inline style for position and color */
        }
        /* Product Card */
        .productshowcase-card {
          margin-top: 0;
        }
        /* --- Desktop / Default Layout --- */
        .productshowcase-flexrow {
          display: flex;
          flex-direction: column;
        }
        .productshowcase-gallery {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 0.25rem;
          width: 100%;
          max-width: 100%;
          aspect-ratio: 3 / 2;
          margin: 0 auto;
          padding: 0;
          box-sizing: border-box;
        }
        .productshowcase-gallery-mainimg {
          grid-column: 1 / span 1;
          grid-row: 1 / span 1;
          overflow: hidden;
          position: relative;
        }
        .productshowcase-gallery-img {
          overflow: hidden;
          position: relative;
        }
        .productshowcase-gallery-img:nth-child(2) {
          grid-column: 2 / span 1;
          grid-row: 1 / span 1;
        }
        .productshowcase-gallery-img:nth-child(3) {
          grid-column: 1 / span 1;
          grid-row: 2 / span 1;
        }
        .productshowcase-gallery-img:nth-child(4) {
          grid-column: 2 / span 1;
          grid-row: 2 / span 1;
        }
        /* --- Desktop: Side-by-side layout for gallery/content --- */
        @media (min-width: 700px) {
        
          .productshowcase-flexrow {
            display: flex;
            flex-direction: row;
            align-items: stretch;
            gap: 3rem;
          }
          .productshowcase-gallery {
            flex: 1 1 0;
            max-width: 54%;
            min-width: 320px;
            aspect-ratio: 3 / 2;
          }
          .productshowcase-content {
            flex: 1 1 0;
            max-width: 46%;
            min-width: 320px;
            padding: 2.25rem 3rem 2.25rem 3rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
        }
        /* --- Mobile Layout (≤700px): Stacked layout and compact gallery --- */
        @media (max-width: 700px) {
          .productshowcase-flexrow {
            flex-direction: column;
            gap: 0;
          }
          .productshowcase-gallery {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(2, 1fr);
            gap: 0.1rem;
            width: 100%;
            height: auto;
            aspect-ratio: 4 / 3;
            margin: 0 auto;
            max-width: 100%;
          }
          .productshowcase-gallery-mainimg {
            grid-column: 1 / span 1;
            grid-row: 1 / span 1;
            overflow: hidden;
          }
          .productshowcase-gallery-img {
            overflow: hidden;
          }
          .productshowcase-gallery-img:nth-child(2) {
            grid-column: 2 / span 1;
            grid-row: 1 / span 1;
          }
          .productshowcase-gallery-img:nth-child(3) {
            grid-column: 1 / span 1;
            grid-row: 2 / span 1;
          }
          .productshowcase-gallery-img:nth-child(4) {
            grid-column: 2 / span 1;
            grid-row: 2 / span 1;
          }
          .productshowcase-gallery img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .productshowcase-content {
            padding: 1.5rem;
            max-width: 100%;
          }
        }
        /* Content area padding */
        .productshowcase-content {
          padding: 1.75rem;
        }
        @media (min-width: 700px) {
          .productshowcase-content {
            padding: 2.25rem 3rem 2.25rem 3rem;
          }
        }
        /* --- Responsive Tags --- */
        .productshowcase-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: flex-start;
          align-items: flex-start;
          padding-top: 0.1rem;
          padding-bottom: 0.1rem;
          margin-bottom: 0.1rem;
          box-sizing: border-box;
          width: 100%;
          max-width: 100%;
          overflow: visible;
        }

        /* On-image overlay for main image tags */
        .productshowcase-mainimg-overlay {
          position: absolute;
          left: 0.5rem;
          bottom: 0.5rem;
          display: flex;
          gap: 0.4rem;
          z-index: 10;
        }
        .productshowcase-img-overlay {
          position: absolute;
          left: 0.5rem;
          bottom: 0.5rem;
          display: flex;
          gap: 0.4rem;
          z-index: 10;
        }
        .productshowcase-overlay-badge {
          font-size: 0.72rem;
          line-height: 1.2;
          font-weight: 600;
          color: #fff;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(6px);
          padding: 0.25em 0.5em;
          border-radius: 0.5rem;
          border: 1px solid rgba(255,255,255,0.25);
          box-shadow: 0 6px 14px -10px rgba(0,0,0,0.6);
        }

        /* CTAs removed as per design simplification */

        /* --- Optimize English label layout for mobile only --- */
@media (max-width: 699px) {
  :lang(en) .productshowcase-category-title {
    font-size: clamp(0.58rem, 1.8vw, 0.68rem);
    line-height: 1.3;
    text-align: center;
    white-space: normal;
    word-break: normal;
    word-wrap: break-word;
    hyphens: auto;
    padding: 0 0.25rem;
    max-width: 90%;
    margin: 0 auto;
  }

  .productshowcase-category-btn {
    min-height: 84px;
    height: auto;
    padding: 0.75rem 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .productshowcase-category-number {
    font-size: 1.15rem;
    margin-bottom: 0.35rem;
  }
}
        
        @media (max-width: 699px) {
          .productshowcase-tags {
            gap: 0.28rem;
            padding-left: 0;
            padding-right: 0;
          }
        }
        .productshowcase-tag-badge {
          font-family: inherit;
          font-size: 0.85rem;
          padding: 0.28em 0.8em;
          border-radius: 999px;
          border: 1px solid rgba(90,31,31,0.15);
          background: #EFE9E1;
          color: #5A1F1F;
          font-weight: 500;
          line-height: 1.25;
          user-select: none;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
          margin: 0;
          display: inline-block;
          min-width: 0;
          white-space: nowrap;
          box-sizing: border-box;
        }
        .productshowcase-tag-badge:hover,
        .productshowcase-tag-badge:focus-visible {
          background: #5A1F1F;
          color: #F5EDE3;
          outline: none;
        }
        @media (max-width: 699px) {
          .productshowcase-tag-badge {
            font-size: 0.85rem;
            padding: 0.28em 0.8em;
          }
        }

        /* Screen-reader only utility */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* Respect reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .productshowcase-category-btn,
          .productshowcase-category-btn::before,
          .productshowcase-tag-badge,
          .productshowcase-tags,
          .category-highlight {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
