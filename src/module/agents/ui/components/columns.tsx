"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "./data-table-features";
import DiceBearAvatar from "@/components/DiceBearAvatar";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

export type Agent = {
  id: string;
  name: string;
  userId: string;
  instructions: string;
  createdAt: string;
  updatedAt: string;
};

export interface AgentTableMeta {
  deleteAgent: (id: string) => void;
  isDeleting: boolean;
}

const columnHelper = createColumnHelper<DataTableFeatures, Agent>();

export const agentColumns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "Agent",
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
  columnHelper.accessor("instructions", {
    header: "Instructions",
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
      const meta = info.table.options.meta as AgentTableMeta;
      return (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive/80"
          onClick={() => meta.deleteAgent(info.row.original.id)}
          disabled={meta.isDeleting}
        >
          <TrashIcon className="size-4" />
        </Button>
      );
    },
  }),
]);
