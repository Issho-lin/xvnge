import type { ResUserInfo } from '@/api/type'
import { getUserInfoApi } from '@/api/user'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type UserState = {
    userInfo: ResUserInfo | null
    setHeadPhoto: (photo: string) => void
    getUserInfo: () => Promise<ResUserInfo>
}

export const useUserInfo = create<UserState>()(
  devtools(
    immer((set) => ({
        userInfo: null,
        getUserInfo: async () => {
            const res = await getUserInfoApi()
            set({ userInfo: res.data })
            return res.data
        },
        setHeadPhoto: (photo: string) => {
            set((state) => {
                state.userInfo!.headPhoto = photo
            })
        }
    }))
  ),
)