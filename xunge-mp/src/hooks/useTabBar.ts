import Taro, { useDidShow } from '@tarojs/taro'

export function useTabBar(index: number) {
  useDidShow(() => {
    Taro.hideHomeButton()
    const pageObj = Taro.getCurrentInstance().page
    const tabbar = Taro.getTabBar(pageObj)
    // @ts-ignore
    tabbar.setState({
      selected: index,
    })
  })
}
