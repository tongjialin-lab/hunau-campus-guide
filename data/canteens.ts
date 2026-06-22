// ============================================================
// 湖南农业大学 - 食堂分布数据
// ============================================================

import { Location } from '@/types';

export const canteens: Location[] = [
  {
    id: 'canteen-first',
    name: '第一食堂（丰泽食堂）',
    type: 'canteen',
    category: 'canteen',
    description: '校园中心区域最大的食堂，共三层，菜品种类丰富',
    detailDescription: '第一食堂是湖南农业大学规模最大的食堂，位于校园中心区域。共三层：一楼为大众餐饮，二楼为特色小吃，三楼为风味餐厅和教工食堂。推荐菜品：麻辣香锅、兰州拉面、煲仔饭。人均消费约10-20元。',
    position: { lng: 113.080, lat: 28.183, x: 380, y: 550 },
    tags: [
      { id: 'main-canteen', label: '主食堂', color: '#ea580c' },
      { id: 'large', label: '大型', color: '#2563eb' },
      { id: 'new-student', label: '新生首选', color: '#16a34a' },
    ],
    featured: true,
    icon: '🍽️',
    relatedIds: ['dorm-zhiyuan', 'dorm-jinan-1', 'teach-main', 'library-main'],
  },
  {
    id: 'canteen-second',
    name: '第二食堂（丰泽北食堂）',
    type: 'canteen',
    category: 'canteen',
    description: '位于丰泽学生公寓区附近，方便北区学生就餐',
    detailDescription: '第二食堂位于校园北侧，紧邻丰泽学生公寓区。两层楼面，以湘菜和家常菜为主。早餐供应包子、豆浆、油条等。午餐和晚餐提供自选快餐和套餐。人均消费约8-15元。',
    position: { lng: 113.083, lat: 28.190, x: 530, y: 200 },
    tags: [
      { id: 'north', label: '北区', color: '#2563eb' },
      { id: 'home-style', label: '家常菜', color: '#16a34a' },
    ],
    featured: false,
    icon: '🍽️',
    relatedIds: ['dorm-fengze-1', 'dorm-fengze-2', 'dorm-fengze-3'],
  },
  {
    id: 'canteen-donghu',
    name: '东湖食堂',
    type: 'canteen',
    category: 'canteen',
    description: '东湖宿舍区食堂，环境优雅，可欣赏东湖风景',
    detailDescription: '东湖食堂位于校园东侧，紧邻东湖和东湖学生公寓。食堂环境优雅，窗外可欣赏东湖景色。以精致小炒和面食为主，价格略高于其他食堂。推荐：红烧牛肉面、糖醋排骨。人均消费约12-25元。',
    position: { lng: 113.087, lat: 28.185, x: 820, y: 520 },
    tags: [
      { id: 'scenic', label: '湖景', color: '#0d9488' },
      { id: 'quality', label: '品质好', color: '#ca8a04' },
    ],
    featured: true,
    icon: '🍽️',
    relatedIds: ['dorm-donghu-1', 'dorm-donghu-2'],
  },
  {
    id: 'canteen-muslim',
    name: '清真食堂',
    type: 'canteen',
    category: 'canteen',
    description: '校园清真餐厅，提供正宗清真美食',
    detailDescription: '清真食堂位于第一食堂附近，独立经营。提供正宗清真美食，包括拉面、大盘鸡、烤肉饭等。环境干净整洁，也欢迎非穆斯林同学就餐。人均消费约10-20元。',
    position: { lng: 113.079, lat: 28.184, x: 360, y: 530 },
    tags: [
      { id: 'halal', label: '清真', color: '#16a34a' },
      { id: 'specialty', label: '特色', color: '#7c3aed' },
    ],
    featured: false,
    icon: '🥘',
    relatedIds: ['canteen-first', 'dorm-zhiyuan'],
  },
  {
    id: 'canteen-snack',
    name: '校园美食街',
    type: 'canteen',
    category: 'canteen',
    description: '校内小型餐饮聚集区，提供各类小吃和饮品',
    detailDescription: '校园美食街位于第一食堂附近，聚集了多家小型餐饮店。包括奶茶店、炸鸡店、麻辣烫、煎饼果子、关东煮等。是同学们课间和周末的热门去处。人均消费约5-15元。',
    position: { lng: 113.081, lat: 28.183, x: 410, y: 540 },
    tags: [
      { id: 'snack', label: '小吃', color: '#dc2626' },
      { id: 'popular', label: '人气高', color: '#ea580c' },
    ],
    featured: false,
    icon: '🧋',
    relatedIds: ['canteen-first', 'teach-main'],
  },
];

export default canteens;
