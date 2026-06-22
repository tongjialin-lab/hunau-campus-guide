'use client';

import Link from 'next/link';
import { getFeaturedLocations } from '@/lib/locations';

const quickLinks = [
  { href: '/campus', label: '校园总览', icon: '🗺️', desc: '了解校园整体布局，快速建立空间感', color: 'from-blue-500 to-blue-600' },
  { href: '/dormitories', label: '宿舍分布', icon: '🏠', desc: '查看各宿舍区位置和详细信息', color: 'from-orange-500 to-orange-600' },
  { href: '/canteens', label: '食堂分布', icon: '🍽️', desc: '了解食堂位置和特色菜品', color: 'from-red-500 to-red-600' },
  { href: '/food', label: '附近美食', icon: '🍜', desc: '探索学校周边的美食地图', color: 'from-amber-500 to-amber-600' },
  { href: '/guide', label: '生活指引', icon: '📋', desc: '新生最实用的校园生活建议', color: 'from-purple-500 to-purple-600' },
];

const features = [
  { icon: '🗺️', title: '校园地图', desc: '直观的校园示意图，帮你快速了解校园布局' },
  { icon: '🔍', title: '地点搜索', desc: '快速搜索校园地点，一键定位' },
  { icon: '📱', title: '手机友好', desc: '专为手机优化，随时随地查看' },
  { icon: '🏷️', title: '分类筛选', desc: '按类别查看宿舍、食堂、教学区等' },
];

export default function HomePage() {
  const featuredLocations = getFeaturedLocations().slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white">
        {/* 装饰背景 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-green-300 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-6">
              <span>🌾</span>
              <span>湖南农业大学 · 新生校园导览</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              你好，新同学！
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-2xl mx-auto mb-4">
              欢迎来到湖南农业大学
            </p>
            <p className="text-lg text-green-200 max-w-xl mx-auto mb-8">
              一站式校园导览，帮你快速了解农大的校园布局、宿舍、食堂和周边生活。
              让入学不再迷茫，从这份导览开始。
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/campus" className="btn-primary !bg-white !text-green-700 hover:!bg-green-50">
                🗺️ 查看校园总览
              </Link>
              <Link href="/guide" className="btn-outline !border-white !text-white hover:!bg-white/10">
                📋 新生生活指引
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 快速入口 */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="section-title text-center mb-2">快速入口</h2>
          <p className="section-subtitle text-center mb-10">选择你感兴趣的内容开始探索</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="card group text-center hover:-translate-y-1"
              >
                <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                  {link.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{link.label}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 特色地点推荐 */}
      <section className="py-16 bg-green-50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="section-title text-center mb-2">🌟 新生最关注的地点</h2>
          <p className="section-subtitle text-center mb-10">这些是新生入学后最常去的地方，提前了解一下吧</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredLocations.map((loc) => (
              <Link
                key={loc.id}
                href={`/campus`}
                className="card cursor-pointer hover:border-green-300 hover:shadow-md transition-all group block"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl shrink-0">{loc.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <h3 className="font-bold text-gray-800 group-hover:text-green-700 transition-colors">
                        {loc.name}
                      </h3>
                      {loc.featured && (
                        <span className="tag bg-amber-100 text-amber-700">🌟 推荐</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                      {loc.description}
                    </p>
                    {loc.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {loc.tags.slice(0, 4).map((tag) => (
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 功能特点 */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="section-title text-center mb-2">网站功能</h2>
          <p className="section-subtitle text-center mb-10">专为新生设计的校园导览体验</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feat, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-green-100 flex items-center justify-center text-3xl">
                  {feat.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{feat.title}</h3>
                <p className="text-sm text-gray-500">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 使用说明 */}
      <section className="py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="section-title text-center mb-2">📖 使用说明</h2>
          <p className="section-subtitle text-center mb-10">只需三步，快速上手</p>

          <div className="space-y-6">
            <div className="card flex gap-5">
              <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg shrink-0">1</div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">选择你感兴趣的板块</h3>
                <p className="text-sm text-gray-500">从首页快速入口进入校园总览、宿舍分布、食堂分布或附近美食页面</p>
              </div>
            </div>

            <div className="card flex gap-5">
              <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg shrink-0">2</div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">浏览地图和列表</h3>
                <p className="text-sm text-gray-500">在校园示意图上查看各地点位置，点击地点查看详细信息，使用分类筛选和搜索功能快速找到目标</p>
              </div>
            </div>

            <div className="card flex gap-5">
              <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg shrink-0">3</div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">提前规划校园生活</h3>
                <p className="text-sm text-gray-500">了解宿舍到食堂、教学楼的距离，提前熟悉校园主干道，为入学做好充分准备</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
