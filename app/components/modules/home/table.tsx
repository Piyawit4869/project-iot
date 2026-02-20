"use client";
import * as React from "react";
import type { AccessLog } from "./columns";
import { getLogsSafe } from "./home";

export default function LogsPage() {
  const [logs, setLogs] = React.useState<AccessLog[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);

      const token = "supersecret";

      const res = await getLogsSafe({
        pageIndex: 0,
        limit: 50,
        token,
      });

      setLogs(res.data);
      setLoading(false);
    };

    fetchLogs();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border border-gray-300 w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Time</th>
            <th className="p-2 border">Result</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Similarity</th>
            <th className="p-2 border">Trigger</th>
            <th className="p-2 border">Door</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500">
                ไม่พบข้อมูล
              </td>
            </tr>
          ) : (
            logs.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="p-2 border">
                  {new Date((row.ts ?? 0) * 1000).toLocaleString()}
                </td>
                <td className="p-2 border">{row.ok ? "PASS" : "FAIL"}</td>
                <td className="p-2 border">{row.name ?? "-"}</td>
                <td className="p-2 border">{(row.sim ?? 0).toFixed(2)}</td>
                <td className="p-2 border">{row.trigger}</td>
                <td className="p-2 border">
                  {row.unlock_ok === null
                    ? "-"
                    : row.unlock_ok
                      ? "UNLOCK"
                      : "LOCK"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
