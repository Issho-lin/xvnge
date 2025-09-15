/*
 * @Author: linqibin
 * @Date: 2025-06-12 15:44:31
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-18 11:40:00
 * @Description: 
 * 
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved. 
 */
const { VITE_APP_ENV, VITE_APP_IP } = import.meta.env;

let env = VITE_APP_IP ?? "";
let ws = "ws";
const target = VITE_APP_IP ?? location.host;

if (VITE_APP_ENV !== "dev" && location.protocol === "https:") {
  ws = "wss";
}

if (VITE_APP_ENV === "dev") {
  env = "/api";
} else {
  env = "/api";
}

console.log("env", env, VITE_APP_ENV);

export default {
  env,
  ws,
  target: target.replace(/(http|https):\/\//, "")
};
