"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nilaiKriteriaBaru = exports.nilaiJarakAlternatif = exports.nilaiAreaBatas = exports.nilaiMatrixTertimbang = exports.nilaiMaxMin = void 0;
function nilaiMaxMin(data) {
    const parsedData = data.map((innerArray) => innerArray.map((value) => parseInt(value, 10)));
    const resultArray = parsedData[0].map((_, columnIndex) => {
        const columnValues = parsedData.map((row) => row[columnIndex]);
        const maxValue = Math.max(...columnValues);
        const minValue = Math.min(...columnValues);
        return [maxValue, minValue];
    });
    return resultArray;
}
exports.nilaiMaxMin = nilaiMaxMin;
function nilaiMatrixTertimbang(alternatif, maxMin, kriteriaOri) {
    return alternatif.map((alternatifItem, i) => {
        const newKriteria = alternatifItem.kriteria.map((kriteriaItem, j) => {
            const [max, min] = maxMin[j];
            const bobot = kriteriaOri[j].bobot / 100;
            let item = 0;
            if (kriteriaOri[j].jenis) {
                item = (kriteriaItem - min) / (max - min);
            }
            else {
                item = (kriteriaItem - max) / (min - max);
            }
            item = bobot * item + bobot;
            return parseFloat(item.toFixed(2));
        });
        return newKriteria;
    });
}
exports.nilaiMatrixTertimbang = nilaiMatrixTertimbang;
function nilaiAreaBatas(nilaiMatrixTertimbang) {
    const hasil = [];
    nilaiMatrixTertimbang.forEach((subArray, rowIndex) => {
        subArray.forEach((value, colIndex) => {
            if (!hasil[colIndex]) {
                hasil[colIndex] = [];
            }
            hasil[colIndex][rowIndex] = value;
        });
    });
    const areaBatas = hasil.map((val) => {
        let value = 1;
        let count = val.length;
        val.map((val2) => {
            value = value * val2;
        });
        value = Math.pow(value, 1 / count);
        value = parseFloat(value.toFixed(2));
        return value;
    });
    return areaBatas;
}
exports.nilaiAreaBatas = nilaiAreaBatas;
function nilaiJarakAlternatif(matrixTertimbang, areaBatas) {
    return matrixTertimbang.map((row, rowIndex) => {
        return row.map((value, colIndex) => {
            const distance = parseFloat((value - areaBatas[colIndex]).toFixed(2));
            return distance;
        });
    });
}
exports.nilaiJarakAlternatif = nilaiJarakAlternatif;
function nilaiKriteriaBaru(jarakAlternatif) {
    return jarakAlternatif.map((alternatif) => {
        const totalJarak = alternatif.reduce((sum, val) => sum + val, 0);
        return parseFloat(totalJarak.toFixed(2));
    });
}
exports.nilaiKriteriaBaru = nilaiKriteriaBaru;
