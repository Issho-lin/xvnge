import Storage from "@/store";
import { useState } from "react";
import { getImageHostApi } from "@/api/common";

export function useImageHost() {
  const [imagePath, setImagePath] = useState(Storage.get("imagePath"));
  const getImagePath = async () => {
    if (imagePath) return imagePath;
    const res = await getImageHostApi();
    if (res.code === 200) {
      setImagePath(res.data);
      Storage.set("imagePath", res.data);
    }
    return res.data;
  };
  return { getImagePath };
}
