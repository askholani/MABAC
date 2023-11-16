import { useRef } from 'react'

export const InputKriteria = (props: { jumlah: number }) => {
  const { jumlah } = props

  const namaRef = useRef<HTMLInputElement>(null)
  const bobotRef = useRef<HTMLInputElement>(null)
  const tipeRef = useRef<HTMLSelectElement>(null)
  const urutanRef = useRef<HTMLSelectElement>(null)

  const panjangArray = jumlah || 1
  const array = Array.from({ length: panjangArray }, (_, index) => index + 1)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const nameValue = namaRef.current?.value || ''
    const bobotValue = bobotRef.current?.value || '0'
    const tipeValue = tipeRef.current?.value || 'benefit'
    const urutanValue = urutanRef.current?.value || '1'
    try {
      const tipe = tipeValue === 'benefit' ? true : false

      const data = {
        urutan: parseInt(urutanValue),
        nama: nameValue,
        bobot: parseInt(bobotValue),
        jenis: tipe,
      }
      const response = await fetch('http://localhost:8000/api/kriteria', {
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

  return (
    <form onSubmit={handleSubmit} className='grid grid-cols-12 gap-x-4'>
      <div className='col-span-2'>
        <select
          className='select select-sm select-bordered w-full max-w-xs'
          ref={urutanRef}>
          <option disabled selected value={0}>
            Kriteria
          </option>
          {array.map((item, i) => (
            <option key={item} value={item}>
              Kriteria {item}
            </option>
          ))}
        </select>
      </div>
      <div className='col-span-2'>
        <input
          ref={namaRef}
          type='text'
          placeholder='nama'
          className='input input-bordered input-sm w-full max-w-xs'
        />
      </div>
      <div className='col-span-2'>
        <input
          ref={bobotRef}
          type='number'
          placeholder='bobot'
          className='input input-bordered input-sm w-full max-w-xs'
        />
      </div>
      <div className='col-span-2'>
        <select
          className='select select-bordered select-sm w-full max-w-xs'
          ref={tipeRef}>
          <option disabled selected>
            jenis
          </option>
          <option>benefit</option>
          <option>cost</option>
        </select>
      </div>
      <div className='col-span-1'>
        <button className='btn btn-sm'>simpan</button>
      </div>
    </form>
  )
}
