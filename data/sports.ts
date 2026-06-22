// ============================================================
// 湖南农业大学 - 体育设施数据
// ============================================================

import { Location } from '@/types';

export const sportsFacilities: Location[] = [
  {
    id: 'sports-stadium',
    name: '东田径场（主体育场）',
    type: 'sports',
    category: 'sports',
    description: '学校主体育场，400米标准跑道，可举办大型体育赛事和活动',
    detailDescription: '东田径场是湖南农业大学的主体育场，配备400米标准塑胶跑道、足球场、看台等设施。是新生军训、运动会和日常锻炼的主要场所。开放时间：每天6:00-22:00。',
    position: { lng: 113.086, lat: 28.183, x: 780, y: 450 },
    tags: [
      { id: 'main-sports', label: '主场', color: '#ea580c' },
      { id: 'military-training', label: '军训', color: '#16a34a' },
      { id: 'new-student', label: '新生必去', color: '#dc2626' },
    ],
    featured: true,
    icon: '🏟️',
    relatedIds: ['dorm-donghu-1', 'dorm-donghu-2'],
  },
  {
    id: 'sports-gym',
    name: '体育馆',
    type: 'sports',
    category: 'sports',
    description: '室内综合体育馆，含篮球馆、羽毛球馆和乒乓球室',
    detailDescription: '体育馆位于校园中心区域，内含标准篮球场、羽毛球场和乒乓球室。部分场地需要提前预约。一层还有健身房和舞蹈教室。开放时间：每天8:00-21:30。',
    position: { lng: 113.082, lat: 28.183, x: 500, y: 440 },
    tags: [
      { id: 'indoor', label: '室内', color: '#2563eb' },
      { id: 'gym', label: '健身', color: '#7c3aed' },
    ],
    featured: false,
    icon: '🏋️',
  },
  {
    id: 'sports-basketball',
    name: '篮球场群',
    type: 'sports',
    category: 'sports',
    description: '多片室外篮球场，位于体育馆附近',
    position: { lng: 113.083, lat: 28.182, x: 530, y: 460 },
    tags: [{ id: 'outdoor', label: '室外', color: '#16a34a' }],
    featured: false,
    icon: '🏀',
  },
  {
    id: 'sports-west-field',
    name: '西田径场',
    type: 'sports',
    category: 'sports',
    description: '西区田径场，靠近金岸学生公寓',
    position: { lng: 113.078, lat: 28.183, x: 220, y: 470 },
    tags: [{ id: 'west', label: '西区', color: '#ea580c' }],
    featured: false,
    icon: '🏃',
    relatedIds: ['dorm-jinan-1', 'dorm-jinan-2'],
  },
  {
    id: 'sports-tennis',
    name: '网球场',
    type: 'sports',
    category: 'sports',
    description: '标准室外网球场，位于体育馆南侧',
    position: { lng: 113.082, lat: 28.182, x: 510, y: 470 },
    tags: [{ id: 'outdoor', label: '室外', color: '#16a34a' }],
    featured: false,
    icon: '🎾',
  },
  {
    id: 'sports-pool',
    name: '游泳馆',
    type: 'sports',
    category: 'sports',
    description: '室内恒温游泳馆，夏季对师生开放',
    position: { lng: 113.085, lat: 28.182, x: 730, y: 470 },
    tags: [
      { id: 'indoor', label: '室内', color: '#2563eb' },
      { id: 'seasonal', label: '季节性', color: '#ca8a04' },
    ],
    featured: false,
    icon: '🏊',
  },
];

export default sportsFacilities;
