import { getImageHostApi } from '@/api/common'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type ImageHostState = {
    imageHost: string
    getImageHost: () => Promise<string>
}

export const useImageHost = create<ImageHostState>()(
  devtools(
    immer((set) => ({
        imageHost: '',
        getImageHost: async () => {
            const res = await getImageHostApi()
            set({ imageHost: res.data })
            return res.data
        }
    }))
  ),
)