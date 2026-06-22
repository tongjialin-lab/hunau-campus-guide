'use client';

import { useState, useRef, useCallback, lazy, Suspense } from 'react';
import { Location, LocationCategory } from '@/types';
import { getCategoryColor } from '@/lib/locations';
import dynamic from 'next/dynamic';

// 动态导入百度地图组件（避免 SSR 问题）
const BaiduMapView = dynamic(() => import('./BaiduMapView'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full min-h-[400px] bg-gray-50 rounded-2xl border border-gray-200">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-3 border-green-500 border-t-transparent rounded-full mx-auto mb-3" />
        <p className="text-gray-500 text-sm">正在加载地图组件...</p>
      </div>
    </div>
  ),
});

interface CampusMapProps {
  locations: Location[];
  selectedId: string | null;
  highlightedId: string | null;
  filterCategory: LocationCategory | 'all';
  onLocationClick: (location: Location) => void;
}

// 校园布局背景元素（SVG 模式）
const campusLayout = {
  roads: [
    { id: 'road1', x1: 500, y1: 50, x2: 500, y2: 900, label: '农大路' },
    { id: 'road2', x1: 100, y1: 350, x2: 900, y2: 350, label: '学院路' },
    { id: 'road3', x1: 100, y1: 550, x2: 900, y2: 550, label: '生活路' },
  ],
  areas: [
    { id: 'teaching-area', label: '教学区', x: 500, y: 350, w: 300, h: 140, color: '#e8f4fd' },
    { id: 'sports-area', label: '运动区', x: 650, y: 450, w: 200, h: 80, color: '#f0fdf4' },
    { id: 'central-area', label: '中心区', x: 350, y: 350, w: 150, h: 200, color: '#fefce8' },
  ],
};

type MapMode = 'schematic' | 'baidu';

export default function CampusMap({
  locations,
  selectedId,
  highlightedId,
  filterCategory,
  onLocationClick,
}: CampusMapProps) {
  const [mapMode, setMapMode] = useState<MapMode>('baidu');
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; location: Location } | null>(null);
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: 1000, h: 950 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // 过滤后的地点
  const filteredLocations = filterCategory === 'all'
    ? locations
    : locations.filter((l) => l.category === filterCategory);

  // 根据地点类型获取颜色
  const getDotColor = (loc: Location) => {
    const isSelected = loc.id === selectedId;
    const isHighlighted = loc.id === highlightedId;
    if (isSelected) return '#ea580c';
    if (isHighlighted) return '#2563eb';
    return getCategoryColor(loc.category);
  };

  const getDotSize = (loc: Location) => {
    if (loc.id === selectedId) return 14;
    if (loc.id === highlightedId) return 11;
    if (loc.featured) return 9;
    return 7;
  };

  // SVG 缩放和拖拽
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const scale = e.deltaY > 0 ? 1.15 : 0.87;
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const newW = viewBox.w * scale;
    const newH = viewBox.h * scale;

    const clampedW = Math.max(300, Math.min(2000, newW));
    const clampedH = Math.max(285, Math.min(1900, newH));
    const actualScale = clampedW / viewBox.w;

    setViewBox({
      x: viewBox.x + mx * (1 - actualScale),
      y: viewBox.y + my * (1 - actualScale),
      w: clampedW,
      h: clampedH,
    });
  }, [viewBox]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    const scale = viewBox.w / (svgRef.current?.clientWidth || 1000);
    setViewBox(prev => ({
      ...prev,
      x: prev.x - dx * scale,
      y: prev.y - dy * scale,
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setViewBox({ x: 0, y: 0, w: 1000, h: 950 });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
      {/* 顶部 Tab 切换栏 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
        <div className="flex rounded-lg bg-gray-100 p-0.5 gap-0.5">
          <button
            onClick={() => setMapMode('baidu')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              mapMode === 'baidu'
                ? 'bg-white text-green-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            🗺️ 百度地图
          </button>
          <button
            onClick={() => setMapMode('schematic')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              mapMode === 'schematic'
                ? 'bg-white text-green-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📐 校园示意图
          </button>
        </div>

        {/* 图例（两种模式共用） */}
        <div className="hidden sm:flex flex-wrap gap-3 text-xs">
          {(['campus', 'dormitory', 'canteen', 'teaching', 'sports', 'food', 'service'] as const).map((cat) => (
            <div key={cat} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: getCategoryColor(cat) }} />
              <span className="text-gray-600">
                {{ campus: '校园', dormitory: '宿舍', canteen: '食堂', teaching: '教学', sports: '运动', food: '美食', service: '服务' }[cat]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 地图内容区域 */}
      <div className="relative">
        {/* 百度地图模式 */}
        {mapMode === 'baidu' && (
          <div className="w-full aspect-[4/3]">
            <BaiduMapView
              locations={locations}
              selectedId={selectedId}
              highlightedId={highlightedId}
              filterCategory={filterCategory}
              onLocationClick={onLocationClick}
            />
          </div>
        )}

        {/* SVG 示意图模式 */}
        {mapMode === 'schematic' && (
          <div className="relative">
            {/* 工具栏 */}
            <div className="absolute top-3 right-3 z-10 flex gap-2">
              <button
                onClick={() => setViewBox(prev => ({ ...prev, w: prev.w * 0.8, h: prev.h * 0.8 }))}
                className="w-8 h-8 rounded-lg bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 text-sm font-bold"
                title="放大"
              >
                +
              </button>
              <button
                onClick={() => setViewBox(prev => ({ ...prev, w: prev.w * 1.25, h: prev.h * 1.25 }))}
                className="w-8 h-8 rounded-lg bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 text-sm font-bold"
                title="缩小"
              >
                −
              </button>
              <button
                onClick={resetView}
                className="w-8 h-8 rounded-lg bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 text-xs"
                title="重置"
              >
                ↺
              </button>
            </div>

            {/* 地点数量 */}
            <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-md border border-gray-200 px-3 py-1.5">
              <span className="text-xs text-gray-500">
                共 <span className="font-bold text-gray-700">{filteredLocations.length}</span> 个地点
              </span>
            </div>

            {/* SVG 地图 */}
            <svg
              ref={svgRef}
              viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
              className="w-full aspect-[4/3] cursor-grab active:cursor-grabbing"
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ touchAction: 'none' }}
            >
              {/* 背景 */}
              <rect x={0} y={0} width={1000} height={950} fill="#f8faf7" rx={12} />

              {/* 区域底色 */}
              {campusLayout.areas.map((area) => (
                <rect
                  key={area.id}
                  x={area.x - area.w / 2}
                  y={area.y - area.h / 2}
                  width={area.w}
                  height={area.h}
                  fill={area.color}
                  rx={16}
                  stroke="#e5e7eb"
                  strokeWidth={1}
                  strokeDasharray="6,3"
                />
              ))}

              {/* 区域标签 */}
              {campusLayout.areas.map((area) => (
                <text
                  key={`label-${area.id}`}
                  x={area.x}
                  y={area.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#9ca3af"
                  fontSize={14}
                  fontWeight={600}
                  opacity={0.6}
                >
                  {area.label}
                </text>
              ))}

              {/* 道路 */}
              {campusLayout.roads.map((road) => (
                <g key={road.id}>
                  <line
                    x1={road.x1} y1={road.y1} x2={road.x2} y2={road.y2}
                    stroke="#d1d5db" strokeWidth={12} strokeLinecap="round"
                  />
                  <line
                    x1={road.x1} y1={road.y1} x2={road.x2} y2={road.y2}
                    stroke="#e5e7eb" strokeWidth={6} strokeLinecap="round"
                    strokeDasharray="10,6"
                  />
                  <text
                    x={(road.x1 + road.x2) / 2}
                    y={(road.y1 + road.y2) / 2 - 10}
                    textAnchor="middle"
                    fill="#9ca3af"
                    fontSize={10}
                  >
                    {road.label}
                  </text>
                </g>
              ))}

              {/* 地点标注点 */}
              {filteredLocations.map((loc) => {
                const isSelected = loc.id === selectedId;
                const isHighlighted = loc.id === highlightedId;
                const dotColor = getDotColor(loc);
                const dotSize = getDotSize(loc);

                return (
                  <g
                    key={loc.id}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onLocationClick(loc);
                    }}
                    onMouseEnter={(e) => {
                      const rect = svgRef.current?.getBoundingClientRect();
                      if (rect) {
                        setTooltip({
                          x: e.clientX - rect.left,
                          y: e.clientY - rect.top,
                          location: loc,
                        });
                      }
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    {/* 外圈脉冲效果（选中时） */}
                    {isSelected && (
                      <circle
                        cx={loc.position.x}
                        cy={loc.position.y}
                        r={dotSize + 10}
                        fill="none"
                        stroke={dotColor}
                        strokeWidth={2}
                        opacity={0.3}
                        className="dot-pulse"
                      />
                    )}

                    {/* 高亮光晕 */}
                    {(isSelected || isHighlighted) && (
                      <circle
                        cx={loc.position.x}
                        cy={loc.position.y}
                        r={dotSize + 6}
                        fill={dotColor}
                        opacity={0.15}
                      />
                    )}

                    {/* 主体圆点 */}
                    <circle
                      cx={loc.position.x}
                      cy={loc.position.y}
                      r={dotSize}
                      fill="white"
                      stroke={dotColor}
                      strokeWidth={isSelected ? 3 : 2}
                      className="transition-all duration-200"
                    />

                    {/* 内圆 */}
                    <circle
                      cx={loc.position.x}
                      cy={loc.position.y}
                      r={dotSize * 0.45}
                      fill={dotColor}
                    />

                    {/* 名称标注 */}
                    {(isSelected || isHighlighted) && (
                      <text
                        x={loc.position.x}
                        y={loc.position.y - dotSize - 8}
                        textAnchor="middle"
                        fill={dotColor}
                        fontSize={isSelected ? 13 : 11}
                        fontWeight={isSelected ? 700 : 600}
                        className="select-none"
                      >
                        {loc.name.length > 10 ? loc.name.slice(0, 10) + '...' : loc.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Tooltip */}
            {tooltip && (
              <div
                className="absolute z-20 pointer-events-none bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg max-w-[180px]"
                style={{
                  left: Math.min(tooltip.x + 12, (svgRef.current?.clientWidth || 400) - 190),
                  top: tooltip.y - 40,
                }}
              >
                <div className="font-semibold">{tooltip.location.name}</div>
                <div className="text-gray-300 mt-0.5">{tooltip.location.type}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
