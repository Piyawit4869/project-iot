import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      <Outlet />
    </div>
  );
}
