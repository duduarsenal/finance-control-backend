import { FieldBusiness } from "@business/field-business";
import { FieldModel, GraphicsModel, ParcelaModel } from "@configs/zod";
import { HttpStatusCode, Months } from "@enums";
import { AppException } from "@errors";
import { FieldRepository } from "@repositorys/field-repository";

const _fieldRepository = new FieldRepository()
const _fieldBusiness = new FieldBusiness()

export class FieldService {

    async getFields(usuario: string): Promise<{status: HttpStatusCode, data: {fields: FieldModel[], graphics: GraphicsModel}}>{
        try {
            const fields: FieldModel[] = await _fieldRepository.getFieldsByUser(usuario)
            const graphics: GraphicsModel = this.getGraphicsData(fields);

            return({status: HttpStatusCode.OK, data: {fields, graphics}})
        } catch (error: any) {
            throw new AppException(error?.status ?? HttpStatusCode.InternalServerError, error.message)
        }
    }

    async addField(field: FieldModel, usuario: string): Promise<{status: HttpStatusCode, data: string}>{
        try {
            const canAdd = await _fieldBusiness.canAddField(field, usuario)
            if(canAdd.status !== HttpStatusCode.OK) throw new AppException(canAdd.status, canAdd.message)

            await _fieldRepository.addField(field, usuario)

            return({status: HttpStatusCode.Created, data: "OK"})
        } catch (error: any) {
            throw new AppException(error?.status ?? HttpStatusCode.InternalServerError, error.message)
        }
    }

    async updField(field: FieldModel, usuario: string): Promise<{status: HttpStatusCode, data: string}>{
        try {
            const canUpd = await _fieldBusiness.canUpdField(field, usuario)
            if(canUpd.status !== HttpStatusCode.OK) throw new AppException(canUpd.status, canUpd.message)

            await _fieldRepository.updField(field)
            field.parcelas.forEach(async (parcela) => {
                await _fieldRepository.updParcelaById(parcela)
            })

            return({status: HttpStatusCode.OK, data: "OK"})
        } catch (error: any) {
            throw new AppException(error?.status ?? HttpStatusCode.InternalServerError, error.message)
        }
    }

    async updFieldAlteraParcelas(field: FieldModel, usuario: string): Promise<{status: HttpStatusCode, data: string}>{
        try {
            const canUpd = await _fieldBusiness.canUpdField(field, usuario, true)
            if(canUpd.status !== HttpStatusCode.OK) throw new AppException(canUpd.status, canUpd.message)

            await _fieldRepository.delParcelasByIdField(field.id as string)
            await _fieldRepository.updField(field)
            await _fieldRepository.addParcelasByIdField(field.parcelas, field.id as string)

            return({status: HttpStatusCode.OK, data: "OK"})
        } catch (error: any) {
            throw new AppException(error?.status ?? HttpStatusCode.InternalServerError, error.message)
        }
    }

    async delField(fieldId: string, usuario: string): Promise<{status: HttpStatusCode, data: string}>{
        try {
            const canDel = await _fieldBusiness.canDelField(fieldId, usuario)
            if(canDel.status !== HttpStatusCode.OK) throw new AppException(canDel.status, canDel.message)

            await _fieldRepository.delParcelasByIdField(fieldId)
            await _fieldRepository.delField(fieldId)

            return({status: HttpStatusCode.OK, data: "OK"})
        } catch (error: any) {
            throw new AppException(error?.status ?? HttpStatusCode.InternalServerError, error.message)
        }
    }

    private getGraphicsData(fields: FieldModel[]){
        const graphics: {
            byYear: {
                id: string;
                items: {
                    gasto: { tipo: string; mes: { label: string; value: string }; valor: number }[];
                    ganho: { tipo: string; mes: { label: string; value: string }; valor: number }[];
                };
            }[];
            byMonth: {
                gasto: { tipo: string; mes: { label: string; value: string }; valor: number }[];
                ganho: { tipo: string; mes: { label: string; value: string }; valor: number }[];
            };
        } = { byYear: [], byMonth: { gasto: [], ganho: [] } };

        fields.forEach((field: FieldModel) => {
            field.parcelas.forEach((parcela: ParcelaModel) => {
                const [ano, mes] = parcela.data.split("-")
                var yearData = graphics.byYear.find((year: any) => year.id === ano)

                if(!yearData){
                    yearData = {
                        id: ano,
                        items: { gasto: [], ganho: [] }
                    }

                    graphics.byYear.push(yearData)
                }

                const itemsArray = yearData.items[field.tipo as keyof typeof yearData.items]

                const yearMonthData = itemsArray.find((item) => item.mes.value === mes)
                if(yearMonthData){
                    yearMonthData.valor += parcela.valor
                } else {
                    itemsArray.push({
                        tipo: field.tipo,
                        mes: {
                            label: Months[Number(mes)],
                            value: mes
                        },
                        valor: parcela.valor
                    })
                }

                const byMonthsArray = graphics.byMonth[field.tipo as keyof typeof graphics.byMonth]
                const monthData = byMonthsArray.find((item) => item.mes.value === mes)

                if(monthData) {
                    monthData.valor += parcela.valor
                } else {
                    byMonthsArray.push({
                        tipo: field.tipo,
                        mes: {
                            label: Months[Number(mes)],
                            value: mes
                        },
                        valor: parcela.valor
                    })
                }
            })
        })

        graphics.byYear.forEach((year) => {
            year.items.gasto.sort((a, b) => a.mes.value.localeCompare(b.mes.value))
            year.items.ganho.sort((a, b) => a.mes.value.localeCompare(b.mes.value))
        })
        graphics.byYear.sort((a, b) => a.id.localeCompare(b.id))

        graphics.byMonth.gasto.sort((a, b) => a.mes.value.localeCompare(b.mes.value))
        graphics.byMonth.ganho.sort((a, b) => a.mes.value.localeCompare(b.mes.value))

        return graphics
    }
}