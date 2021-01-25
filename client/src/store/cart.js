import create from 'zustand'

const useStore = create(set => ({
  items: 0,
  addNewItem: () => set(state => ({ items: state.items + 1 }))
}))

export default useStore