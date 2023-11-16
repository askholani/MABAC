import { ModelAlternatif } from '../models/alternatif'
import { ModelKriteria } from '../models/ktriteria'
import {
  nilaiMaxMin,
  nilaiMatrixTertimbang,
  nilaiAreaBatas,
  nilaiKriteriaBaru,
  nilaiJarakAlternatif,
} from '../utils/helpers'

export const ControllerResult = {
  hasil: async (req: any, res: any) => {
    try {
      const alternatif = await ModelAlternatif.findAll()
      const kriteriaOri = await ModelKriteria.findAll()
      const kriteria: any[][] = alternatif.map((val) => val.kriteria)
      const maxMin = nilaiMaxMin(kriteria)
      const matrixTertimbang = nilaiMatrixTertimbang(
        alternatif,
        maxMin,
        kriteriaOri,
      )
      const areaBatas = nilaiAreaBatas(matrixTertimbang)
      const jarakAlternatif = nilaiJarakAlternatif(matrixTertimbang, areaBatas)
      const kriteriaBaru = nilaiKriteriaBaru(jarakAlternatif)
      let result: any[] = alternatif.map((val: any, i: number) => {
        return {
          id: val.id,
          urutan: val.urutan,
          nama: val.nama,
          kriteria: val.kriteria,
          id_kriteria: val.id_kriteria,
          hasil: kriteriaBaru[i],
        }
      })
      const resultSorted = result.sort((a, b) => b.hasil - a.hasil)

      res.status(200).json(resultSorted)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  },
}
