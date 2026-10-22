"use client";

import { useTable, type ColumnDef, type RowData } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { features, type DataTableFeatures } from "./data-table-features";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
  meta?: object;
  searchColumnId?: string;
  searchPlaceholder?: string;
}

export function DataTable<TData extends { id: string }>({
  columns,
  data,
  meta,
  searchColumnId,
  searchPlaceholder = "Search...",
}: DataTableProps<TData>) {
  const table = useTable({
    features,
    data,
    columns,
    meta,
  });

  const searchColumn = searchColumnId
    ? table.getColumn(searchColumnId)
    : undefined;

  return (
    <div className="flex flex-1 flex-col min-h-0 gap-4">
      {/* Search input — only rendered if a searchColumnId is provided */}
      {searchColumn && (
        <div className="shrink-0">
          <Input
            placeholder={searchPlaceholder}
            value={(searchColumn.getFilterValue() as string) ?? ""}
            onChange={(e) => searchColumn.setFilterValue(e.target.value)}
            className="max-w-sm"
          />
        </div>
      )}

      {/* Table — scrollable container */}
      <div className="flex-1 min-h-0 rounded-md border overflow-hidden flex flex-col bg-card">
        <Table containerClassName="flex-1 min-h-0 overflow-auto">
          <TableHeader className="sticky top-0 z-10 bg-background shadow-xs">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="bg-background">
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <Link key={cell.id} href={`/agents/${row.original.id}`}>
                        <table.FlexRender cell={cell} />
                      </Link>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex shrink-0 items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {table.getPrePaginatedRowModel().rows.length} result(s)
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
