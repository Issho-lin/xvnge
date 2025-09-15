import dayjs from "dayjs";
import md5 from "md5";
import Cookies from "js-cookie";
import { AES } from "./crypto";

export const getAuthorization = () => {
  const random = Math.floor(Math.random() * 1000);
  const timestamp = dayjs().format("YYYYMMDD");
  const key = "u8gt8542we";
  const sign = md5(
    `random${random}timestamp${timestamp}key${key}`
  ).toLocaleUpperCase();

  const token = Cookies.get("token");

  return {
    random,
    timestamp,
    sign,
    Authorization: `Bearer ${AES.decrypt(token || '')}`,
  };
};

export const generateRecords = <T>(
  data: { records: T[]; total: number },
  page: { pageNum: number; pageSize: number }
) => {
  return {
    records: data.records.map((item, index) => ({
      ...item,
      index: (page.pageNum - 1) * page.pageSize + index + 1,
    })),
    total: data.total,
  };
};

/**
 * 将map转成 options下拉选择列表
 * @param map
 * @returns
 */
export const generateMapToOptions = <T>(map: Map<string | number, T>) => {
  return [...map.entries()].map(([value, label]) => ({ value, label }))
}

// 生成uuid
export const getUUID = (length = 32) => {
  const s: string[] = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < length + 4; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((+s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = ''

  const uuid = s.join('')
  return uuid
}