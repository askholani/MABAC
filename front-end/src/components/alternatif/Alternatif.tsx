import { useEffect, useRef, useState } from 'react'

export const InputAlternatif = (props: { data?: any }) => {
  const { data } = props
  const [form, setForm] = useState<number[]>([])
  const [idKriteria, setIdKriteria] = useState<object[]>([])

  useEffect(() => {
    data.map((val: any, i: number) => {
      if (data.length > i) {
        form[i] = 0
        idKriteria[i] = { id: val.id }
      }
    })
  }, [])

  const urutanRef = useRef<HTMLSelectElement>(null)
  const namaRef = useRef<HTMLInputElement>(null)

  const alternatif = localStorage.getItem('alternatif') || '1'
  const jumlah = JSON.parse(alternatif)

  const panjangArray = jumlah
  const array = Array.from({ length: panjangArray }, (_, index) => index + 1)

  const handleInputChange = (e: any, id: number) => {
    const value = e.target.value
    setForm((prevValues) => {
      let newForm = [...prevValues]
      newForm[id] = value
      return newForm
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const nama = namaRef.current?.value || 'default'
    const urutan = urutanRef.current?.value || '0'

    const data = {
      urutan: parseInt(urutan),
      nama,
      kriteria: form,
      id_kriteria: idKriteria,
    }

    try {
      const response = await fetch('http://localhost:8000/api/alternatif', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Server Response Not OK')
      }

      const result = await response.json()
      console.log('Data berhasil dikirim. Pesan dari server:', result)
    } catch (error: any) {
      console.error('Data gagal dikirim. Pesan error:', error.message)
    }
  }

  const handleReset = (e: any) => {
    e.preventDefault()
    if (urutanRef.current) {
      urutanRef.current.value = '0' // Atur kembali pilihan pertama pada dropdown
    }
    if (namaRef.current) {
      namaRef.current.value = '' // Atur kembali input nama
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-y-4'>
      <div className='grid grid-cols-12 gap-x-4'>
        <div className='col-span-2 flex flex-col'>
          <label className='text-black text-center'>alternatif</label>
          <select
            className='select select-sm select-bordered w-full max-w-xs'
            ref={urutanRef}>
            <option disabled selected value={0}>
              alternatif
            </option>
            {array.map((item, i) => (
              <option key={item} value={item}>
                alternatif {item}
              </option>
            ))}
          </select>
        </div>
        <div className='col-span-2 flex flex-col '>
          <label className='text-black text-center'>nama</label>
          <input
            type='text'
            placeholder={'nama'}
            className='input input-bordered input-sm w-full max-w-xs'
            ref={namaRef}
          />
        </div>
        {data.map((val: any, i: number) => {
          return (
            <div className='col-span-2 flex flex-col' key={val.id}>
              <label className='text-black text-center'>{val.nama}</label>
              <input
                value={form[i]}
                type='number'
                placeholder={val.nama}
                className='input input-bordered input-sm w-full max-w-xs'
                onChange={(e) => handleInputChange(e, i)}
              />
            </div>
          )
        })}
      </div>
      <div className='flex justify-start gap-x-2'>
        <button className='btn btn-sm'>simpan</button>
        <button className='btn btn-sm' onClick={(e) => handleReset(e)}>
          reset
        </button>
      </div>
    </form>
  )
}
