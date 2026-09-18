"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Product } from "@/types/products"
import { useTheme } from "@/components/ThemeProvider"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

interface ProductTableProps {
  data: Product[]
  columns: ColumnDef<Product>[]
}

export function ProductTable({ data, columns }: ProductTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const router = useRouter()
  const { activeOption } = useTheme()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    state: { sorting },
  })

  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const pageCount = table.getPageCount()
  const totalRows = data.length

  const startRow = pageIndex * pageSize + 1
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows)

  return (
    <div className={`overflow-hidden rounded-2xl glass-card bg-white/80 backdrop-blur-md border border-stone-200/90 shadow-sm ${activeOption.cardBorder}`}>
      <Table>
        <TableHeader className={activeOption.tableHeaderBg}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-stone-200 hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-slate-900 font-extrabold text-xs uppercase tracking-wider py-4">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => {
              const isOdd = index % 2 === 0
              const rowClass = isOdd ? activeOption.tableOddRow : activeOption.tableEvenRow

              return (
                <TableRow
                  key={row.id}
                  className={`cursor-pointer border-stone-200/80 ${rowClass}`}
                  onClick={(e) => {
                    const target = e.target as HTMLElement
                    if (
                      target.closest('button') ||
                      target.closest('[role="menuitem"]') ||
                      target.closest('[role="menu"]') ||
                      target.closest('[data-state]')
                    ) {
                      return
                    }
                    router.push(`/products/${row.original.id}`)
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3.5">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-32 text-center text-slate-600 font-medium text-sm">
                No products match the selected criteria.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Footer Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-stone-200 bg-white/60">
        <div className="text-xs text-slate-700 font-medium">
          Showing <span className="font-extrabold text-slate-900">{totalRows > 0 ? startRow : 0}</span> to{" "}
          <span className="font-extrabold text-slate-900">{endRow}</span> of{" "}
          <span className="font-extrabold text-slate-900">{totalRows}</span> products
          <span className="hidden sm:inline text-slate-400 ml-2">| Page {pageIndex + 1} of {pageCount || 1}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Page Size Selector */}
          <div className="flex items-center gap-1.5 mr-2">
            <span className="text-[11px] font-bold text-slate-600">Rows:</span>
            <select
              value={pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className={`h-8 rounded-lg bg-white border border-stone-300 px-2 text-xs font-bold text-slate-900 cursor-pointer shadow-2xs ${activeOption.ringColor}`}
            >
              {[5, 10, 15, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size} per page
                </option>
              ))}
            </select>
          </div>

          {/* Pagination Navigation Buttons */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-lg border-stone-300"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              title="First Page"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 rounded-lg border-stone-300 text-xs font-bold"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            
            <div className="flex items-center gap-1 px-1">
              {Array.from({ length: pageCount }, (_, i) => i).map((pIndex) => (
                <button
                  key={pIndex}
                  onClick={() => table.setPageIndex(pIndex)}
                  className={`h-7 w-7 rounded-lg text-xs font-bold transition ${
                    pageIndex === pIndex ? activeOption.activeNavPill : "bg-stone-100 hover:bg-stone-200 text-slate-800"
                  }`}
                >
                  {pIndex + 1}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 rounded-lg border-stone-300 text-xs font-bold"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-lg border-stone-300"
              onClick={() => table.setPageIndex(pageCount - 1)}
              disabled={!table.getCanNextPage()}
              title="Last Page"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}