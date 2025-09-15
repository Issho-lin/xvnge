/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import {
  useLocation as useRouterLocation,
  useSearchParams,
} from "react-router-dom";

export default function useLocation<T = any>() {
  const location = useRouterLocation();
  const [searchParams] = useSearchParams();

  const query = useMemo<T>(() => {
    const params: any = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  }, [searchParams]);

  return {
    ...location,
    state: location.state ?? {},
    query,
  };
}
