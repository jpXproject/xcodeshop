'use client'
import { useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { Download, Search, Trash2, Upload, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react'

type Category = {
  id: string
  name: string
}

type ProductRow = {
  id: string
  name: string
  slug?: string
  price?: number
  stock?: number
  image_url?: string
  is_active?: boolean
  categories?: { name?: string }
}

const formatCurrency = (value?: number) =>
  value == null ? '-' : `Rp ${value.toLocaleString('id-ID')}`

const escapeCsvValue = (value: string | number | boolean | undefined) => {
  const stringValue = value == null ? '' : String(value)
  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }
  return stringValue
}

const parseCsv = (csvText: string) => {
  const lines = csvText
    .trim()
    .split(/\r?\n/)
    .map((line) => line.replace(/\r$/, ''))
    .filter(Boolean)

  const headers = lines[0].split(',').map((header) => header.trim().toLowerCase())
  return lines.slice(1).map((line) => {
    const values = line
      .split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)
      .map((value) => value.trim().replace(/^"|"$/g, ''))

    return headers.reduce<Record<string, string>>((row, header, index) => {
      row[header] = values[index] ?? ''
      return row
    }, {})
  })
}

export default function ProductList({ products, categories }: { products: any[]; categories: Category[] }) {
  const supabase = createClient()
  const [tableData, setTableData] = useState<ProductRow[]>(
    products.map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: typeof product.price === 'number' ? product.price : Number(product.price) || 0,
      stock: typeof product.stock === 'number' ? product.stock : Number(product.stock) || 0,
      image_url: product.image_url,
      is_active: product.is_active ?? true,
      categories: product.categories,
    }))
  )
  const [globalFilter, setGlobalFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [loading, setLoading] = useState(false)

  const categoryOptions = useMemo(
    () => ['All', ...Array.from(new Set(categories.map((category) => category.name).filter(Boolean)))] as string[],
    [categories]
  )

  const filteredData = useMemo(() => {
    const search = globalFilter.toLowerCase()
    return tableData.filter((product) => {
      const matchesSearch =
        !search ||
        [product.name, product.slug, product.categories?.name]
          .filter(Boolean)
          .some((value) => value?.toLowerCase().includes(search))

      const matchesCategory = categoryFilter === 'All' || product.categories?.name === categoryFilter
      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Active' ? product.is_active : !product.is_active)

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [tableData, globalFilter, categoryFilter, statusFilter])

  const columns = useMemo<ColumnDef<ProductRow>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-sky-400"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-sky-400"
          />
        ),
        enableSorting: false,
      },
      {
        accessorKey: 'image_url',
        id: 'thumbnail',
        header: 'Thumbnail',
        cell: ({ row }) => (
          <img
            src={row.original.image_url || '/placeholder.png'}
            alt={row.original.name}
            className="h-12 w-12 rounded-2xl object-cover"
          />
        ),
        enableSorting: false,
      },
      {
        accessorKey: 'name',
        header: 'Product',
        cell: ({ row }) => (
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-white">{row.original.name}</span>
            <span className="text-xs text-slate-400">{row.original.slug || '—'}</span>
          </div>
        ),
      },
      {
        accessorFn: (row) => row.categories?.name ?? 'Uncategorized',
        id: 'category',
        header: 'Category',
        cell: ({ getValue }) => <span className="text-slate-300">{getValue() as string}</span>,
      },
      {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ getValue }) => <span className="text-slate-200">{formatCurrency(getValue() as number)}</span>,
      },
      {
        accessorKey: 'stock',
        header: 'Stock',
        cell: ({ getValue }) => <span className="text-slate-200">{getValue() as number}</span>,
      },
      {
        accessorKey: 'is_active',
        id: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const active = getValue() as boolean
          return (
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                active ? 'bg-emerald-500/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300'
              }`}
            >
              {active ? 'Active' : 'Inactive'}
            </span>
          )
        },
      },
      {
        id: 'actions',
        header: 'Action',
        cell: ({ row }) => (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="rounded-full border border-slate-700 bg-slate-900/95 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:bg-slate-800"
              onClick={() => window.alert(`Edit produk: ${row.original.name}`)}
            >
              Edit
            </button>
            <button
              type="button"
              className="rounded-full border border-rose-600 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-200 transition hover:bg-rose-500/20"
              onClick={() => handleDelete(row.original.id)}
            >
              Delete
            </button>
          </div>
        ),
        enableSorting: false,
      },
    ],
    []
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  const selectedRows = useMemo(
    () => table.getSelectedRowModel().rows.map((row) => row.original),
    [table]
  )

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin hapus produk ini?')) return
    setLoading(true)
    const { error } = await supabase.from('products').delete().eq('id', id)
    setLoading(false)
    if (error) {
      alert('Gagal hapus: ' + error.message)
      return
    }
    setTableData((current) => current.filter((item) => item.id !== id))
    setRowSelection((current) => {
      const updated = { ...current }
      delete updated[id]
      return updated
    })
  }

  const handleBulkDelete = async () => {
    const ids = selectedRows.map((item) => item.id)
    if (!ids.length) return
    if (!confirm(`Hapus ${ids.length} produk terpilih?`)) return
    setLoading(true)
    const { error } = await supabase.from('products').delete().in('id', ids)
    setLoading(false)
    if (error) {
      alert('Gagal menghapus produk massal: ' + error.message)
      return
    }
    setTableData((current) => current.filter((item) => !ids.includes(item.id)))
    setRowSelection({})
  }

  const handleExport = () => {
    const rows = table.getCoreRowModel().rows.map((row) => row.original)
    const csvRows = [
      ['Product', 'Category', 'Price', 'Stock', 'Status', 'Slug', 'Image URL'],
      ...rows.map((product) => [
        escapeCsvValue(product.name),
        escapeCsvValue(product.categories?.name ?? ''),
        escapeCsvValue(product.price ?? 0),
        escapeCsvValue(product.stock ?? 0),
        escapeCsvValue(product.is_active ? 'Active' : 'Inactive'),
        escapeCsvValue(product.slug ?? ''),
        escapeCsvValue(product.image_url ?? ''),
      ]),
    ]

    const csvText = csvRows.map((row) => row.join(',')).join('\n')
    const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'products-export.csv'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const text = await file.text()
    const rows = parseCsv(text)
    if (!rows.length) {
      alert('File CSV kosong atau tidak valid.')
      return
    }

    const importedProducts = rows.map((row) => {
      const categoryName = row.category || row.category_name || ''
      const category = categories.find((item) => item.name?.toLowerCase() === categoryName.toLowerCase())
      return {
        name: row.product || row.name,
        slug: row.slug || String(row.product || row.name || '').toLowerCase().replace(/\s+/g, '-'),
        category_id: category?.id,
        price: parseInt(row.price || '0', 10) || 0,
        stock: parseInt(row.stock || '0', 10) || 0,
        image_url: row.image_url || row.image || '',
        is_active: String(row.status || row.status_value || 'active').toLowerCase().includes('active'),
      }
    })

    setLoading(true)
    const { error } = await supabase.from('products').insert(importedProducts)
    setLoading(false)
    if (error) {
      alert('Gagal impor produk: ' + error.message)
      return
    }

    window.location.reload()
  }

  return (
    <div className="space-y-4 p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <label className="text-xs uppercase tracking-[0.28em] text-slate-500">Search</label>
            <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-200">
              <Search size={16} className="text-slate-400" />
              <input
                value={globalFilter}
                onChange={(event) => setGlobalFilter(event.target.value)}
                placeholder="Cari produk, slug, kategori..."
                className="flex-1 bg-transparent text-sm text-slate-100 outline-none"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <label className="text-xs uppercase tracking-[0.28em] text-slate-500">Category</label>
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-sm text-slate-100 outline-none"
            >
              {categoryOptions.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <label className="text-xs uppercase tracking-[0.28em] text-slate-500">Status</label>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-sm text-slate-100 outline-none"
            >
              {['All', 'Active', 'Inactive'].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={!selectedRows.length || loading}
            onClick={handleBulkDelete}
            className="inline-flex items-center gap-2 rounded-full border border-rose-500 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={16} /> Hapus Terpilih
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
          >
            <Download size={16} /> Export CSV
          </button>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-800">
            <Upload size={16} /> Import CSV
            <input type="file" accept=".csv" onChange={handleImport} className="hidden" />
          </label>
        </div>
      </div>

      <div className="overflow-x-auto rounded-[28px] border border-white/10 bg-slate-950/90 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
        <table className="min-w-full border-separate border-spacing-0 text-left">
          <thead className="bg-slate-900/90 text-slate-300">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-4 py-4 text-xs uppercase tracking-[0.22em] text-slate-400"
                  >
                    {header.isPlaceholder ? null : (
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="inline-flex items-center gap-2 font-semibold text-slate-200"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() ? (
                          <ArrowUpDown size={14} className="text-slate-400" />
                        ) : null}
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-slate-500">
                  Tidak ada produk untuk ditampilkan.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t border-slate-800/80 hover:bg-slate-900/70">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-4 align-top text-slate-200">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-400">
          Menampilkan {table.getRowModel().rows.length} dari {filteredData.length} hasil
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/80 px-3 py-2">
          <button
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-200 transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="px-3 text-sm text-slate-200">
            Halaman {table.getState().pagination.pageIndex + 1}
          </span>
          <button
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-200 transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(event) => table.setPageSize(Number(event.target.value))}
            className="rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 outline-none"
          >
            {[10, 20, 30, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize} / halaman
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
