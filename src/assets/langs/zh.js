import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
const zh = {
  home: {
    home: '首页',
    calculator: '计算器',
    ranks: '排行榜',
    statistical: '统计',
    aboutUs: '关于我们'
  },
  ...zhLocale // 或者用 Object.assign({ message: '你好' }, zhLocale)
}

export default zh
