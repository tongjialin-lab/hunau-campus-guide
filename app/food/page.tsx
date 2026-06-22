'use client';

import { useState, useMemo } from 'react';
import { Location, LocationCategory } from '@/types';
import nearbyRestaurants from '@/data/nearby-restaurants';
import { getLocationsByCategory } from '@/lib/locations';
import CampusMap from '@/components/CampusMap';
import LocationList from '@/components/LocationList';
import LocationDetail from '@/components/LocationDetail';

const foodAreas = [
  { id: 'south-gate', label: '南校门 / 红旗路', desc: '美食最集中的区域', icon: '🔥', ids: ['food-xiangwei', 'food-chongqing', 'food-lanzhou', 'food-cha', 'food-bbq', 'food-market', 'food-fruit'] },
  { id: 'west-gate', label: '西校门 / 金岸', desc: '靠近金岸宿舍区', icon: '🍜', ids: ['food-malatang', 'food-sushi', 'food-chaomifeng'] },
  { id: 'east-gate', label: '东校门 / 东湖', desc: '靠近东湖宿舍区', icon: '🍲', ids: ['food-hotpot', 'food-fried-chicken'] },
];

export default function FoodPage() {
  const [filterCategory, setFilterCategory] = useState<LocationCategory | 'all'>('food');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [detailLocation, setDetailLocation] = useState<Location | null>(null);
  const [activeArea, setActiveArea] = useState<string | null>(null);

  const filteredLocations = useMemo(() => {
    let list = nearbyRestaurants;
    if (activeArea) {
      const areaIds = foodAreas.find((a) => a.id === activeArea)?.ids || [];
      list = list.filter((r) => areaIds.includes(r.id));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags.some((t) => t.label.toLowerCase().includes(q))
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
          <h1 className="section-title">🍜 附近好吃的饭店</h1>
          <p className="section-subtitle">
            探索湖南农业大学周边值得推荐的美食点位。从地道湘菜到网红奶茶，满足你的味蕾。
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* 区域选择 */}
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
              🍜 全部美食 ({nearbyRestaurants.length})
            </button>
            {foodAreas.map((area) => {
              const count = nearbyRestaurants.filter((r) => area.ids.includes(r.id)).length;
              const isActive = activeArea === area.id;
              return (
                <button
                  key={area.id}
                  onClick={() => setActiveArea(area.id)}
                  className={`px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-lg'
                      : 'bg-white text-gray-600 shadow-sm hover:shadow-md border border-gray-200'
                  }`}
                >
                  {area.icon} {area.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* 桌面端 */}
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
              locations={nearbyRestaurants}
              selectedId={selectedId}
              highlightedId={highlightedId}
              filterCategory="food"
              onLocationClick={handleLocationClick}
            />
          </div>
        </div>

        {/* 移动端 */}
        <div className="lg:hidden space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索美食..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <CampusMap
            locations={nearbyRestaurants}
            selectedId={selectedId}
            highlightedId={highlightedId}
            filterCategory="food"
            onLocationClick={handleLocationClick}
          />

          {/* 美食列表 */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 text-sm">
              🍜 {activeArea ? `${foodAreas.find(a => a.id === activeArea)?.label}` : '全部美食'} ({filteredLocations.length})
            </h3>
            {filteredLocations.map((food) => (
              <button
                key={food.id}
                onClick={() => handleLocationClick(food)}
                className={`w-full text-left card p-4 hover:border-amber-300 transition-all group ${
                  food.id === selectedId ? 'ring-2 ring-amber-500 ring-offset-2' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-2xl shrink-0">
                    {food.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-800 group-hover:text-amber-600">{food.name}</h4>
                      {food.featured && <span className="tag bg-amber-100 text-amber-700 text-[10px]">🌟 推荐</span>}
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">{food.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {food.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="tag text-[10px]"
                          style={{ backgroundColor: tag.color ? `${tag.color}15` : '#fef3c7', color: tag.color || '#d97706' }}
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-gray-300 group-hover:text-amber-500 transition-colors">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

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
