// ============================================================
// 地点数据处理工具函数
// ============================================================

import { Location, LocationCategory, LocationFilter } from '@/types';
import allCampusLocations from '@/data/campus-locations';
import dormitories from '@/data/dormitories';
import canteens from '@/data/canteens';
import sportsFacilities from '@/data/sports';
import nearbyRestaurants from '@/data/nearby-restaurants';

/**
 * 获取所有地点数据
 */
export function getAllLocations(): Location[] {
  return [
    ...allCampusLocations,
    ...dormitories,
    ...canteens,
    ...sportsFacilities,
    ...nearbyRestaurants,
  ];
}

/**
 * 根据 ID 获取地点
 */
export function getLocationById(id: string): Location | undefined {
  return getAllLocations().find((loc) => loc.id === id);
}

/**
 * 根据类别筛选地点
 */
export function getLocationsByCategory(category: LocationCategory | 'all'): Location[] {
  const all = getAllLocations();
  if (category === 'all') return all;
  return all.filter((loc) => loc.category === category);
}

/**
 * 获取特色/推荐地点
 */
export function getFeaturedLocations(): Location[] {
  return getAllLocations().filter((loc) => loc.featured);
}

/**
 * 搜索地点（按名称和描述）
 */
export function searchLocations(query: string): Location[] {
  if (!query.trim()) return getAllLocations();
  const q = query.toLowerCase();
  return getAllLocations().filter(
    (loc) =>
      loc.name.toLowerCase().includes(q) ||
      loc.description.toLowerCase().includes(q) ||
      loc.tags.some((tag) => tag.label.toLowerCase().includes(q))
  );
}

/**
 * 应用完整筛选条件
 */
export function applyFilter(filter: LocationFilter): Location[] {
  let results = getAllLocations();

  if (filter.category !== 'all') {
    results = results.filter((loc) => loc.category === filter.category);
  }

  if (filter.featuredOnly) {
    results = results.filter((loc) => loc.featured);
  }

  if (filter.searchQuery.trim()) {
    const q = filter.searchQuery.toLowerCase();
    results = results.filter(
      (loc) =>
        loc.name.toLowerCase().includes(q) ||
        loc.description.toLowerCase().includes(q) ||
        loc.tags.some((tag) => tag.label.toLowerCase().includes(q))
    );
  }

  return results;
}

/**
 * 获取关联地点
 */
export function getRelatedLocations(location: Location): Location[] {
  if (!location.relatedIds || location.relatedIds.length === 0) return [];
  const all = getAllLocations();
  return location.relatedIds
    .map((id) => all.find((loc) => loc.id === id))
    .filter((loc): loc is Location => loc !== undefined);
}

/**
 * 获取类别中文名称
 */
export function getCategoryLabel(category: LocationCategory | 'all'): string {
  const labels: Record<LocationCategory | 'all', string> = {
    all: '全部地点',
    campus: '校园设施',
    dormitory: '宿舍',
    canteen: '食堂',
    teaching: '教学区',
    sports: '体育设施',
    food: '周边美食',
    service: '生活服务',
  };
  return labels[category];
}

/**
 * 获取类别图标
 */
export function getCategoryIcon(category: LocationCategory | 'all'): string {
  const icons: Record<LocationCategory | 'all', string> = {
    all: '📍',
    campus: '🏫',
    dormitory: '🏠',
    canteen: '🍽️',
    teaching: '📖',
    sports: '⚽',
    food: '🍜',
    service: '🛒',
  };
  return icons[category];
}

/**
 * 获取类别颜色
 */
export function getCategoryColor(category: LocationCategory | 'all'): string {
  const colors: Record<LocationCategory | 'all', string> = {
    all: '#6b7280',
    campus: '#2563eb',
    dormitory: '#ea580c',
    canteen: '#dc2626',
    teaching: '#7c3aed',
    sports: '#16a34a',
    food: '#ca8a04',
    service: '#0d9488',
  };
  return colors[category];
}

/**
 * 导出所有地点为 JSON（用于百度地图 AI 等外部系统）
 */
export function exportLocationsAsJSON(): string {
  return JSON.stringify(getAllLocations(), null, 2);
}

/**
 * 导出为 GeoJSON FeatureCollection 格式
 */
export function exportAsGeoJSON(): object {
  const locations = getAllLocations();
  return {
    type: 'FeatureCollection',
    features: locations.map((loc) => ({
      type: 'Feature',
      id: loc.id,
      geometry: {
        type: 'Point',
        coordinates: [loc.position.lng, loc.position.lat],
      },
      properties: {
        id: loc.id,
        name: loc.name,
        type: loc.type,
        category: loc.category,
        description: loc.description,
        featured: loc.featured,
        tags: loc.tags.map((t) => t.label),
      },
    })),
  };
}
