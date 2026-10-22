"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "./data-table-features";
import DiceBearAvatar from "@/components/DiceBearAvatar";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

type RouterOutput = inferRouterOutputs<AppRouter>;
export type Meeting = RouterOutput["meetings"]["getMany"][number];

export interface MeetingTableMeta {
  deleteMeeting: (id: string) => void;
  isDeleting: boolean;
}

const columnHelper = createColumnHelper<DataTableFeatures, Meeting>();

export const meetingColumns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "Meeting",
    cell: (info) => (
      <div className="flex items-center gap-3">
        <DiceBearAvatar
          seed={info.getValue()}
          size={32}
          className="size-8 rounded-full"
        />
        <span className="font-semibold">{info.getValue()}</span>
      </div>
    ),
    filterFn: "includesString",
  }),
  columnHelper.accessor("status", {
    header: "status",
    cell: (info) => (
      <p className="max-w-[300px] truncate text-muted-foreground">
        {info.getValue()}
      </p>
    ),
  }),
  columnHelper.accessor("createdAt", {
    header: "Created",
    cell: (info) => (
      <span className="text-muted-foreground">
        {formatDistanceToNow(new Date(info.getValue()), { addSuffix: true })}
      </span>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: "",
    cell: (info) => {
      const meta = info.table.options.meta as MeetingTableMeta;
      return (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive/80"
          onClick={() => meta.deleteMeeting(info.row.original.id)}
          disabled={meta.isDeleting}
        >
          <TrashIcon className="size-4" />
        </Button>
      );
    },
  }),
]);
