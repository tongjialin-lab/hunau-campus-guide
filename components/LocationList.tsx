'use client';

import { Location, LocationCategory } from '@/types';
import { getCategoryLabel, getCategoryIcon, getCategoryColor } from '@/lib/locations';
import LocationCard from './LocationCard';

interface LocationListProps {
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

const categories: (LocationCategory | 'all')[] = [
  'all', 'campus', 'dormitory', 'canteen', 'teaching', 'sports', 'food', 'service',
];

export default function LocationList({
  locations,
  selectedId,
  highlightedId,
  filterCategory,
  searchQuery,
  onLocationClick,
  onLocationHover,
  onFilterChange,
  onSearchChange,
}: LocationListProps) {
  // 获取当前筛选类别的地点数量
  const getCount = (cat: LocationCategory | 'all') => {
    if (cat === 'all') return locations.length;
    return locations.filter((l) => l.category === cat).length;
  };

  return (
    <div className="space-y-4">
      {/* 搜索框 */}
      <div className="relative">
        <input
          type="text"
          placeholder="搜索地点名称..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                     placeholder:text-gray-400 transition-all"
        />
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-300 text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {/* 分类筛选 */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = filterCategory === cat;
          const color = getCategoryColor(cat);
          return (
            <button
              key={cat}
              onClick={() => onFilterChange(cat)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                isActive
                  ? 'text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={isActive ? { backgroundColor: color } : {}}
            >
              <span>{getCategoryIcon(cat)}</span>
              <span>{getCategoryLabel(cat)}</span>
              <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                isActive ? 'bg-white/30' : 'bg-gray-200'
              }`}>
                {getCount(cat)}
              </span>
            </button>
          );
        })}
      </div>

      {/* 地点列表 */}
      {locations.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-gray-500 font-medium">没有找到匹配的地点</p>
          <p className="text-sm text-gray-400 mt-1">试试其他关键词或筛选条件</p>
        </div>
      ) : (
        <div className="space-y-3">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className={`transition-all duration-200 rounded-2xl ${
                loc.id === selectedId ? 'ring-2 ring-green-500 ring-offset-2' : ''
              } ${loc.id === highlightedId ? 'ring-2 ring-blue-400 ring-offset-1' : ''}`}
              onMouseEnter={() => onLocationHover(loc.id)}
              onMouseLeave={() => onLocationHover(null)}
            >
              <LocationCard
                location={loc}
                onClick={onLocationClick}
              />
            </div>
          ))}
        </div>
      )}

      {/* 结果计数 */}
      {locations.length > 0 && (
        <p className="text-center text-xs text-gray-400">
          显示 {locations.length} 个地点
        </p>
      )}
    </div>
  );
}
