'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getFeaturedLocations } from '@/lib/locations';

const guideSections = [
  {
    id: 'must-know',
    icon: '⭐',
    title: '新生最需要了解的区域',
    color: 'from-amber-400 to-orange-500',
    items: [
      { name: '南校门（正门）', desc: '报到主要入口，进门就是农大路', link: '/campus' },
      { name: '图书馆', desc: '校园地标，自习圣地，新生必去', link: '/campus' },
      { name: '学生服务中心', desc: '办理校园卡、缴费一站式', link: '/campus' },
      { name: '第一食堂', desc: '规模最大的食堂，菜品最丰富', link: '/canteens' },
      { name: '东田径场', desc: '新生军训主要场地', link: '/campus' },
    ],
  },
  {
    id: 'dorm-to-canteen',
    icon: '🏠→🍽️',
    title: '宿舍到食堂的关系',
    color: 'from-green-400 to-emerald-500',
    items: [
      { name: '芷兰公寓 → 第一食堂', desc: '步行约 3 分钟，最近路线', link: '/dormitories' },
      { name: '丰泽公寓 → 第二食堂', desc: '步行约 2 分钟，非常方便', link: '/dormitories' },
      { name: '金岸公寓 → 第一食堂', desc: '步行约 5 分钟', link: '/dormitories' },
      { name: '东湖公寓 → 东湖食堂', desc: '步行约 2 分钟，可赏湖景', link: '/dormitories' },
    ],
  },
  {
    id: 'dorm-to-teaching',
    icon: '🏠→📖',
    title: '宿舍到教学区的关系',
    color: 'from-blue-400 to-indigo-500',
    items: [
      { name: '芷兰公寓 → 第一教学楼', desc: '步行约 5 分钟，最近的教学楼', link: '/dormitories' },
      { name: '丰泽公寓 → 第二教学楼', desc: '步行约 8 分钟', link: '/dormitories' },
      { name: '金岸公寓 → 第一教学楼', desc: '步行约 10 分钟', link: '/dormitories' },
      { name: '东湖公寓 → 第三教学楼', desc: '步行约 7 分钟', link: '/dormitories' },
    ],
  },
  {
    id: 'first-day',
    icon: '🎒',
    title: '报到后最值得先熟悉的区域',
    color: 'from-purple-400 to-violet-500',
    items: [
      { name: '1. 你的宿舍楼及周边', desc: '先熟悉居住环境，找到最近的食堂和超市', link: '/dormitories' },
      { name: '2. 第一教学楼', desc: '大部分公共课的上课地点，提前踩点', link: '/campus' },
      { name: '3. 图书馆', desc: '自习和借书的主要场所，需要入馆教育', link: '/campus' },
      { name: '4. 南校门周边', desc: '红旗市场、快递点、银行都在这里', link: '/food' },
      { name: '5. 学生服务中心', desc: '办理各种校园事务的地方', link: '/campus' },
    ],
  },
  {
    id: 'tips',
    icon: '💡',
    title: '校园生活建议',
    color: 'from-teal-400 to-cyan-500',
    items: [
      { name: '校园卡随身带', desc: '食堂、图书馆、门禁都需要校园卡，报到后尽快办理' },
      { name: '提前下载校园地图', desc: '校园面积较大，建议保存一张校园示意图到手机' },
      { name: '加入新生群', desc: '提前加入学院/专业新生群，获取最新通知' },
      { name: '了解快递点位置', desc: '网购是大学生活的重要部分，提前知道快递点在哪' },
      { name: '办一张长沙交通卡', desc: '方便乘坐公交和地铁，南校门外就有公交站' },
      { name: '军训防晒必备', desc: '长沙夏天炎热，军训期间做好防晒准备' },
      { name: '探索周边美食', desc: '红旗路是美食聚集地，多走走会有惊喜', link: '/food' },
    ],
  },
];

export default function GuidePage() {
  const featuredLocations = getFeaturedLocations();
  const [expandedSection, setExpandedSection] = useState<string | null>('must-know');

  return (
    <div className="min-h-screen bg-green-50/50">
      {/* 页面头部 */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <h1 className="section-title">📋 新生生活指引</h1>
          <p className="section-subtitle">
            为即将入学的新生准备的实用校园生活指南。提前了解，入学不慌。
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-4">
          {guideSections.map((section) => (
            <div key={section.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* 标题栏 */}
              <button
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-colors ${
                  expandedSection === section.id ? 'bg-gray-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center text-xl shrink-0 shadow-sm`}>
                  {section.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800">{section.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{section.items.length} 条内容</p>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${expandedSection === section.id ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* 内容 */}
              {expandedSection === section.id && (
                <div className="px-5 pb-5 pt-1 border-t border-gray-100">
                  <div className="space-y-3 mt-3">
                    {section.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 bg-gradient-to-br ${section.color}`} />
                        <div className="min-w-0 flex-1">
                          {item.link ? (
                            <Link href={item.link} className="font-medium text-sm text-gray-800 hover:text-green-600 transition-colors">
                              {item.name}
                            </Link>
                          ) : (
                            <span className="font-medium text-sm text-gray-800">{item.name}</span>
                          )}
                          <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                        </div>
                        {item.link && (
                          <Link href={item.link} className="text-gray-300 hover:text-green-500 transition-colors shrink-0 mt-0.5">
                            →
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 推荐地点 */}
        <div className="mt-10">
          <h2 className="section-title text-center mb-2">🌟 新生最常去的地点</h2>
          <p className="section-subtitle text-center mb-6">点击查看详情，提前熟悉这些重要地点</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredLocations.slice(0, 6).map((loc) => (
              <Link
                key={loc.id}
                href={`/campus`}
                className="card group flex items-start gap-3 hover:border-green-300"
              >
                <span className="text-3xl shrink-0">{loc.icon}</span>
                <div>
                  <h4 className="font-semibold text-gray-800 group-hover:text-green-700">{loc.name}</h4>
                  <p className="text-sm text-gray-500 mt-0.5">{loc.description}</p>
                </div>
                <span className="text-gray-300 group-hover:text-green-500 transition-colors ml-auto shrink-0">→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 快速导航链接 */}
        <div className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-800 mb-4 text-center">📌 快速导航</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/campus" className="btn-outline !text-sm !py-2.5">🗺️ 校园总览</Link>
            <Link href="/dormitories" className="btn-outline !text-sm !py-2.5">🏠 宿舍分布</Link>
            <Link href="/canteens" className="btn-outline !text-sm !py-2.5">🍽️ 食堂分布</Link>
            <Link href="/food" className="btn-outline !text-sm !py-2.5">🍜 附近美食</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
