import { ReqById, ResDoc, ResSolution } from "@/api/type";
import { useImageHost } from "@/hooks/useImageHost";
import { useState } from "react";
import * as Doc from "@/api/document";
import { useDidShow } from "@tarojs/taro";

export function useSolution(immediate = true) {
  const { getImagePath } = useImageHost();
  const [solutionList, setSolutionList] = useState<ResSolution[]>([]);
  const getSolutionList = async (params?: ReqById) => {
    const imagePath = await getImagePath();
    const res = await Doc.getSolutionListApi(params);
    if (res.code === 200) {
      setSolutionList(
        res.data.map((item) => ({
          ...item,
          solutionUrl: imagePath ? imagePath + item.solutionUrl : "",
        }))
      );
    }
  };

  useDidShow(() => {
    if (immediate) {
      getSolutionList();
    }
  });

  return { solutionList, getSolutionList };
}

export function useDocument(immediate = true) {
  const { getImagePath } = useImageHost();
  const [docList, setDocList] = useState<ResDoc[]>([]);
  const getDocList = async (params?: ReqById) => {
    const imagePath = await getImagePath();
    const res = await Doc.getDocumentListApi(params);
    if (res.code === 200) {
      setDocList(res.data.map(item => ({
        ...item,
        docUrl: imagePath && item.docUrl ? imagePath + item.docUrl : "",
      })));
    }
  };

  useDidShow(() => {
    if (immediate) {
      getDocList();
    }
  });

  return { docList, getDocList };
}
