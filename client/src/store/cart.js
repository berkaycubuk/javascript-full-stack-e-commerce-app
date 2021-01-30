import create from 'zustand'
import Cookies from 'js-cookie'

const useStore = create(set => ({
  items: 0,
  itemList: [],
  totalPrice: 0,
  addNewItem: (item) => set(state => {
    state.itemList[state.itemList.length] = item
    Cookies.set('cartList', state.itemList)
    return{ items: state.items + 1, itemList: state.itemList, totalPrice: state.totalPrice + item.price }
  }),
  empty: () => set(() => {
    Cookies.remove('cartList')
    return { items: 0, itemList: [], totalPrice: 0 }
  }),
  deleteItem: (item) => set(state => {
    let found = false
    state.itemList = state.itemList.filter(data => {
      if (data == item && !found) {
        found = true
        return false
      }
      return true
    })

    state.items = state.items - 1
    state.totalPrice = state.totalPrice - item.price

    Cookies.set('cartList', state.itemList)

    return {
      items: state.items,
      itemList: state.itemList,
      totalPrice: state.totalPrice
    }
  }),
  setList: (list) => set(() => {
    let total = 0
    let count = 0
    list.map((item) => {
      count += 1
      total += item.price
    })
    return { itemList: list, items: count, totalPrice: total }
  })
}))

export default useStore