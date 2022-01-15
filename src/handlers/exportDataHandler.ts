import XLSX from "xlsx";
import {saveAs} from "file-saver";


const FILE_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const FILE_EXTENSION = ".xlsx";

export const exportStudentList = (data: object[]) => {
    const headers = [
        ["Student ID", "Full name"]
    ]
    exportExcelFile(headers, data, "StudentListTemplate");
}

export const exportAssignmentGrade = (data: object[]) => {
    const headers = [
        ["Student ID", "Grade"]
    ]
    exportExcelFile(headers, data, "AssignmentGradeTemplate");
}

const exportExcelFile = (headers: string[][], data: object[], fileName: string) => {
    const worksheet = XLSX.utils.aoa_to_sheet(headers);
    XLSX.utils.sheet_add_json(worksheet, data, {origin: "A2", skipHeader: true});

    const workbook = { Sheets: { "Sheet1": worksheet }, SheetNames: ["Sheet1"] };

    const excelBuffer = XLSX.write(workbook, {bookType: "xlsx", type: "array"});
    const fileContent = new Blob([excelBuffer], {type: FILE_TYPE});

    saveAs(fileContent, fileName + FILE_EXTENSION);
}