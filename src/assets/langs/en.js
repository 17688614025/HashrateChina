import enLocale from 'element-ui/lib/locale/lang/en'
const en = {
  home: {
    home: 'Home',
    calculator: 'Calculator',
    ranks: 'Top Miners',
    statistical: 'Statistical',
    aboutUs: 'About us'
  },
  ...enLocale // 或者用 Object.assign({ message: 'hello' }, enLocale)
}

export default en
