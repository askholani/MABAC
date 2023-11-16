'use client'

import Button from '@/components/Button'
import { InputAlternatif } from '@/components/alternatif/Alternatif'
import { InputKriteria } from '@/components/kriteria/InputKriteria'
import { Kriteria } from '@/components/kriteria/Kriteria'
import { useState } from 'react'

export interface FormKriteria {
  kriteria: number
  alternatif: number
}

export interface response {
  urutan: number
  bobot: number
  id: string
  nama: string
  jenis: boolean
}

export default function Home() {
  const [kriteria, setKriteria] = useState(false)
  const [formKriteria, setFormKriteria] = useState<FormKriteria>({
    kriteria: 0,
    alternatif: 0,
  })
  const [responseData, setResponseData] = useState<response[] | null>(null)

  const handlShowKriteria = () => setKriteria(!kriteria)

  const handleFormKriteria = (data: FormKriteria) => {
    setFormKriteria(data)
  }

  const fetchKriteria = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/kriteria')
      const data = await response.json()
      setResponseData(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <main className='bg-white min-h-screen px-8 py-4'>
      <div className='flex flex-col w-full gap-y-4'>
        <div className='grid grid-cols-12 gap-x-4 w-full'>
          <div className='flex flex-col col-span-2 gap-y-2'>
            <Button word='buat' handler={handlShowKriteria} />
            <Button word='isi alternatif' handler={fetchKriteria} />
            <Button word='tampilkan rangking' />
          </div>
          {kriteria && <Kriteria handle={handleFormKriteria} />}
        </div>
        {kriteria && formKriteria.kriteria !== 0 && (
          <InputKriteria jumlah={formKriteria.kriteria} />
        )}
        {responseData && <InputAlternatif data={responseData} />}
      </div>
    </main>
  )
}
