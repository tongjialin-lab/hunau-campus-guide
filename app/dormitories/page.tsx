'use client';

import { useState, useMemo } from 'react';
import { Location, LocationCategory } from '@/types';
import dormitories from '@/data/dormitories';
import { getLocationsByCategory } from '@/lib/locations';
import CampusMap from '@/components/CampusMap';
import LocationList from '@/components/LocationList';
import LocationDetail from '@/components/LocationDetail';

// 宿舍区域分组
const dormAreas = [
  { id: 'fengze', label: '丰泽区', color: '#2563eb', ids: ['dorm-fengze-1', 'dorm-fengze-2', 'dorm-fengze-3'] },
  { id: 'jinan', label: '金岸区', color: '#ea580c', ids: ['dorm-jinan-1', 'dorm-jinan-2'] },
  { id: 'donghu', label: '东湖区', color: '#0d9488', ids: ['dorm-donghu-1', 'dorm-donghu-2'] },
  { id: 'zhilan', label: '芷兰区', color: '#16a34a', ids: ['dorm-zhiyuan'] },
];

export default function DormitoriesPage() {
  const [filterCategory, setFilterCategory] = useState<LocationCategory | 'all'>('dormitory');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [detailLocation, setDetailLocation] = useState<Location | null>(null);
  const [activeArea, setActiveArea] = useState<string | null>(null);

  // 过滤
  const filteredLocations = useMemo(() => {
    let list = dormitories;
    if (activeArea) {
      const areaIds = dormAreas.find((a) => a.id === activeArea)?.ids || [];
      list = list.filter((d) => areaIds.includes(d.id));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [searchQuery, activeArea]);

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
          <h1 className="section-title">🏠 宿舍分布</h1>
          <p className="section-subtitle">
            了解湖南农业大学各宿舍区的位置、房型和周边配套。提前熟悉你将生活的地方。
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* 宿舍区域快速选择 */}
        <div className="mb-6">
          <div className="flex gap-3 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveArea(null)}
              className={`px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
                !activeArea
                  ? 'bg-gray-800 text-white shadow-lg'
                  : 'bg-white text-gray-600 shadow-sm hover:shadow-md border border-gray-200'
              }`}
            >
              🏠 全部宿舍 ({dormitories.length})
            </button>
            {dormAreas.map((area) => {
              const count = dormitories.filter((d) => area.ids.includes(d.id)).length;
              const isActive = activeArea === area.id;
              return (
                <button
                  key={area.id}
                  onClick={() => setActiveArea(area.id)}
                  className={`px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? 'text-white shadow-lg'
                      : 'bg-white text-gray-600 shadow-sm hover:shadow-md border border-gray-200'
                  }`}
                  style={isActive ? { backgroundColor: area.color } : {}}
                >
                  🏠 {area.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* 桌面端：左右布局 */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
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
          <div className="lg:col-span-2">
            <CampusMap
              locations={dormitories}
              selectedId={selectedId}
              highlightedId={highlightedId}
              filterCategory="dormitory"
              onLocationClick={handleLocationClick}
            />
          </div>
        </div>

        {/* 移动端 */}
        <div className="lg:hidden space-y-4">
          {/* 搜索 */}
          <div className="relative">
            <input
              type="text"
              placeholder="搜索宿舍楼..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* 地图 */}
          <CampusMap
            locations={dormitories}
            selectedId={selectedId}
            highlightedId={highlightedId}
            filterCategory="dormitory"
            onLocationClick={handleLocationClick}
          />

          {/* 宿舍列表 */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 text-sm">
              📍 {activeArea ? `${dormAreas.find(a => a.id === activeArea)?.label}` : '全部宿舍'} ({filteredLocations.length})
            </h3>
            {filteredLocations.map((dorm) => (
              <button
                key={dorm.id}
                onClick={() => handleLocationClick(dorm)}
                className={`w-full text-left card p-4 hover:border-green-300 transition-all group ${
                  dorm.id === selectedId ? 'ring-2 ring-green-500 ring-offset-2' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl shrink-0">{dorm.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-800 group-hover:text-green-700">{dorm.name}</h4>
                      {dorm.featured && <span className="tag bg-amber-100 text-amber-700 text-[10px]">🌟 推荐</span>}
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">{dorm.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {dorm.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="tag text-[10px]"
                          style={{ backgroundColor: tag.color ? `${tag.color}15` : '#f0fdf4', color: tag.color || '#16a34a' }}
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-gray-300 group-hover:text-green-500 transition-colors">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 详情弹窗 */}
      {detailLocation && (
        <LocationDetail
          location={detailLocation}
          onClose={() => { setDetailLocation(null); setSelectedId(null); }}
          allLocations={allLocations}
        />
      )}
    </div>
  );
}
