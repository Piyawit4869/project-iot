/** @format */

import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

type CreateQueryStringFn = (name: string, value: string | number) => string;

const useCreateQueryString: () => CreateQueryStringFn = () => {
  const searchParams = useSearchParams(); // Already correctly typed

  const createQueryString: CreateQueryStringFn = useCallback(
    (_name, _value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(_name, String(_value));
      return params.toString();
    },
    [searchParams]
  );

  return createQueryString;
};

export default useCreateQueryString;
