import { toast } from "sonner";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";

interface ApiResponse {
  success?: boolean;
  message?: string;
  [key: string]: unknown;
}

interface ApiErrorResponse {
  message?: string;
  [key: string]: unknown;
}

interface ToastHandlerOptions {
  response?: ApiResponse;
  error?: unknown;
  router?: any;
  successRedirectPath: string;
  loadingToastId?: string;
  successMessage?: string;
  errorMessage?: string;
}

export function handleToastAndRedirect({
  response,
  error,
  router,
  successRedirectPath,
  loadingToastId,
  successMessage = "ดำเนินการสำเร็จ",
  errorMessage = "ดำเนินการไม่สำเร็จ",
}: ToastHandlerOptions) {
  const navigate = useNavigate();
  // ✅ ถ้าเกิด error (เช่น HTTP 400/500)
  if (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const message =
      axiosError?.response?.data?.message ||
      axiosError?.message ||
      "เกิดข้อผิดพลาดที่ไม่สามารถระบุได้";

    toast.error("เกิดข้อผิดพลาด", {
      id: loadingToastId,
      description: message,
      duration: 3000,
      position: "bottom-right",
    });
    return;
  }

  // ✅ ถ้า response success === true
  if (typeof response?.success === "boolean") {
    if (response.success) {
      toast.success(successMessage, {
        id: loadingToastId,
        description: response.message || "",
        duration: 2500,
        position: "bottom-right",
      });
      navigate(successRedirectPath);
    } else {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      const message =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        "เกิดข้อผิดพลาดที่ไม่สามารถระบุได้";
      toast.error(errorMessage, {
        id: loadingToastId,
        description: message || "",
        duration: 3000,
        position: "bottom-right",
      });
    }
  } else {
    // ✅ กรณีไม่มี success field → ถือว่าสำเร็จ
    toast.error(errorMessage, {
      id: loadingToastId,
      description: response?.message || "",
      duration: 2500,
      position: "bottom-right",
    });
    navigate(successRedirectPath);
  }
}
