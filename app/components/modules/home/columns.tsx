import type { ColumnDef } from "@tanstack/react-table";

export type AccessLog = {
  id: number;
  ts: number;
  ok: boolean;
  name: string | null;
  sim: number;
  reason: string | null;
  trigger: string;
  unlock_ok: boolean | null;
};

export const accessLogColumns: ColumnDef<AccessLog>[] = [
  {
    accessorKey: "ts",
    header: "Time",
    cell: (info) => new Date(info.getValue<number>() * 1000).toLocaleString(),
  },
  {
    accessorKey: "ok",
    header: "Result",
    cell: (info) => (info.getValue() ? "PASS" : "FAIL"),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: (info) => info.getValue() ?? "-",
  },
  {
    accessorKey: "sim",
    header: "Similarity",
    cell: (info) => ((info.getValue() as number) ?? 0).toFixed(2),
  },
  { accessorKey: "trigger", header: "Trigger" },
  {
    accessorKey: "unlock_ok",
    header: "Door",
    cell: (info) => {
      const v = info.getValue<boolean | null>();
      if (v === null) return "-";
      return v ? "UNLOCK" : "LOCK";
    },
  },
];
