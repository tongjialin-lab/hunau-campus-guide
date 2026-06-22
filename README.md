# 🌾 湖南农业大学新生校园导览网站

> 专为即将报名和即将入学的湖南农业大学新生打造的校园导览 + 生活地图入口网站。

## 📖 项目简介

这是一个面向新生（高三学生、大一新生、想了解农大的人）的校园导览网站，帮助用户：
- 快速了解湖南农业大学的校园整体布局
- 查看宿舍、食堂、教学区、图书馆、体育设施等分布
- 探索学校周边的美食点位
- 获取新生入学的生活指引和建议

## 🚀 技术栈

- **框架**: Next.js 14（App Router）
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **地图**: 百度地图 JavaScript API GL 版（真实地图底图）+ 自定义 SVG 校园示意图，支持 Tab 切换
- **部署**: 支持静态导出，可部署到 Vercel / Cloudflare Pages / GitHub Pages

## 📁 项目结构

```
├── app/                    # Next.js App Router 页面
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页
│   ├── globals.css         # 全局样式
│   ├── campus/             # 校园总览页
│   │   └── page.tsx
│   ├── dormitories/        # 宿舍分布页
│   │   └── page.tsx
│   ├── canteens/           # 食堂分布页
│   │   └── page.tsx
│   ├── food/               # 附近美食页
│   │   └── page.tsx
│   └── guide/              # 生活指引页
│       └── page.tsx
├── components/             # 可复用组件
│   ├── Navbar.tsx          # 顶部导航栏
│   ├── Footer.tsx          # 页脚
│   ├── CampusMap.tsx       # 地图包装组件（Tab 切换 SVG/百度地图）
│   ├── BaiduMapView.tsx    # 百度地图 GL 版组件
│   ├── LocationList.tsx    # 地点列表 + 搜索 + 筛选
│   ├── LocationCard.tsx    # 地点卡片
│   └── LocationDetail.tsx  # 地点详情弹窗
├── data/                   # 结构化地点数据
│   ├── campus-locations.ts # 校园设施数据
│   ├── dormitories.ts      # 宿舍数据
│   ├── canteens.ts         # 食堂数据
│   ├── sports.ts           # 体育设施数据
│   └── nearby-restaurants.ts # 周边美食数据
├── lib/                    # 工具函数
│   └── locations.ts        # 地点查询、筛选、导出函数
├── types/                  # TypeScript 类型定义
│   └── index.ts            # 统一类型定义
├── next.config.js          # Next.js 配置
├── tailwind.config.ts      # Tailwind CSS 配置
├── tsconfig.json           # TypeScript 配置
└── package.json            # 项目依赖
```

## 🏃 本地运行

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 打开浏览器访问
# http://localhost:3000
```

## 📦 构建和部署

### 静态导出（推荐用于 GitHub Pages / Cloudflare Pages）

```bash
npm run build
```

构建产物在 `out/` 目录中，可直接部署到任何静态托管服务。

### 部署到 Vercel

1. 将项目推送到 GitHub 仓库
2. 在 [Vercel](https://vercel.com) 导入该仓库
3. Vercel 会自动识别 Next.js 项目并配置构建设置
4. 部署完成后即可通过 Vercel 提供的域名访问

### 部署到 Cloudflare Pages

1. 将项目推送到 GitHub 仓库
2. 在 Cloudflare Pages 中创建新项目
3. 构建设置：
   - 构建命令: `npm run build`
   - 输出目录: `out`
4. 部署即可

### 部署到 GitHub Pages

```bash
# 使用 gh-pages 或 GitHub Actions
npm run build
# 将 out/ 目录部署到 gh-pages 分支
```

## 📊 数据格式

所有地点数据使用统一的 `Location` 接口定义（详见 `types/index.ts`）：

```typescript
interface Location {
  id: string;           // 唯一标识
  name: string;         // 地点名称
  type: LocationType;   // 细粒度类型
  category: LocationCategory; // 类别（用于筛选）
  description: string;  // 简短描述
  detailDescription?: string; // 详细描述
  position: GeoPosition; // 地理位置（含经纬度和示意图坐标）
  tags: LocationTag[];  // 标签
  featured: boolean;    // 是否为推荐地点
  icon: string;         // 图标
  relatedIds?: string[]; // 关联地点ID
}
```

坐标系统：
- `lng` / `lat`：模拟经纬度，可替换为真实经纬度
- `x` / `y`：校园示意图相对坐标（0-1000）

## 🔄 替换为真实数据

1. 修改 `data/` 目录下的数据文件
2. 更新每个地点的 `position.lng` 和 `position.lat` 为真实经纬度
3. 百度地图已通过 `BaiduMapView.tsx` 接入，使用 `components/BaiduMapView.tsx` 中的 `BAIDU_MAP_AK` 变量
4. 地点数据与地图展示逻辑已解耦，替换数据不需要修改前端组件

### 更换百度地图 AK

如需更换自己的百度地图 API Key，修改 `components/BaiduMapView.tsx` 中的：

```typescript
const BAIDU_MAP_AK = '你的AK';
```

AK 申请地址：https://lbsyun.baidu.com/apiconsole/key

## 🗺️ 地图功能说明

网站地图支持两种模式（Tab 切换）：

1. **百度地图**（默认）：基于百度地图 JavaScript API GL 版，使用真实地理底图
   - 湖南农业大学真实坐标：`113.083205, 28.180955`
   - 所有地点标注在真实地理位置上
   - 支持点击标注查看详情、飞行定位动画
   - 支持缩放、拖拽等地图操作

2. **校园示意图**：自定义 SVG 示意图
   - 展示校园区域划分（教学区/运动区/中心区）
   - 显示主干道路线
   - 支持缩放拖拽
   - 适合快速建立校园空间感

## 🌐 为百度地图 AI 准备

本项目已为百度地图 AI 抓取做了以下准备：
- 页面语义清晰、结构明确
- 地点信息独立为结构化数据文件
- 每个地点有清晰的中文说明
- 地点列表和分类清晰可读
- 可通过 `lib/locations.ts` 中的 `exportAsGeoJSON()` 导出 GeoJSON 格式

## 📝 注意事项

- 当前地点数据为模拟数据，仅供导览参考
- 实际校园布局和商家信息请以官方公布为准
- 本项目为新生导览原型，数据可随时替换为真实信息

## 📄 许可

本项目仅供学习和参考使用。
