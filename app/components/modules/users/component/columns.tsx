import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { useDeleteFace } from "~/api/client/user";
import { GlobalImage } from "~/components/shared/global-image";
import { Button } from "~/components/ui/button";

export type UserLog = {
  id: number;
  name: string | null;
  cover: string | null;
};

export const userColumns: ColumnDef<UserLog>[] = [
  {
    accessorKey: "cover",
    header: "รูปภาพ",
    cell: ({ row }) => {
      const cover = row.original.cover as string | null;
      const name = row.original.name as string;

      const url = cover ? `http://127.0.0.1:9000/media${cover}` : "";

      console.log("IMG URL:", url);

      return (
        <GlobalImage
          src={url}
          alt={name}
          width={60}
          height={60}
          className="rounded-xl w-[60px] h-[60px] object-cover object-center"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: (info) => info.getValue() ?? "-",
  },
  {
    id: "actions",
    header: "การดำเนินการ",
    cell: (info) => {
      const id = info.row.original.id;
      const name = info.row.original.name as string;
      const { mutate } = useDeleteFace();
      return (
        <div className="flex items-center gap-2">
          <Link to={`/users/${id}`}>
            <Button
              className="h-9 w-9 p-0 bg-[#737373] hover:bg-[#5E5E5E]"
              aria-label="แก้ไข"
              title="แก้ไข"
            >
              <Eye className="w-4 h-4 text-white" />
            </Button>
          </Link>
          <Button
            className="h-9 w-9 p-0 bg-red-500 hover:bg-red-600"
            aria-label="แก้ไข"
            title="แก้ไข"
            onClick={() => {
              mutate({
                name,
                token: "supersecret",
              });
            }}
          >
            <Trash2 className="w-4 h-4 text-white" />
          </Button>
        </div>
      );
    },
  },
];
