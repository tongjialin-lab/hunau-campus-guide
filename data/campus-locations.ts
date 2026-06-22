// ============================================================
// 湖南农业大学 - 校园地点数据
// 数据格式：统一 Location 结构
// 坐标基于校园大致布局的相对坐标系统 (x: 0-1000, y: 0-1000)
// 后续可替换为真实经纬度
// ============================================================

import { Location } from '@/types';

/**
 * 校园主干道数据
 */
export const mainRoads: Location[] = [
  {
    id: 'road-nongda',
    name: '农大路（校园主干道）',
    type: 'road',
    category: 'campus',
    description: '贯穿校园南北的主干道，连接南校门、教学区、宿舍区',
    position: { lng: 113.082, lat: 28.185, x: 500, y: 500 },
    tags: [{ id: 'main-road', label: '主干道', color: '#2563eb' }],
    featured: false,
    icon: '🛣️',
  },
  {
    id: 'road-xueyuan',
    name: '学院路',
    type: 'road',
    category: 'campus',
    description: '东西向主干道，连接各学院教学楼',
    position: { lng: 113.083, lat: 28.184, x: 500, y: 350 },
    tags: [{ id: 'main-road', label: '主干道', color: '#2563eb' }],
    featured: false,
    icon: '🛣️',
  },
];

/**
 * 校园校门数据
 */
export const campusGates: Location[] = [
  {
    id: 'gate-south',
    name: '南校门（正门）',
    type: 'gate',
    category: 'campus',
    description: '湖南农业大学正门，位于农大路南端，是新生报到的主要入口',
    detailDescription: '南校门是湖南农业大学的主校门，正对红旗路。新生报到期间，这里是最繁忙的入口。校门两侧有公交站点，交通便利。进门后沿农大路直走即可到达各主要区域。',
    position: { lng: 113.080, lat: 28.180, x: 500, y: 850 },
    tags: [
      { id: 'main-entrance', label: '主入口', color: '#16a34a' },
      { id: 'new-student', label: '新生报到', color: '#ea580c' },
    ],
    featured: true,
    icon: '🚪',
  },
  {
    id: 'gate-east',
    name: '东校门',
    type: 'gate',
    category: 'campus',
    description: '东校门靠近东湖宿舍区和运动场，是通往东湖的主要出口',
    position: { lng: 113.087, lat: 28.183, x: 850, y: 550 },
    tags: [{ id: 'side-entrance', label: '侧门', color: '#7c3aed' }],
    featured: false,
    icon: '🚪',
  },
  {
    id: 'gate-west',
    name: '西校门',
    type: 'gate',
    category: 'campus',
    description: '西校门靠近金岸学生公寓，周边生活设施齐全',
    position: { lng: 113.077, lat: 28.185, x: 150, y: 600 },
    tags: [
      { id: 'side-entrance', label: '侧门', color: '#7c3aed' },
      { id: 'near-dorm', label: '近宿舍', color: '#0d9488' },
    ],
    featured: false,
    icon: '🚪',
  },
  {
    id: 'gate-north',
    name: '北校门',
    type: 'gate',
    category: 'campus',
    description: '北校门靠近丰泽学生公寓和部分实验室区域',
    position: { lng: 113.082, lat: 28.190, x: 480, y: 150 },
    tags: [{ id: 'side-entrance', label: '侧门', color: '#7c3aed' }],
    featured: false,
    icon: '🚪',
  },
];

/**
 * 教学区数据
 */
export const teachingAreas: Location[] = [
  {
    id: 'teach-main',
    name: '第一教学楼（主教学楼）',
    type: 'teaching',
    category: 'teaching',
    description: '位于校园中心区域的主教学楼，是大部分公共课的上课地点',
    detailDescription: '第一教学楼是湖南农业大学的标志性建筑之一，位于校园中心位置。楼内设有大型阶梯教室和多媒体教室，是新生最常去的教学楼之一。靠近图书馆和行政楼。',
    position: { lng: 113.082, lat: 28.184, x: 450, y: 400 },
    tags: [
      { id: 'main-building', label: '主楼', color: '#2563eb' },
      { id: 'classroom', label: '上课', color: '#16a34a' },
    ],
    featured: true,
    icon: '🏫',
  },
  {
    id: 'teach-second',
    name: '第二教学楼',
    type: 'teaching',
    category: 'teaching',
    description: '位于校园东侧，承担大量专业课教学任务',
    position: { lng: 113.084, lat: 28.183, x: 650, y: 420 },
    tags: [{ id: 'classroom', label: '上课', color: '#16a34a' }],
    featured: false,
    icon: '🏫',
  },
  {
    id: 'teach-third',
    name: '第三教学楼',
    type: 'teaching',
    category: 'teaching',
    description: '实验教学楼，配备各专业实验室',
    position: { lng: 113.085, lat: 28.185, x: 700, y: 350 },
    tags: [
      { id: 'lab', label: '实验', color: '#7c3aed' },
      { id: 'classroom', label: '上课', color: '#16a34a' },
    ],
    featured: false,
    icon: '🔬',
  },
  {
    id: 'teach-agri',
    name: '农学院教学楼',
    type: 'teaching',
    category: 'teaching',
    description: '农学院专业教学楼，紧邻学校试验田',
    position: { lng: 113.081, lat: 28.186, x: 350, y: 300 },
    tags: [
      { id: 'college', label: '学院楼', color: '#ca8a04' },
      { id: 'agriculture', label: '农学', color: '#16a34a' },
    ],
    featured: false,
    icon: '🌾',
  },
  {
    id: 'teach-bio',
    name: '生物科学技术学院楼',
    type: 'teaching',
    category: 'teaching',
    description: '生物科学技术学院教学楼和实验中心',
    position: { lng: 113.083, lat: 28.187, x: 550, y: 280 },
    tags: [{ id: 'college', label: '学院楼', color: '#ca8a04' }],
    featured: false,
    icon: '🧬',
  },
];

/**
 * 图书馆数据
 */
export const libraries: Location[] = [
  {
    id: 'library-main',
    name: '湖南农业大学图书馆',
    type: 'library',
    category: 'campus',
    description: '校园标志性建筑，藏书丰富，是自习和阅读的最佳去处',
    detailDescription: '湖南农业大学图书馆位于校园中心区域，紧邻第一教学楼。馆藏纸质图书超过200万册，电子资源丰富。馆内设有自习室、电子阅览室、研讨间等。开放时间：周一至周日 8:00-22:00。新生入学后需通过入馆教育才能借阅图书。',
    position: { lng: 113.081, lat: 28.183, x: 400, y: 380 },
    tags: [
      { id: 'landmark', label: '地标建筑', color: '#ca8a04' },
      { id: 'study', label: '自习', color: '#2563eb' },
      { id: 'new-student', label: '新生必去', color: '#ea580c' },
    ],
    featured: true,
    icon: '📚',
  },
];

/**
 * 行政服务区数据
 */
export const adminAreas: Location[] = [
  {
    id: 'admin-main',
    name: '行政楼',
    type: 'admin',
    category: 'campus',
    description: '学校行政办公中心，办理学籍、证件等事务',
    position: { lng: 113.080, lat: 28.182, x: 380, y: 420 },
    tags: [{ id: 'admin', label: '行政', color: '#7c3aed' }],
    featured: false,
    icon: '🏢',
  },
  {
    id: 'service-center',
    name: '学生服务中心',
    type: 'service',
    category: 'service',
    description: '一站式学生事务办理中心，提供校园卡、缴费等服务',
    position: { lng: 113.081, lat: 28.181, x: 420, y: 450 },
    tags: [
      { id: 'service', label: '服务', color: '#0d9488' },
      { id: 'new-student', label: '新生报到', color: '#ea580c' },
    ],
    featured: true,
    icon: '🏪',
  },
  {
    id: 'health-center',
    name: '校医院',
    type: 'service',
    category: 'service',
    description: '校园医疗服务中心，提供基本医疗和体检服务',
    position: { lng: 113.083, lat: 28.181, x: 550, y: 500 },
    tags: [{ id: 'health', label: '医疗', color: '#dc2626' }],
    featured: false,
    icon: '🏥',
  },
];

/**
 * 景观数据
 */
export const landscapes: Location[] = [
  {
    id: 'lake-east',
    name: '东湖',
    type: 'landscape',
    category: 'campus',
    description: '校园东侧的湖泊景观，环境优美，是散步休闲好去处',
    position: { lng: 113.088, lat: 28.186, x: 900, y: 400 },
    tags: [{ id: 'scenery', label: '校园景观', color: '#0d9488' }],
    featured: true,
    icon: '🌊',
  },
  {
    id: 'square-centre',
    name: '中心广场',
    type: 'landscape',
    category: 'campus',
    description: '图书馆前的中心广场，校园活动和集会的场所',
    position: { lng: 113.081, lat: 28.184, x: 420, y: 360 },
    tags: [
      { id: 'landmark', label: '地标', color: '#ca8a04' },
      { id: 'gathering', label: '集会', color: '#ea580c' },
    ],
    featured: false,
    icon: '⛲',
  },
];

// ============================================================
// 汇总所有校园地点
// ============================================================
export const allCampusLocations: Location[] = [
  ...mainRoads,
  ...campusGates,
  ...teachingAreas,
  ...libraries,
  ...adminAreas,
  ...landscapes,
];

export default allCampusLocations;
