'use client';

import { useState, useMemo } from 'react';
import { Location, LocationCategory } from '@/types';
import { getLocationsByCategory } from '@/lib/locations';
import CampusMap from '@/components/CampusMap';
import LocationList from '@/components/LocationList';
import LocationDetail from '@/components/LocationDetail';

const campusCategories: (LocationCategory | 'all')[] = ['all', 'campus', 'teaching', 'sports'];

export default function CampusPage() {
  const [filterCategory, setFilterCategory] = useState<LocationCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [detailLocation, setDetailLocation] = useState<Location | null>(null);

  // 获取校园相关地点
  const campusLocations = useMemo(() => {
    if (filterCategory === 'all') {
      return getLocationsByCategory('all').filter(
        (l) => campusCategories.includes(l.category)
      );
    }
    return getLocationsByCategory(filterCategory);
  }, [filterCategory]);

  // 搜索过滤
  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) return campusLocations;
    const q = searchQuery.toLowerCase();
    return campusLocations.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.tags.some((t) => t.label.toLowerCase().includes(q))
    );
  }, [campusLocations, searchQuery]);

  const allLocations = useMemo(() => getLocationsByCategory('all'), []);

  const handleLocationClick = (location: Location) => {
    setSelectedId(location.id);
    setDetailLocation(location);
  };

  return (
    <div className="min-h-screen bg-green-50/50">
      {/* 页面头部 */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <h1 className="section-title">🗺️ 校园总览</h1>
          <p className="section-subtitle">
            了解湖南农业大学的整体布局，快速建立校园空间感。点击地图上的地点查看详情。
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* 桌面端：左右布局 */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {/* 左侧：列表 */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <LocationList
                locations={filteredLocations}
                selectedId={selectedId}
                highlightedId={highlightedId}
                filterCategory={filterCategory}
                searchQuery={searchQuery}
                onLocationClick={handleLocationClick}
                onLocationHover={setHighlightedId}
                onFilterChange={setFilterCategory}
                onSearchChange={setSearchQuery}
              />
            </div>
          </div>

          {/* 右侧：地图 */}
          <div className="lg:col-span-2">
            <CampusMap
              locations={campusLocations}
              selectedId={selectedId}
              highlightedId={highlightedId}
              filterCategory={filterCategory}
              onLocationClick={handleLocationClick}
            />
          </div>
        </div>

        {/* 移动端：上下布局 */}
        <div className="lg:hidden space-y-4">
          {/* 筛选 + 搜索 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {campusCategories.map((cat) => {
                const labels: Record<string, string> = { all: '全部', campus: '校园', teaching: '教学', sports: '运动' };
                const colors: Record<string, string> = { all: '#6b7280', campus: '#2563eb', teaching: '#7c3aed', sports: '#16a34a' };
                const isActive = filterCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                      isActive ? 'text-white shadow-md' : 'bg-gray-100 text-gray-600'
                    }`}
                    style={isActive ? { backgroundColor: colors[cat] } : {}}
                  >
                    {labels[cat]}
                  </button>
                );
              })}
            </div>
            <div className="relative mt-3">
              <input
                type="text"
                placeholder="搜索地点..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* 地图 */}
          <CampusMap
            locations={campusLocations}
            selectedId={selectedId}
            highlightedId={highlightedId}
            filterCategory={filterCategory}
            onLocationClick={handleLocationClick}
          />

          {/* 地点卡片列表 */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 text-sm">
              📍 {filterCategory === 'all' ? '全部地点' : '筛选结果'} ({filteredLocations.length})
            </h3>
            {filteredLocations.map((loc) => (
              <div
                key={loc.id}
                className={`transition-all duration-200 rounded-2xl ${
                  loc.id === selectedId ? 'ring-2 ring-green-500 ring-offset-2' : ''
                }`}
                onMouseEnter={() => setHighlightedId(loc.id)}
                onMouseLeave={() => setHighlightedId(null)}
              >
                <button
                  onClick={() => handleLocationClick(loc)}
                  className="w-full text-left card p-4 hover:border-green-300 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">{loc.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-800 text-sm group-hover:text-green-700">{loc.name}</h4>
                        {loc.featured && <span className="tag bg-amber-100 text-amber-700 text-[10px]">🌟</span>}
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2">{loc.description}</p>
                    </div>
                    <span className="text-gray-300 group-hover:text-green-500 transition-colors">→</span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 地点详情弹窗 */}
      {detailLocation && (
        <LocationDetail
          location={detailLocation}
          onClose={() => {
            setDetailLocation(null);
            setSelectedId(null);
          }}
          allLocations={allLocations}
        />
      )}
    </div>
  );
}
