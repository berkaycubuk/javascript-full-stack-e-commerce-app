import create from 'zustand'

const useStore = create(set => ({
  items: 0,
  itemList: [],
  totalPrice: 0,
  addNewItem: (item) => set(state => {
    state.itemList[state.itemList.length] = item
    return{ items: state.items + 1, itemList: state.itemList, totalPrice: state.totalPrice + item.price }
  })
}))

export default useStore