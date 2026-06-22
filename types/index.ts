// ============================================================
// 湖南农业大学校园导览 - 类型定义
// 所有地点数据均使用统一结构，便于后续替换和扩展
// ============================================================

/** 地点类型枚举 */
export type LocationType =
  | 'gate'           // 校门
  | 'teaching'       // 教学楼
  | 'dormitory'      // 宿舍
  | 'canteen'        // 食堂
  | 'library'        // 图书馆
  | 'sports'         // 体育设施
  | 'admin'          // 行政楼
  | 'road'           // 主干道
  | 'landscape'      // 景观
  | 'service'        // 生活服务
  | 'restaurant'     // 周边饭店
  | 'snack'          // 小吃饮品
  | 'market';        // 超市商场

/** 地点类别（用于分类筛选） */
export type LocationCategory =
  | 'campus'         // 校园设施
  | 'dormitory'      // 宿舍
  | 'canteen'        // 食堂
  | 'teaching'       // 教学区
  | 'sports'         // 体育设施
  | 'food'           // 周边美食
  | 'service';       // 生活服务

/** 地理坐标（兼容 GeoJSON 格式） */
export interface GeoPosition {
  /** 经度（模拟值，可替换为真实经纬度） */
  lng: number;
  /** 纬度（模拟值，可替换为真实经纬度） */
  lat: number;
  /** 在校园示意图中的相对坐标 x（0-1000） */
  x: number;
  /** 在校园示意图中的相对坐标 y（0-1000） */
  y: number;
}

/** 地点标签 */
export interface LocationTag {
  id: string;
  label: string;
  color?: string;
}

/** 地点数据结构 */
export interface Location {
  /** 唯一标识 */
  id: string;
  /** 地点名称（中文） */
  name: string;
  /** 地点类型（细粒度） */
  type: LocationType;
  /** 地点类别（用于筛选） */
  category: LocationCategory;
  /** 简短描述（列表展示用） */
  description: string;
  /** 详细描述（详情卡片用） */
  detailDescription?: string;
  /** 地理位置 */
  position: GeoPosition;
  /** 标签 */
  tags: LocationTag[];
  /** 是否为推荐/特色地点 */
  featured: boolean;
  /** 图标名称 */
  icon: string;
  /** 关联地点 ID（如食堂关联附近宿舍） */
  relatedIds?: string[];
  /** 图片占位符 */
  imagePlaceholder?: string;
}

/** 地点筛选条件 */
export interface LocationFilter {
  category: LocationCategory | 'all';
  searchQuery: string;
  featuredOnly: boolean;
}

/** 地图组件 Props */
export interface CampusMapProps {
  locations: Location[];
  selectedId: string | null;
  highlightedId: string | null;
  filterCategory: LocationCategory | 'all';
  onLocationClick: (location: Location) => void;
  onLocationHover?: (locationId: string | null) => void;
}

/** 地点列表组件 Props */
export interface LocationListProps {
  locations: Location[];
  selectedId: string | null;
  highlightedId: string | null;
  filterCategory: LocationCategory | 'all';
  searchQuery: string;
  onLocationClick: (location: Location) => void;
  onLocationHover: (locationId: string | null) => void;
  onFilterChange: (category: LocationCategory | 'all') => void;
  onSearchChange: (query: string) => void;
}

/** 地点详情卡片 Props */
export interface LocationDetailProps {
  location: Location;
  onClose: () => void;
  allLocations: Location[];
}
