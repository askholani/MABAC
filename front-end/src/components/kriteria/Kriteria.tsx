import { useState } from 'react'

export const Kriteria = (props: { handle?: any }) => {
  const { handle } = props

  const [kriteria, setKriteria] = useState(0)
  const [alternatif, setAlternatif] = useState(0)

  const handleKriteria = (e: any) => {
    const value = parseInt(e.target.value)
    setKriteria(value)
  }

  const handleAlternatif = (e: any) => {
    const value = parseInt(e.target.value)
    setAlternatif(value)
  }

  const handleReset = (e: any) => {
    e.preventDefault()
    setKriteria(0)
    setAlternatif(0)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (kriteria <= 1 || kriteria >= 10) {
      alert(`nilai kriteria hanya 1 - 10, ${kriteria} tidak sesuai`)
      return
    }

    if (alternatif <= 1 || alternatif >= 100) {
      alert(`nilai alternatif hanya 1 - 100, ${alternatif} tidak sesuai`)
      return
    }

    localStorage.setItem('alternatif', JSON.stringify(alternatif))

    handle({
      kriteria,
      alternatif,
    })
    return
  }

  return (
    <div className='col-span-3 flex flex-col gap-y-2'>
      <form className='flex flex-col gap-y-4' onSubmit={(e) => handleSubmit(e)}>
        <div className='flex flex-col gap-y-2'>
          <input
            type='number'
            placeholder='jumlah kriteria'
            className='input input-bordered input-sm w-full max-w-xs'
            value={kriteria}
            onChange={(e) => handleKriteria(e)}
          />
          <input
            type='number'
            placeholder='jumlah alternatif'
            className='input input-bordered input-sm w-full max-w-xs'
            value={alternatif}
            onChange={(e) => handleAlternatif(e)}
          />
        </div>
        <div className='flex justify-end gap-x-4'>
          <button className='btn btn-sm' onClick={(e) => handleReset(e)}>
            reset
          </button>
          <button className='btn btn-sm'>simpan</button>
        </div>
      </form>
    </div>
  )
}
