'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Location, LocationCategory } from '@/types';
import { getCategoryColor } from '@/lib/locations';

// 百度地图 GL 类型声明
declare global {
  interface Window {
    BMapGL: any;
    baiduMapLoaded: boolean;
    baiduMapCallbacks: Array<() => void>;
  }
}

interface BaiduMapViewProps {
  locations: Location[];
  selectedId: string | null;
  highlightedId: string | null;
  filterCategory: LocationCategory | 'all';
  onLocationClick: (location: Location) => void;
}

// 百度地图 AK
const BAIDU_MAP_AK = 'i2AYJoG6l2XEyA39yEf7NA8P97vD1mxw';

// 湖南农业大学中心坐标
const CENTER_LNG = 113.083205;
const CENTER_LAT = 28.180955;

export default function BaiduMapView({
  locations,
  selectedId,
  highlightedId,
  filterCategory,
  onLocationClick,
}: BaiduMapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());
  const labelRef = useRef<Map<string, any>>(new Map());
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // 过滤地点
  const filteredLocations = filterCategory === 'all'
    ? locations
    : locations.filter((l) => l.category === filterCategory);

  // 加载百度地图脚本
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 如果已经加载了 BMapGL，直接初始化
    if (window.BMapGL) {
      setIsLoaded(true);
      return;
    }

    // 如果正在加载中，加入回调队列
    if (window.baiduMapCallbacks) {
      window.baiduMapCallbacks.push(() => setIsLoaded(true));
      return;
    }

    // 初始化回调队列
    window.baiduMapCallbacks = [];

    const script = document.createElement('script');
    script.src = `//api.map.baidu.com/api?type=webgl&v=1.0&ak=${BAIDU_MAP_AK}`;
    script.async = true;
    script.onload = () => {
      window.baiduMapLoaded = true;
      setIsLoaded(true);
      // 执行所有等待的回调
      window.baiduMapCallbacks.forEach((cb) => cb());
      window.baiduMapCallbacks = [];
    };
    script.onerror = () => {
      console.error('百度地图脚本加载失败');
      setLoadError(true);
    };
    document.head.appendChild(script);

    return () => {
      // 不移除 script，避免重复加载问题
    };
  }, []);

  // 初始化地图
  useEffect(() => {
    if (!isLoaded || !mapContainerRef.current || !window.BMapGL) return;

    // 如果已经初始化过地图实例，直接返回
    if (mapInstanceRef.current) return;

    try {
      const BMapGL = window.BMapGL;

      // 创建地图实例
      const map = new BMapGL.Map(mapContainerRef.current, {
        enableMapClick: false,
      });

      // 设置中心点和缩放级别
      const center = new BMapGL.Point(CENTER_LNG, CENTER_LAT);
      map.centerAndZoom(center, 16);

      // 启用鼠标滚轮缩放
      map.enableScrollWheelZoom(true);

      // 添加比例尺
      map.addControl(new BMapGL.ScaleControl());

      // 添加缩放控件
      map.addControl(new BMapGL.ZoomControl());

      // 设置地图样式（校园风格 - 清新简洁）
      map.setMapStyleV2({
        styleId: '27c7c2a4d2e6a2b9c5d4e3f1a0b9c8d7', // 清新风格
      });

      // 尝试使用自定义样式（如果失败就用默认样式）
      try {
        map.setMapStyle({
          styleJson: [
            {
              featureType: 'water',
              elementType: 'all',
              stylers: { color: '#d4e7f7' },
            },
            {
              featureType: 'land',
              elementType: 'all',
              stylers: { color: '#f8faf7' },
            },
            {
              featureType: 'green',
              elementType: 'all',
              stylers: { color: '#e8f5e9' },
            },
            {
              featureType: 'highway',
              elementType: 'all',
              stylers: { color: '#e5e7eb' },
            },
            {
              featureType: 'arterial',
              elementType: 'all',
              stylers: { color: '#f3f4f6' },
            },
            {
              featureType: 'poi',
              elementType: 'all',
              stylers: { visibility: 'off' },
            },
          ],
        });
      } catch (e) {
        // 样式设置失败，使用默认样式
      }

      mapInstanceRef.current = map;

      // 地图加载完成后添加标记
      addMarkers(map);
    } catch (err) {
      console.error('百度地图初始化失败:', err);
      setLoadError(true);
    }
  }, [isLoaded]);

  // 添加/更新标记
  const addMarkers = useCallback((map: any) => {
    if (!map || !window.BMapGL) return;
    const BMapGL = window.BMapGL;

    // 清除旧标记
    markersRef.current.forEach((marker) => map.removeOverlay(marker));
    labelRef.current.forEach((label) => map.removeOverlay(label));
    markersRef.current.clear();
    labelRef.current.clear();

    // 添加新标记
    filteredLocations.forEach((loc) => {
      const point = new BMapGL.Point(loc.position.lng, loc.position.lat);
      const isSelected = loc.id === selectedId;
      const isHighlighted = loc.id === highlightedId;

      // 获取颜色
      let color = getCategoryColor(loc.category);
      if (isSelected) color = '#ea580c';
      if (isHighlighted) color = '#2563eb';

      // 创建自定义图标
      const size = isSelected ? 36 : isHighlighted ? 30 : loc.featured ? 26 : 22;
      const iconUrl = createMarkerIcon(color, size);

      const marker = new BMapGL.Marker(point, {
        icon: new BMapGL.Icon(iconUrl, new BMapGL.Size(size, size), {
          anchor: new BMapGL.Size(size / 2, size / 2),
        }),
      });

      // 点击事件
      marker.addEventListener('click', () => {
        onLocationClick(loc);
      });

      // 悬停事件
      marker.addEventListener('mouseover', () => {
        mapContainerRef.current!.style.cursor = 'pointer';
      });
      marker.addEventListener('mouseout', () => {
        mapContainerRef.current!.style.cursor = '';
      });

      map.addOverlay(marker);
      markersRef.current.set(loc.id, marker);

      // 为选中或高亮的点添加文字标签
      if (isSelected || isHighlighted) {
        const label = new BMapGL.Label(loc.name, {
          position: point,
          offset: new BMapGL.Size(0, -(size / 2 + 16)),
        });
        label.setStyle({
          backgroundColor: isSelected ? '#ea580c' : '#2563eb',
          color: '#fff',
          fontSize: '12px',
          padding: '4px 8px',
          borderRadius: '6px',
          border: 'none',
          whiteSpace: 'nowrap',
          fontWeight: '600',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        });
        map.addOverlay(label);
        labelRef.current.set(loc.id, label);
      }
    });
  }, [filteredLocations, selectedId, highlightedId, onLocationClick]);

  // 当过滤结果或选中状态变化时更新标记
  useEffect(() => {
    if (isLoaded && mapInstanceRef.current) {
      addMarkers(mapInstanceRef.current);
    }
  }, [isLoaded, addMarkers]);

  // 当选中地点变化时，飞行动画到该地点
  useEffect(() => {
    if (!isLoaded || !mapInstanceRef.current || !selectedId || !window.BMapGL) return;
    const BMapGL = window.BMapGL;
    const loc = locations.find((l) => l.id === selectedId);
    if (!loc) return;

    const point = new BMapGL.Point(loc.position.lng, loc.position.lat);
    // 平滑移动到选中地点
    mapInstanceRef.current.flyTo(point, 17);
  }, [selectedId, isLoaded, locations]);

  // 创建 marker 图标（使用 canvas 生成 data URL）
  const createMarkerIcon = (color: string, size: number): string => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    const r = size / 2;
    const cx = r;
    const cy = r;

    // 外阴影
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 3;
    ctx.shadowOffsetY = 1;

    // 外圈白色
    ctx.beginPath();
    ctx.arc(cx, cy, r - 1, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    ctx.shadowColor = 'transparent';

    // 彩色边框
    ctx.beginPath();
    ctx.arc(cx, cy, r - 2, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // 内部彩色圆
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    return canvas.toDataURL();
  };

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 rounded-2xl border border-gray-200">
        <div className="text-center p-8">
          <div className="text-4xl mb-4">🗺️</div>
          <p className="text-gray-600 font-medium mb-2">地图加载失败</p>
          <p className="text-sm text-gray-400">
            请检查网络连接或确认百度地图 AK 是否有效
          </p>
          <p className="text-xs text-gray-400 mt-1">
            AK: {BAIDU_MAP_AK.slice(0, 8)}...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* 加载中 */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-50 rounded-2xl border border-gray-200">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-3 border-green-500 border-t-transparent rounded-full mx-auto mb-3" />
            <p className="text-gray-500 text-sm">正在加载百度地图...</p>
          </div>
        </div>
      )}

      {/* 地图容器 */}
      <div
        ref={mapContainerRef}
        className="w-full h-full min-h-[400px] rounded-2xl"
        style={{ background: '#f8faf7' }}
      />

      {/* 地点数量指示 */}
      {isLoaded && (
        <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-md border border-gray-200 px-3 py-1.5">
          <span className="text-xs text-gray-500">
            共 <span className="font-bold text-gray-700">{filteredLocations.length}</span> 个地点
          </span>
        </div>
      )}
    </div>
  );
}
