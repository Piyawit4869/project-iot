import { useMutation } from "@tanstack/react-query";
import { fetchUpload } from "../server/upload";

export const useUpload = () => {
  return useMutation({
    mutationFn: (formData: FormData) => fetchUpload(formData),
  });
};
