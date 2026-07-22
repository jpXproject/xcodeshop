'use client'

import { ChangeEvent, useEffect, useState } from 'react'

type ImageUploadProps = {
  onUpload: (url: string) => void
  existingUrl?: string
}

export default function ImageUpload({ onUpload, existingUrl = '' }: ImageUploadProps) {
  const [preview, setPreview] = useState(existingUrl)

  useEffect(() => {
    setPreview(existingUrl)
  }, [existingUrl])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : ''
      setPreview(result)
      onUpload(result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {preview ? (
        <img src={preview} alt="Preview produk" className="h-32 w-full rounded-lg border object-cover" />
      ) : (
        <div className="flex h-32 items-center justify-center rounded-lg border border-dashed text-sm text-gray-500">
          Belum ada gambar dipilih
        </div>
      )}
    </div>
  )
}
