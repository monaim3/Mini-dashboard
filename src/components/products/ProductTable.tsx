'use client';

import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronLeft, ChevronRight, Columns, Package } from 'lucide-react';
import { ProductFilters } from './ProductFilters';

interface ProductTableProps {
  data: Product[];
  columns: ColumnDef<Product>[];
}

export function ProductTable({ data, columns }: ProductTableProps) {
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    status: 'all',
    priceRange: [0, 1000] as [number, number],
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setGlobalFilter(newFilters.search);
  };

  return (
    <div className="space-y-4">
      <ProductFilters onFilterChange={handleFilterChange} />

      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#f1765b]/5 to-[#f1638c]/5 rounded-lg border">
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="hover:border-[#f1765b]/50 hover:text-[#f1765b] transition-colors"
              >
                <Columns className="w-4 h-4 mr-2" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          {Object.keys(rowSelection).length > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gradient-to-r from-[#f1765b] to-[#f1638c] text-white text-sm font-medium">
              <Package className="w-3.5 h-3.5" />
              {Object.keys(rowSelection).length} selected
            </div>
          )}
        </div>

        <div className="text-sm font-medium text-muted-foreground">
          Total: <span className="text-foreground font-semibold">{data.length}</span> products
        </div>
      </div>

      <div className="rounded-lg border overflow-hidden bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gradient-to-r from-[#f1765b]/5 to-[#f1638c]/5 hover:from-[#f1765b]/10 hover:to-[#f1638c]/10">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-semibold">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-gradient-to-r hover:from-[#f1765b]/5 hover:to-[#f1638c]/5 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f1765b]/10 to-[#f1638c]/10 flex items-center justify-center">
                      <Package className="w-6 h-6 text-[#f1765b]" />
                    </div>
                    <p className="text-muted-foreground">No products found.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#f1765b]/5 to-[#f1638c]/5 rounded-lg border">
        <div className="text-sm font-medium text-muted-foreground">
          Page <span className="text-foreground font-semibold">{table.getState().pagination.pageIndex + 1}</span> of{' '}
          <span className="text-foreground font-semibold">{table.getPageCount()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="hover:border-[#f1765b]/50 hover:text-[#f1765b] disabled:opacity-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="hover:border-[#f1638c]/50 hover:text-[#f1638c] disabled:opacity-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}