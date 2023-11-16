"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerResult = void 0;
const alternatif_1 = require("../models/alternatif");
const ktriteria_1 = require("../models/ktriteria");
const helpers_1 = require("../utils/helpers");
exports.ControllerResult = {
    hasil: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const alternatif = yield alternatif_1.ModelAlternatif.findAll();
            const kriteriaOri = yield ktriteria_1.ModelKriteria.findAll();
            const kriteria = alternatif.map((val) => val.kriteria);
            const maxMin = (0, helpers_1.nilaiMaxMin)(kriteria);
            const matrixTertimbang = (0, helpers_1.nilaiMatrixTertimbang)(alternatif, maxMin, kriteriaOri);
            const areaBatas = (0, helpers_1.nilaiAreaBatas)(matrixTertimbang);
            const jarakAlternatif = (0, helpers_1.nilaiJarakAlternatif)(matrixTertimbang, areaBatas);
            const kriteriaBaru = (0, helpers_1.nilaiKriteriaBaru)(jarakAlternatif);
            let result = alternatif.map((val, i) => {
                return {
                    id: val.id,
                    urutan: val.urutan,
                    nama: val.nama,
                    kriteria: val.kriteria,
                    id_kriteria: val.id_kriteria,
                    hasil: kriteriaBaru[i],
                };
            });
            const resultSorted = result.sort((a, b) => b.hasil - a.hasil);
            res.status(200).json(resultSorted);
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    }),
};
