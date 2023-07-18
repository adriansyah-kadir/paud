import type { RequestHandler } from "@sveltejs/kit";
import exceljs from "exceljs"

function strnext(from: string): string {
    if (from === '') return 'A';
    let idx = from.at(-1)?.charCodeAt(0) as number - 65;
    if (idx === 25) return strnext(from.slice(0, -1)) + 'A';
    return from.slice(0, -1) + String.fromCharCode(idx + 65 + 1)
}

function strnextnth(from: string, nth: number) {
    while (nth--) from = strnext(from);
    return from;
}

function mergeCellFrom(from: string, count: number, deep: number, sheet: exceljs.Worksheet){
    let id = from;
    while(count--){
        sheet.mergeCells(`${id}1:${id}${deep}`)
        id = strnext(id)
    }
}

function createHeader(sheet: exceljs.Worksheet, date: Date) {
    let dayCount = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
    sheet.mergeCells("A1:A2")
    sheet.mergeCells("B1:B2")
    sheet.mergeCells("C1:C2")
    sheet.mergeCells(`D1:${strnextnth('D', dayCount)}1`)
    sheet.getCell('A1').value = "NO"
    sheet.getCell('B1').value = "NAMA/NIP"
    sheet.getCell('C1').value = "L/P"
    sheet.getCell('D1').value = 'TANGGAL'
    for (let i = 0; i < dayCount; i++) {
        let daycell = strnextnth('D', i)
        sheet.getCell(`${daycell}2`).value = i + 1
    }
    let lastcellused = strnextnth('D', dayCount)
    mergeCellFrom(lastcellused, 6, 2, sheet);
    sheet.getCell(`${strnextnth(lastcellused, 1)}1`).value = "S"
    sheet.getCell(`${strnextnth(lastcellused, 2)}1`).value = "I"
    sheet.getCell(`${strnextnth(lastcellused, 3)}1`).value = "DL"
    sheet.getCell(`${strnextnth(lastcellused, 4)}1`).value = "CT"
    sheet.getCell(`${strnextnth(lastcellused, 5)}1`).value = "TB"
    sheet.getCell(`${strnextnth(lastcellused, 6)}1`).value = "JLH"
    sheet.columns.forEach(e => e.alignment = { vertical: "middle", horizontal: "center" })
}

function createExcel(teachers: string[]): exceljs.Workbook {
    let date = new Date(new Date().toLocaleString('en', { timeZone: "Asia/Jakarta" }))
    let workbook = new exceljs.Workbook()
    let sheet = workbook.addWorksheet("sheet1", {
        headerFooter: {
            oddHeader: "Daftar Hadir Guru"
        }
    })
    createHeader(sheet, date)
    for (let i = 0; i < teachers.length; i++) {
        sheet.addRow([i, teachers[i]])
    }
    return workbook
}

export const POST: RequestHandler = async (ev) => {
    let exceljs = createExcel(["adrian", "aldo"])
    return new Response(await exceljs.xlsx.writeBuffer(), {
        headers: {
            "content-type": "application/xlsx",
            "content-disposition": "attachment;filename=test.xlsx"
        }
    })
}