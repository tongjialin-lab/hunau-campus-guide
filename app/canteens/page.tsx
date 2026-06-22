'use client';

import { useState, useMemo } from 'react';
import { Location, LocationCategory } from '@/types';
import canteens from '@/data/canteens';
import { getLocationsByCategory } from '@/lib/locations';
import CampusMap from '@/components/CampusMap';
import LocationList from '@/components/LocationList';
import LocationDetail from '@/components/LocationDetail';

const canteenTips = [
  { icon: '🕐', title: '用餐时间', desc: '早餐 6:30-8:30 / 午餐 11:00-13:00 / 晚餐 17:00-19:00。部分食堂夜宵供应到 21:30。' },
  { icon: '💳', title: '支付方式', desc: '主要使用校园一卡通，部分窗口支持微信和支付宝支付。新生报到后会统一办理校园卡。' },
  { icon: '🥢', title: '自带餐具', desc: '食堂提供公用餐具，也支持自带餐具。部分食堂有打包服务。建议新生自备饭盒。' },
  { icon: '📊', title: '消费参考', desc: '食堂人均消费约 8-20 元/餐。一荤一素约 8-12 元，两荤一素约 12-18 元。' },
];

export default function CanteensPage() {
  const [filterCategory, setFilterCategory] = useState<LocationCategory | 'all'>('canteen');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [detailLocation, setDetailLocation] = useState<Location | null>(null);

  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) return canteens;
    const q = searchQuery.toLowerCase();
    return canteens.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.label.toLowerCase().includes(q))
    );
  }, [searchQuery]);

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
          <h1 className="section-title">🍽️ 食堂分布</h1>
          <p className="section-subtitle">
            了解湖南农业大学各食堂的位置、特色和用餐指南。提前规划你的校园美食路线。
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* 用餐小贴士 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {canteenTips.map((tip, idx) => (
            <div key={idx} className="card bg-white text-center">
              <div className="text-2xl mb-2">{tip.icon}</div>
              <h4 className="font-semibold text-sm text-gray-800 mb-1">{tip.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{tip.desc}</p>
            </div>
          ))}
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
              locations={canteens}
              selectedId={selectedId}
              highlightedId={highlightedId}
              filterCategory="canteen"
              onLocationClick={handleLocationClick}
            />
          </div>
        </div>

        {/* 移动端 */}
        <div className="lg:hidden space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索食堂..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <CampusMap
            locations={canteens}
            selectedId={selectedId}
            highlightedId={highlightedId}
            filterCategory="canteen"
            onLocationClick={handleLocationClick}
          />

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 text-sm">
              🍽️ 全部食堂 ({filteredLocations.length})
            </h3>
            {filteredLocations.map((canteen) => (
              <button
                key={canteen.id}
                onClick={() => handleLocationClick(canteen)}
                className={`w-full text-left card p-4 hover:border-green-300 transition-all group ${
                  canteen.id === selectedId ? 'ring-2 ring-green-500 ring-offset-2' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl shrink-0">{canteen.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-800 group-hover:text-green-700">{canteen.name}</h4>
                      {canteen.featured && <span className="tag bg-amber-100 text-amber-700 text-[10px]">🌟 推荐</span>}
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">{canteen.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {canteen.tags.map((tag) => (
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
