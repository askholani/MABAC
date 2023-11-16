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
exports.ModelRentanSkor = void 0;
const db_1 = require("../utils/db");
exports.ModelRentanSkor = {
    create: (data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.prisma.rentang_skor_kriteria.create({ data });
    }),
    findAll: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.prisma.rentang_skor_kriteria.findMany();
    }),
    findById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.prisma.rentang_skor_kriteria.findUnique({ where: { id } });
    }),
    update: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.prisma.rentang_skor_kriteria.update({ where: { id }, data });
    }),
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.prisma.rentang_skor_kriteria.delete({ where: { id } });
    }),
};
