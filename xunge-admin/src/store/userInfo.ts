/*
 * @Author: linqibin
 * @Date: 2025-07-02 11:05:41
 * @LastEditors: linqibin
 * @LastEditTime: 2025-09-28 09:36:12
 * @Description: 
 * 
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved. 
 */
import type { ResUserInfo } from '@/api/type'
import { getUserInfoApi } from '@/api/user'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type UserState = {
    userType: number
    userInfo: ResUserInfo | null
    setUserType: (type: number) => void
    setHeadPhoto: (photo: string) => void
    getUserInfo: () => Promise<ResUserInfo>
}

export const useUserInfo = create<UserState>()(
  devtools(
    immer((set) => ({
        userType: 1,
        userInfo: null,
        getUserInfo: async () => {
            const res = await getUserInfoApi()
            set({ userInfo: res.data })
            return res.data
        },
        setUserType: (type: number) => {
            set({ userType: type })
        },
        setHeadPhoto: (photo: string) => {
            set((state) => {
                state.userInfo!.headPhoto = photo
            })
        }
    }))
  ),
)