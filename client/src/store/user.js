import create from 'zustand'

const useStore = create(set => ({
  user: undefined,
  setUser: (user) => set(() => ({user: user}))
}))

export default useStore