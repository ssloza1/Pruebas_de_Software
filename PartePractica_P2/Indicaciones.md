EXAMEN PRÁCTICO 

Asignatura: Pruebas de Software | Segundo parcial | Duración: 60 minutos | Calificación: 7 puntos

Tema: Implementación de pruebas unitarias en Angular mediante Vitest

Objetivo

Desarrollar un componente básico en Angular y aplicar pruebas unitarias automatizadas utilizando Vitest, comprobando elementos HTML y funciones TypeScript mediante diferentes matchers, siguiendo la estructura Arrange–Act–Assert, el desarrollo guiado por pruebas (TDD) y el análisis de cobertura.

Indicaciones generales

La evaluación es individual y deberá desarrollarse dentro de los 60 minutos establecidos.
No se permite utilizar herramientas de inteligencia artificial, copiar código ni intercambiar soluciones con otros estudiantes.
Se permite consultar el material y los ejemplos desarrollados durante el laboratorio.
El estudiante podrá utilizar un proyecto Angular previamente configurado, pero deberá desarrollar individualmente las funciones y pruebas solicitadas.
Las funciones TypeScript serán independientes de los elementos HTML. No es necesario enlazar funciones con botones ni mostrar sus resultados en la interfaz.
Las funciones deberán probarse directamente mediante Vitest.
El docente podrá solicitar la ejecución, explicación o modificación de una parte del código para comprobar su autoría.
El proyecto debe llamarse examen-p2-ApellidoNombre, reemplazando los datos por los del estudiante.
El nombre y apellido deberán aparecer en los datos utilizados para las pruebas y en todas las capturas del informe.
Actividades por desarrollar

1. Desarrollo del componente Angular (1 punto)

Trabajar en el componente principal.

El componente deberá contener los siguientes elementos HTML:

Un encabezado <h1> con el texto Inscripciones académicas - Nombre Apellido.
Un campo de texto con id="estudiante" para el nombre completo del estudiante.
Dos campos numéricos con id="cupoMaximo" e id="inscritos".
Un área de texto <textarea> con id="observaciones" que contenga la frase Control de inscripciones académicas - Nombre Apellido.
Los campos no necesitan estar asociados a propiedades de TypeScript.

Se deberá verificar que el componente compile y se visualice correctamente.

2. Implementación de funciones TypeScript (1,5 puntos)

En el archivo TypeScript del componente, implemente las siguientes funciones independientes.

Función 1 — calcularCostoReserva(horas, tipoSala)

La función debe calcular el costo de reservar una sala considerando su tipo y el número de horas solicitadas.

Parámetros:

horas: número de horas de la reserva.
tipoSala: cadena que identifica el tipo de sala (normal o laboratorio).
Reglas de cálculo:

Una sala normal cuesta $12 por hora.
Una sala laboratorio cuesta $20 por hora.
El costo inicial se obtiene multiplicando las horas por la tarifa correspondiente.
Si la reserva supera las 3 horas, se aplica un descuento del 10 % sobre el costo inicial.
Si las horas son menores o iguales a cero, o el tipo de sala no es válido, la función debe retornar null.
Para entradas válidas, la función deberá retornar el costo final como un número.
Ejemplo:

Una reserva de 5 horas en una sala normal tendrá:

Costo inicial: 5 × 12 = $60.
Descuento: 60 × 0,10 = $6.
Costo final: $54.
Por tanto, calcularCostoReserva(5, 'normal') debe retornar 54.

Función 2 — calcularNotaFinal(nota1, nota2, examen)

La función debe calcular la calificación final de una asignatura aplicando ponderaciones diferentes.

Parámetros:

nota1: primera calificación.
nota2: segunda calificación.
examen: calificación del examen final.
Reglas de cálculo:

La primera calificación representa el 20 %.
La segunda calificación representa el 30 %.
El examen representa el 50 %.
Todas las calificaciones deben estar comprendidas entre 0 y 20.
Si alguna calificación está fuera del rango permitido, la función debe retornar null.
El resultado debe redondearse a dos decimales.
Ejemplo:

Para las calificaciones 16, 18 y 14:

Primera calificación: 16 × 0,20 = 3,20.
Segunda calificación: 18 × 0,30 = 5,40.
Examen: 14 × 0,50 = 7,00.
Calificación final: 15,60.
Por tanto, calcularNotaFinal(16, 18, 14) debe retornar 15.60.

3. Implementación de pruebas unitarias con Vitest (3 puntos)

Implemente seis pruebas unitarias independientes en el archivo .spec.ts del componente.

Cada prueba deberá tener un nombre descriptivo, utilizar el matcher indicado y comprobar el comportamiento solicitado.

Prueba 1 — Encabezado HTML (0,5 puntos)

Seleccione el elemento <h1> y compruebe que su contenido incluya el nombre y apellido del estudiante.

Matcher obligatorio: toContain().

Prueba 2 — Campo de texto (0,5 puntos)

Asigne programáticamente el nombre completo del estudiante al campo id="estudiante".

Compruebe que el valor obtenido del campo sea exactamente igual al texto asignado.

Matcher obligatorio: toEqual().

Prueba 3 — Campos numéricos (0,5 puntos)

Asigne los valores:

cupoMaximo = 35
inscritos = 28
Compruebe que el valor numérico de inscritos sea menor que cupoMaximo.

Matcher obligatorio: toBeLessThan().

Prueba 4 — Área de texto (0,5 puntos)

Seleccione el elemento id="observaciones" y compruebe que su contenido coincida con la frase Control de inscripciones académicas - Nombre Apellido, utilizando el nombre real del estudiante.

Matcher obligatorio: toMatch().

Prueba 5 — Cálculo de costo de reserva (0,5 puntos)

Ejecute la función calcularCostoReserva() y compruebe los siguientes escenarios dentro de la misma prueba:

Una sala normal de 2 horas debe retornar 24.
Una sala de laboratorio de 5 horas debe retornar 90.
Una reserva de 0 horas debe retornar null.
Matcher obligatorio: toEqual().

Prueba 6 — Cálculo de nota final (0,5 puntos)

Ejecute la función calcularNotaFinal() y compruebe:

Las notas 16, 18 y 14 deben retornar 15.60.
Las notas 20, 20 y 20 deben retornar 20.
Si alguna nota supera 20, la función debe retornar null.
Matcher obligatorio: toBe().

Consideraciones para las seis pruebas:

Cada prueba debe ser independiente y no depender de la ejecución de otra.
Se deberá utilizar la estructura Arrange–Act–Assert.
Las pruebas deben ejecutar los métodos reales del componente.
No se aceptarán aserciones que comparen únicamente constantes sin evaluar la funcionalidad.
Se deberán comprobar todos los escenarios indicados dentro de las pruebas 5 y 6.
Todas las pruebas deberán finalizar correctamente al ejecutar ng test.
4. Aplicación del ciclo TDD (0,5 puntos)

Utilice la prueba 5 para demostrar el desarrollo guiado por pruebas.

Realice el siguiente procedimiento:

Escriba la prueba antes de completar la implementación de calcularCostoReserva().
Ejecútela y compruebe que falla porque la función aún no cumple con los resultados esperados.
Implemente o corrija la función.
Ejecute nuevamente la prueba y compruebe que todos los escenarios se cumplen.
Se deberán presentar capturas de la ejecución inicialmente fallida y posteriormente exitosa.

5. Cobertura de pruebas (1 punto)

Ejecute:

ng test --coverage

Genere y revise el reporte de cobertura de Vitest.

Se deberá alcanzar al menos un 85 % de cobertura de sentencias del archivo TypeScript del componente desarrollado.

Si el porcentaje es inferior, se deberán incorporar pruebas adicionales para cubrir los escenarios no ejecutados.

No se permitirá modificar artificialmente la configuración para excluir las funciones evaluadas del reporte de cobertura.

Evidencia final (archivo PDF)

El documento deberá contener obligatoriamente:

Portada: nombre completo del estudiante, asignatura, NRC, fecha y nombre de la evaluación.
Componente Angular: capturas del archivo HTML mostrando todos los elementos e identificadores solicitados.
Funciones TypeScript: capturas del código completo de las dos funciones desarrolladas, mostrando sus parámetros y condiciones.
Pruebas HTML: capturas de las primeras cuatro pruebas, con sus respectivos matchers.
Pruebas de funciones: capturas de las pruebas 5 y 6, incluyendo los escenarios evaluados.
Evidencia TDD: captura de la prueba inicialmente fallida y de su posterior ejecución exitosa.
Ejecución final: captura de ng test, mostrando todas las pruebas aprobadas.
Cobertura: captura del reporte generado por Vitest, indicando el porcentaje alcanzado.
Comentario final: reflexión de 3 a 5 líneas sobre los problemas identificados, las correcciones y los resultados de cobertura.
Criterios de evaluación



describe('Test for divide', () => {
    let oCalculator: Calculator;
    beforeEach(() => {
      oCalculator = new Calculator();
    });
    it('should create an instance', () => {
      // ARRANGE
      let expectedResult = 2;
      // ACT & ASSERT
      expect(oCalculator.divide(6, 3)).toEqual(expectedResult);
      expect(oCalculator.divide(5, 2)).toEqual(2.5);
    });
    it('divide for zero', () => {
      // ARRANGE

      // ACT & ASSERT
      expect(oCalculator.divide(500, 0)).toBeNull();

    });

    FUNCIONES TRABAJADAS EJEMPLOS 
    HTML SOLO CON LO PEDIDO NADA DE DISEÑO SOLO LOS TEXTBOX Y LO QUE SE PIDE. 
    
    

## Archivos trabajados y modificados

En este proyecto el componente principal utiliza los nombres `app.*` (no `app.component.*`):

- `src/app/app.html`: contiene el encabezado con el nombre Steven Loza, campos con etiquetas descriptivas y controles para ejecutar y visualizar el desglose de ambos cálculos.
- `src/app/app.ts`: contiene las funciones `calcularCostoReserva()` y `calcularNotaFinal()`, además de los métodos que validan los datos de los formularios y preparan los resultados visibles.
- `src/app/app.spec.ts`: contiene pruebas con Vitest y TestBed para los campos, las funciones de cálculo y la interacción de los botones.
- `package.json`: incluye `@vitest/coverage-v8`, necesario para ejecutar las pruebas con cobertura.
- `package-lock.json`: registra la dependencia de cobertura y sus dependencias.
- `Indicaciones.md`: este resumen de archivos y comandos.

## Comandos para ejecutar el proyecto y las pruebas

Ejecuta estos comandos desde la carpeta raíz del proyecto (`PartePractica_P2`):

```powershell
cd C:\Users\STEVEN\Pruebas_de_Software\PartePractica_P2
npm install
```

Para iniciar la aplicación Angular y visualizar el HTML, ejecuta:

```powershell
npm start
```

Abre `http://localhost:4200` en el navegador. Mantén esa terminal abierta mientras uses la aplicación; para detener el servidor, presiona `Ctrl+C`.

Para ejecutar las pruebas unitarias:

```powershell
npx ng test
```

Para ejecutar las pruebas y generar el reporte de cobertura:

```powershell
npx ng test --coverage
```

La ejecución actual contiene 12 pruebas aprobadas y supera el 85 % de cobertura solicitado. Ejecuta el comando anterior para consultar los porcentajes vigentes.

Para comprobar la compilación de la aplicación:

```powershell
npx ng build
```
