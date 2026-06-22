// ============================================================
// 湖南农业大学 - 周边美食数据
// 这些数据为模拟数据，后续可替换为真实饭店信息
// ============================================================

import { Location } from '@/types';

export const nearbyRestaurants: Location[] = [
  // ---- 南校门外红旗路区域 ----
  {
    id: 'food-xiangwei',
    name: '湘味人家',
    type: 'restaurant',
    category: 'food',
    description: '地道湘菜馆，性价比高，人均30元，是学生聚餐首选',
    detailDescription: '位于南校门外红旗路，步行约5分钟。主打地道湖南菜，招牌菜有剁椒鱼头、小炒肉、酸豆角炒肉末。环境朴实，份量足，非常适合同学聚餐。人均消费约25-40元。推荐指数：⭐⭐⭐⭐⭐',
    position: { lng: 113.080, lat: 28.179, x: 500, y: 880 },
    tags: [
      { id: 'hunan-cuisine', label: '湘菜', color: '#dc2626' },
      { id: 'value', label: '性价比高', color: '#16a34a' },
      { id: 'group', label: '适合聚餐', color: '#ea580c' },
    ],
    featured: true,
    icon: '🍛',
  },
  {
    id: 'food-chongqing',
    name: '重庆鸡公煲',
    type: 'restaurant',
    category: 'food',
    description: '人气超高的鸡公煲专门店，人均25元，麻辣鲜香',
    detailDescription: '位于南校门外美食街，是学生最爱的餐馆之一。招牌鸡公煲量足味美，配菜丰富。用餐高峰期需要排队。提供外卖服务。人均消费约20-35元。推荐指数：⭐⭐⭐⭐⭐',
    position: { lng: 113.080, lat: 28.178, x: 490, y: 900 },
    tags: [
      { id: 'spicy', label: '麻辣', color: '#dc2626' },
      { id: 'popular', label: '超人气', color: '#ea580c' },
    ],
    featured: true,
    icon: '🍲',
  },
  {
    id: 'food-lanzhou',
    name: '兰州拉面馆',
    type: 'restaurant',
    category: 'food',
    description: '正宗西北风味拉面，人均12元，实惠管饱',
    detailDescription: '南校门附近的老店，由西北师傅主理。面条现拉现煮，汤头鲜美。除了拉面还有刀削面、炒面等。人均消费约10-18元，是省钱吃饭的好选择。推荐指数：⭐⭐⭐⭐',
    position: { lng: 113.079, lat: 28.179, x: 470, y: 890 },
    tags: [
      { id: 'noodles', label: '面食', color: '#ca8a04' },
      { id: 'cheap', label: '实惠', color: '#16a34a' },
    ],
    featured: false,
    icon: '🍜',
  },
  {
    id: 'food-cha',
    name: '茶颜悦色（农大店）',
    type: 'snack',
    category: 'food',
    description: '长沙网红奶茶品牌，南校门外就有，人均18元',
    detailDescription: '长沙本土网红奶茶品牌茶颜悦色的农大店，位于南校门外商业街。推荐声声乌龙、幽兰拿铁。经常有排队，建议错峰购买。人均消费约15-22元。推荐指数：⭐⭐⭐⭐⭐',
    position: { lng: 113.080, lat: 28.178, x: 510, y: 895 },
    tags: [
      { id: 'milk-tea', label: '奶茶', color: '#7c3aed' },
      { id: 'must-try', label: '必打卡', color: '#dc2626' },
    ],
    featured: true,
    icon: '🧋',
  },
  {
    id: 'food-bbq',
    name: '东北烧烤',
    type: 'restaurant',
    category: 'food',
    description: '东北风味烧烤，晚上人气很旺，人均40元',
    detailDescription: '位于红旗路美食街中段，晚上6点开始营业到凌晨。烤串种类丰富，羊肉串和烤鸡翅最受欢迎。有露天座位，适合夏天宵夜。人均消费约30-50元。推荐指数：⭐⭐⭐⭐',
    position: { lng: 113.079, lat: 28.178, x: 460, y: 910 },
    tags: [
      { id: 'bbq', label: '烧烤', color: '#dc2626' },
      { id: 'night', label: '宵夜', color: '#7c3aed' },
    ],
    featured: false,
    icon: '🍖',
  },

  // ---- 西校门外区域 ----
  {
    id: 'food-malatang',
    name: '杨国福麻辣烫',
    type: 'restaurant',
    category: 'food',
    description: '连锁麻辣烫品牌，菜品新鲜，人均20元',
    detailDescription: '位于西校门外，靠近金岸学生公寓。自选菜品称重计价，汤底有骨汤、番茄、麻辣等多种选择。干净卫生，冬天特别受欢迎。人均消费约15-25元。推荐指数：⭐⭐⭐⭐',
    position: { lng: 113.076, lat: 28.186, x: 120, y: 580 },
    tags: [
      { id: 'chain', label: '连锁', color: '#2563eb' },
      { id: 'hotpot', label: '火锅类', color: '#dc2626' },
    ],
    featured: false,
    icon: '🍲',
  },
  {
    id: 'food-sushi',
    name: 'N多寿司',
    type: 'restaurant',
    category: 'food',
    description: '平价寿司店，人均25元，适合换口味',
    detailDescription: '位于西校门外商业街，主打平价日式寿司和饭团。品种丰富，外卖订单量大。适合偶尔换换口味。人均消费约20-30元。推荐指数：⭐⭐⭐',
    position: { lng: 113.076, lat: 28.185, x: 130, y: 600 },
    tags: [
      { id: 'japanese', label: '日料', color: '#0d9488' },
      { id: 'delivery', label: '可外卖', color: '#ea580c' },
    ],
    featured: false,
    icon: '🍣',
  },
  {
    id: 'food-chaomifeng',
    name: '长沙炒米粉',
    type: 'snack',
    category: 'food',
    description: '长沙特色炒米粉老店，人均8元，便宜好吃',
    detailDescription: '西校门外的老字号小吃店，专注长沙炒米粉。米粉软糯，配料丰富，有牛肉、猪肝、鸡蛋等多种搭配。还有长沙臭豆腐和糖油粑粑。人均消费约6-12元。推荐指数：⭐⭐⭐⭐',
    position: { lng: 113.077, lat: 28.185, x: 150, y: 610 },
    tags: [
      { id: 'local', label: '本地特色', color: '#ca8a04' },
      { id: 'cheap', label: '超实惠', color: '#16a34a' },
      { id: 'must-try', label: '必吃', color: '#dc2626' },
    ],
    featured: true,
    icon: '🍝',
  },

  // ---- 东校门外区域 ----
  {
    id: 'food-hotpot',
    name: '小龙坎老火锅（农大店）',
    type: 'restaurant',
    category: 'food',
    description: '知名火锅连锁品牌，人均70元，适合聚会庆祝',
    detailDescription: '位于东校门外，距离东湖学生公寓步行约10分钟。正宗的川渝火锅，锅底选择丰富。适合班级聚餐、生日聚会等场合。人均消费约60-90元。推荐指数：⭐⭐⭐⭐',
    position: { lng: 113.089, lat: 28.184, x: 920, y: 540 },
    tags: [
      { id: 'hotpot', label: '火锅', color: '#dc2626' },
      { id: 'party', label: '聚会', color: '#7c3aed' },
      { id: 'splurge', label: '小奢侈', color: '#ca8a04' },
    ],
    featured: false,
    icon: '🫕',
  },
  {
    id: 'food-fried-chicken',
    name: '叫了只炸鸡',
    type: 'snack',
    category: 'food',
    description: '人气炸鸡外卖店，人均20元，适合宿舍聚餐',
    detailDescription: '东校门附近的炸鸡外卖店，主打韩式炸鸡。口味有原味、甜辣、蜂蜜芥末等。外卖送达速度快，是宿舍看电影时的经典搭配。人均消费约18-30元。推荐指数：⭐⭐⭐⭐',
    position: { lng: 113.089, lat: 28.185, x: 910, y: 520 },
    tags: [
      { id: 'fried', label: '炸鸡', color: '#ea580c' },
      { id: 'delivery', label: '外卖', color: '#2563eb' },
    ],
    featured: false,
    icon: '🍗',
  },

  // ---- 校园周边其他区域 ----
  {
    id: 'food-market',
    name: '红旗市场',
    type: 'market',
    category: 'food',
    description: '南校门外综合市场，有小吃、水果、日用品等',
    detailDescription: '红旗市场是农大学生最熟悉的生活配套区域，位于南校门外。这里汇集了各类小吃摊、水果店、奶茶店、日用品店等。晚上还有夜市，非常热闹。是新生采购生活用品的第一站。',
    position: { lng: 113.081, lat: 28.179, x: 520, y: 870 },
    tags: [
      { id: 'market', label: '市场', color: '#16a34a' },
      { id: 'night-market', label: '夜市', color: '#7c3aed' },
      { id: 'new-student', label: '新生必逛', color: '#ea580c' },
    ],
    featured: true,
    icon: '🏪',
  },
  {
    id: 'food-fruit',
    name: '鲜果时光水果店',
    type: 'market',
    category: 'food',
    description: '南校门附近水果店，水果新鲜，价格公道',
    position: { lng: 113.080, lat: 28.179, x: 500, y: 885 },
    tags: [
      { id: 'fruit', label: '水果', color: '#16a34a' },
      { id: 'healthy', label: '健康', color: '#0d9488' },
    ],
    featured: false,
    icon: '🍎',
  },
];

export default nearbyRestaurants;
