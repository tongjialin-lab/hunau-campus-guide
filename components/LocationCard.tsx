'use client';

import { Location } from '@/types';
import { getCategoryColor } from '@/lib/locations';

interface LocationCardProps {
  location: Location;
  onClick?: (location: Location) => void;
  compact?: boolean;
  showActions?: boolean;
}

export default function LocationCard({ location, onClick, compact = false }: LocationCardProps) {
  const categoryColor = getCategoryColor(location.category);

  if (compact) {
    return (
      <button
        onClick={() => onClick?.(location)}
        className="w-full text-left card p-4 hover:border-green-300 hover:shadow-md transition-all group"
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl shrink-0">{location.icon}</span>
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-gray-800 text-sm group-hover:text-green-700 transition-colors truncate">
              {location.name}
            </h4>
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{location.description}</p>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div
      className="card cursor-pointer hover:border-green-300 hover:shadow-md transition-all group"
      onClick={() => onClick?.(location)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick?.(location); }}
    >
      {/* 类别色条 */}
      <div className="h-1 -mx-5 -mt-5 mb-4 rounded-t-2xl" style={{ backgroundColor: categoryColor }} />

      <div className="flex items-start gap-3">
        <span className="text-3xl shrink-0">{location.icon}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <h3 className="font-bold text-gray-800 group-hover:text-green-700 transition-colors">
              {location.name}
            </h3>
            {location.featured && (
              <span className="tag bg-amber-100 text-amber-700">🌟 推荐</span>
            )}
          </div>
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
            {location.description}
          </p>
          {location.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {location.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag.id}
                  className="tag text-xs"
                  style={{
                    backgroundColor: tag.color ? `${tag.color}15` : '#f0fdf4',
                    color: tag.color || '#16a34a',
                  }}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
