"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import type { ModalUserProps } from "../type";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Checkbox } from "~/components/ui/checkbox";
import React from "react";

export default function ModalUser({
  users = [],
  value = [],
  taken = [],
  onChange,
  onSave,
  triggerElement,
}: ModalUserProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const userList = Array.isArray(users) ? users : [];
  const filteredUsers = userList.filter((u) =>
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  const toggleUser = (id: string) => {
    if (value.includes(id)) onChange(value.filter((v) => v !== id));
    else onChange([...value, id]);
  };

  const handleSave = () => {
    onSave?.(value);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* {triggerElement ?? <Button variant="outline">เลือกสมาชิก</Button>} */}
        เลือกสมาชิก
      </DialogTrigger>

      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle>สมาชิก</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-2 mb-4">
          <Input
            placeholder="ค้นหาสมาชิก"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSave}>บันทึก</Button>
        </div>

        <ScrollArea className="h-60 rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="sticky top-0 bg-sidebar p-2 text-left w-12 text-white">
                  รูปภาพ
                </th>
                <th className="sticky top-0 bg-sidebar p-2 text-left text-white">
                  ชื่อ
                </th>
                <th className="sticky top-0 bg-sidebar p-2 pr-4 text-center w-8 text-white">
                  <Checkbox
                    checked={
                      filteredUsers.length > 0 &&
                      filteredUsers.every(
                        (u) => value.includes(u.id) || taken.includes(u.id)
                      )
                    }
                    onCheckedChange={(checked) =>
                      onChange(
                        checked
                          ? Array.from(
                              new Set([
                                ...value,
                                ...filteredUsers
                                  .filter((u) => !taken.includes(u.id))
                                  .map((u) => u.id),
                              ])
                            )
                          : value.filter(
                              (id) =>
                                !filteredUsers.some(
                                  (u) => u.id === id && !taken.includes(id)
                                )
                            )
                      )
                    }
                  />
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => {
                const disabled = taken.includes(user.id);
                return (
                  <tr
                    key={user.id}
                    className={`border-b ${
                      disabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <td className="p-2">
                      <img
                        src={user.avatarUrl || "/default-avatar.png"}
                        alt={`${user.firstName} ${user.lastName}`}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </td>
                    <td className="p-2">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="p-2 pr-4 text-center">
                      <Checkbox
                        checked={value.includes(user.id)}
                        disabled={disabled}
                        onCheckedChange={() => !disabled && toggleUser(user.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
