export function nilaiMaxMin(data: any[][]) {
  const parsedData = data.map((innerArray) =>
    innerArray.map((value) => parseInt(value, 10)),
  )

  const resultArray = parsedData[0].map((_, columnIndex) => {
    const columnValues = parsedData.map((row) => row[columnIndex])
    const maxValue = Math.max(...columnValues)
    const minValue = Math.min(...columnValues)
    return [maxValue, minValue]
  })

  return resultArray
}

export function nilaiMatrixTertimbang(
  alternatif: any,
  maxMin: any,
  kriteriaOri: any,
) {
  return alternatif.map((alternatifItem: any, i: number) => {
    const newKriteria: number[] = alternatifItem.kriteria.map(
      (kriteriaItem: any, j: number) => {
        const [max, min] = maxMin[j]
        const bobot = kriteriaOri[j].bobot / 100

        let item = 0

        if (kriteriaOri[j].jenis) {
          item = (kriteriaItem - min) / (max - min)
        } else {
          item = (kriteriaItem - max) / (min - max)
        }

        item = bobot * item + bobot
        return parseFloat(item.toFixed(2))
      },
    )

    return newKriteria
  })
}

export function nilaiAreaBatas(nilaiMatrixTertimbang: any) {
  const hasil: any = []

  nilaiMatrixTertimbang.forEach((subArray: any, rowIndex: any) => {
    subArray.forEach((value: any, colIndex: any) => {
      if (!hasil[colIndex]) {
        hasil[colIndex] = []
      }
      hasil[colIndex][rowIndex] = value
    })
  })
  const areaBatas = hasil.map((val: any) => {
    let value: number = 1
    let count: number = val.length
    val.map((val2: any) => {
      value = value * val2
    })
    value = Math.pow(value, 1 / count)
    value = parseFloat(value.toFixed(2))
    return value
  })
  return areaBatas
}

export function nilaiJarakAlternatif(matrixTertimbang: any, areaBatas: any) {
  return matrixTertimbang.map((row: any, rowIndex: number) => {
    return row.map((value: any, colIndex: number) => {
      const distance = parseFloat((value - areaBatas[colIndex]).toFixed(2))
      return distance
    })
  })
}

export function nilaiKriteriaBaru(jarakAlternatif: number[][]) {
  return jarakAlternatif.map((alternatif: number[]) => {
    const totalJarak: number = alternatif.reduce((sum, val) => sum + val, 0)
    return parseFloat(totalJarak.toFixed(2))
  })
}
