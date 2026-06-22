'use client';

import { Location } from '@/types';
import { getCategoryLabel, getCategoryColor, getRelatedLocations } from '@/lib/locations';

interface LocationDetailProps {
  location: Location;
  onClose: () => void;
  allLocations: Location[];
}

export default function LocationDetail({ location, onClose, allLocations }: LocationDetailProps) {
  const relatedLocations = getRelatedLocations(location);
  const categoryColor = getCategoryColor(location.category);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* 遮罩 */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* 卡片 */}
      <div className="relative w-full sm:max-w-lg max-h-[85vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-[slideUp_0.3s_ease-out]">
        {/* 类别色条 */}
        <div className="h-1.5" style={{ backgroundColor: categoryColor }} />

        {/* 头部 */}
        <div className="p-6 pb-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
              style={{ backgroundColor: `${categoryColor}15` }}>
              {location.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h2 className="text-xl font-bold text-gray-800">{location.name}</h2>
                {location.featured && (
                  <span className="tag bg-amber-100 text-amber-700 text-xs">🌟 推荐</span>
                )}
              </div>
              <span className="tag text-xs" style={{
                backgroundColor: `${categoryColor}15`,
                color: categoryColor,
              }}>
                {getCategoryLabel(location.category)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors shrink-0"
              aria-label="关闭"
            >
              ✕
            </button>
          </div>
        </div>

        {/* 内容 */}
        <div className="px-6 pb-6 overflow-y-auto max-h-[55vh]">
          {/* 描述 */}
          <p className="text-gray-600 leading-relaxed mb-4">
            {location.detailDescription || location.description}
          </p>

          {/* 标签 */}
          {location.tags.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">标签</h4>
              <div className="flex flex-wrap gap-2">
                {location.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="tag text-sm"
                    style={{
                      backgroundColor: tag.color ? `${tag.color}15` : '#f0fdf4',
                      color: tag.color || '#16a34a',
                    }}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 位置信息 */}
          <div className="mb-4 p-3 bg-gray-50 rounded-xl">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">📍 位置信息</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
              <div>
                <span className="text-gray-400">经度：</span>
                {location.position.lng.toFixed(4)}
              </div>
              <div>
                <span className="text-gray-400">纬度：</span>
                {location.position.lat.toFixed(4)}
              </div>
              <div>
                <span className="text-gray-400">坐标 X：</span>
                {location.position.x}
              </div>
              <div>
                <span className="text-gray-400">坐标 Y：</span>
                {location.position.y}
              </div>
            </div>
          </div>

          {/* 关联地点 */}
          {relatedLocations.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">🔗 关联地点</h4>
              <div className="flex flex-wrap gap-2">
                {relatedLocations.map((rel) => (
                  <span
                    key={rel.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-sm text-gray-600"
                  >
                    <span>{rel.icon}</span>
                    {rel.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
