package com.probeco.erp.services;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.lang.reflect.RecordComponent;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class ExcelImportService {

    public <T> List<T> importar(InputStream inputStream, Class<T> recordClass) {
        List<T> lista = new ArrayList<>();

        try (Workbook workbook = new XSSFWorkbook(inputStream)) {
            Sheet sheet = workbook.getSheetAt(0);

            Constructor<T> constructor = recordClass.getDeclaredConstructor(
                    Arrays.stream(recordClass.getRecordComponents())
                            .map(RecordComponent::getType)
                            .toArray(Class[]::new));

            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null)
                    continue;

                Object[] valores = new Object[recordClass.getRecordComponents().length];
                RecordComponent[] componentes = recordClass.getRecordComponents();

                for (int j = 0; j < componentes.length; j++) {
                    Cell celda = row.getCell(j, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
                    Class<?> tipo = componentes[j].getType();
                    valores[j] = convertirCelda(celda, tipo);
                }

                T instancia = constructor.newInstance(valores);
                lista.add(instancia);
            }

        } catch (Exception e) {
            throw new RuntimeException("Error importando Excel a " + recordClass.getSimpleName(), e);
        }

        return lista;
    }

    private Object convertirCelda(Cell celda, Class<?> tipo) {
    try {
        if (celda == null || celda.getCellType() == CellType.BLANK) {
            return null;
        }

        System.out.println(">>>>> Convirtiendo celda de tipo: " + celda.getCellType() + " a tipo: " + tipo.getSimpleName());

        if (tipo == String.class) {
            switch (celda.getCellType()) {
                case STRING:
                    return celda.getStringCellValue();
                case NUMERIC:
                    double val = celda.getNumericCellValue();
                    return (val == Math.floor(val)) ? String.valueOf((long) val) : String.valueOf(val);
                case BOOLEAN:
                    return String.valueOf(celda.getBooleanCellValue());
                case FORMULA:
                    return celda.getCellFormula();
                default:
                    return celda.toString();
            }
        }

        switch (tipo.getSimpleName()) {
            case "Long":
                return (long) celda.getNumericCellValue();
            case "Integer":
                return (int) celda.getNumericCellValue();
            case "Float":
                return (float) celda.getNumericCellValue();
            case "Double":
                return celda.getNumericCellValue();
            case "Boolean":
                return celda.getBooleanCellValue();
            case "LocalDate":
                return LocalDate.parse(celda.getStringCellValue(), DateTimeFormatter.ISO_LOCAL_DATE);
            default:
                if (tipo.isEnum()) {
                    String valor = celda.getStringCellValue().trim();
                    System.out.println(">>>>> Intentando convertir a enum: " + tipo.getName() + " con valor: " + valor);

                    try {
                        // Intenta usar método personalizado fromDescripcion
                        Method fromDescripcion = tipo.getDeclaredMethod("fromDescripcion", String.class);
                        return fromDescripcion.invoke(null, valor);
                    } catch (NoSuchMethodException e) {
                        // Fallback: busca por name()
                        return Enum.valueOf((Class<Enum>) tipo, valor.toUpperCase().replace(" ", "_"));
                    }
                }
                return null;
        }

    } catch (Exception e) {
        System.err.println("Error en celda: " + celda + " con tipo: " + tipo + " -> " + e.getMessage());
        return null;
    }
}

}
