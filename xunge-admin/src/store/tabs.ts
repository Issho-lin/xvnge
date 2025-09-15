/*
 * @Author: linqibin
 * @Date: 2025-06-11 16:15:00
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-13 17:20:18
 * @Description:
 *
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved.
 */
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type ResMenuType = {
  label: string;
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state?: any;
};

type TabsState = {
  tabs: ResMenuType[];
  addTab: (payload: ResMenuType) => void;
  removeTab: (payload: string) => void;
  clearTabs: () => void;
  closeCurrentTab: () => void;
};

export const useTabsStore = create<TabsState>()(
  devtools(
    persist(
      immer((set, get) => ({
        tabs: [],
        addTab: (payload) => {
          const state = get();
          if (state.tabs.find((item) => item.key === payload.key)) {
            set((state) => {
              state.tabs.forEach((item) => {
                if (item.key === payload.key) {
                  item.state = payload.state;
                }
              });
            });
            return;
          }
          set({ tabs: [...state.tabs, payload] });
        },
        removeTab: (payload) => {
          set((state) => ({
            tabs: state.tabs.filter((item) => item.key !== payload),
          }));
        },
        clearTabs: () => {
          set({ tabs: [] });
        },
        closeCurrentTab: () => {
          const index = get().tabs.findIndex((item) => {
            return item.key === location.pathname + location.search;
          });
          set((state) => {
            state.tabs.splice(index, 1);
          });
        },
      })),
      {
        name: "tabs",
      }
    )
  )
);
