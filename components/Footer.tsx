export default function Footer() {
  return (
    <footer className="bg-green-900 text-green-100 mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 关于本站 */}
          <div>
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span>🌾</span> 关于本站
            </h3>
            <p className="text-green-300 text-sm leading-relaxed">
              湖南农业大学新生校园导览网站，专为即将报名和即将入学的新生打造。
              帮助大家快速了解湖南农业大学的校园布局、宿舍、食堂和周边生活信息。
            </p>
          </div>

          {/* 快速导航 */}
          <div>
            <h3 className="text-lg font-bold mb-3">快速导航</h3>
            <ul className="space-y-1.5 text-sm text-green-300">
              <li><a href="/campus" className="hover:text-white transition-colors">🗺️ 校园总览</a></li>
              <li><a href="/dormitories" className="hover:text-white transition-colors">🏠 宿舍分布</a></li>
              <li><a href="/canteens" className="hover:text-white transition-colors">🍽️ 食堂分布</a></li>
              <li><a href="/food" className="hover:text-white transition-colors">🍜 附近美食</a></li>
              <li><a href="/guide" className="hover:text-white transition-colors">📋 生活指引</a></li>
            </ul>
          </div>

          {/* 声明 */}
          <div>
            <h3 className="text-lg font-bold mb-3">声明</h3>
            <p className="text-green-300 text-sm leading-relaxed">
              本站地点数据为模拟数据，仅供参考。实际校园布局和商家信息请以官方公布为准。
              网站为新生导览项目原型，数据可随时替换为真实信息。
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-green-800 text-center text-green-400 text-sm">
          <p>湖南农业大学新生校园导览 · 为新生打造的校园生活指南</p>
          <p className="mt-1">数据仅供导览参考，以实际情况为准</p>
        </div>
      </div>
    </footer>
  );
}
