import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  let fixture: ReturnType<typeof TestBed.createComponent<App>>;
  let component: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('muestra el nombre en el encabezado', () => {
    // ARRANGE
    const heading: HTMLHeadingElement | null =
      fixture.nativeElement.querySelector('h1');

    // ACT
    const headingText = heading?.textContent ?? '';

    // ASSERT
    expect(headingText).toContain('Steven Loza');
  });

  it('permite asignar el nombre al campo de estudiante', () => {
    // ARRANGE
    const estudiante: HTMLInputElement =
      fixture.nativeElement.querySelector('#estudiante');

    // ACT
    estudiante.value = 'Steven Loza';

    // ASSERT
    expect(estudiante.value).toEqual('Steven Loza');
  });

  it('compara inscritos con el cupo máximo', () => {
    // ARRANGE
    const cupoMaximo: HTMLInputElement =
      fixture.nativeElement.querySelector('#cupoMaximo');
    const inscritos: HTMLInputElement =
      fixture.nativeElement.querySelector('#inscritos');

    // ACT
    cupoMaximo.value = '35';
    inscritos.value = '28';

    // ASSERT
    expect(Number(inscritos.value)).toBeLessThan(Number(cupoMaximo.value));
  });

  it.only('muestra el texto predeterminado en observaciones', () => {
    // ARRANGE
    const observaciones: HTMLTextAreaElement =
      fixture.nativeElement.querySelector('#observaciones');

    // ACT
    const contenido = observaciones.value;

    // ASSERT
    expect(contenido).toMatch(
      'Control de inscripciones académicas - Steven Loza',
    );
  });

  it('calcula el costo de reserva para los escenarios solicitados', () => {
    // ARRANGE
    // ACT
    const costoNormal = component.calcularCostoReserva(2, 'normal');
    const costoLaboratorio = component.calcularCostoReserva(5, 'laboratorio');
    const costoInvalido = component.calcularCostoReserva(0, 'normal');

    // ASSERT
    expect(costoNormal).toEqual(24);
    expect(costoLaboratorio).toEqual(90);
    expect(costoInvalido).toEqual(null);
  });

  it('calcula la nota final para los escenarios solicitados', () => {
    // ARRANGE
    // ACT
    const notaPonderada = component.calcularNotaFinal(16, 18, 14);
    const notaMaxima = component.calcularNotaFinal(20, 20, 20);
    const notaInvalida = component.calcularNotaFinal(21, 15, 15);

    // ASSERT
    expect(notaPonderada).toBe(15.6);
    expect(notaMaxima).toBe(20);
    expect(notaInvalida).toBe(null);
  });

  it('cubre descuentos, tipo de sala inválido y nota negativa', () => {
    // ARRANGE
    const horasConDescuento = 4;

    // ACT
    const costoNormalConDescuento = component.calcularCostoReserva(
      horasConDescuento,
      'normal',
    );
    const tipoSalaInvalido = component.calcularCostoReserva(2, 'auditorio');
    const notaNegativa = component.calcularNotaFinal(-1, 15, 15);

    // ASSERT
    expect(costoNormalConDescuento).toEqual(43.2);
    expect(tipoSalaInvalido).toEqual(null);
    expect(notaNegativa).toBe(null);
  });

  it('muestra en pantalla el desglose del costo de una reserva', () => {
    // ARRANGE
    const horas: HTMLInputElement =
      fixture.nativeElement.querySelector('#horasReserva');
    const tipoSala: HTMLSelectElement =
      fixture.nativeElement.querySelector('#tipoSala');
    const boton: HTMLButtonElement =
      fixture.nativeElement.querySelector('#calcularCosto');
    horas.value = '5';
    tipoSala.value = 'laboratorio';

    // ACT
    boton.click();
    fixture.detectChanges();

    // ASSERT
    const resultado: HTMLElement | null =
      fixture.nativeElement.querySelector('#costoReservaResultado');
    expect(resultado?.textContent).toContain('Tipo de sala: laboratorio');
    expect(resultado?.textContent).toContain('Costo inicial: $100.00');
    expect(resultado?.textContent).toContain('Descuento: $10.00');
    expect(resultado?.textContent).toContain('Costo final: $90.00');
  });

  it('muestra el desglose de las ponderaciones de la nota final', () => {
    // ARRANGE
    const nota1: HTMLInputElement =
      fixture.nativeElement.querySelector('#nota1');
    const nota2: HTMLInputElement =
      fixture.nativeElement.querySelector('#nota2');
    const examen: HTMLInputElement =
      fixture.nativeElement.querySelector('#examen');
    const boton: HTMLButtonElement =
      fixture.nativeElement.querySelector('#calcularNota');
    nota1.value = '16';
    nota2.value = '18';
    examen.value = '14';

    // ACT
    boton.click();
    fixture.detectChanges();

    // ASSERT
    const resultado: HTMLElement | null =
      fixture.nativeElement.querySelector('#notaFinalResultado');
    expect(resultado?.textContent).toContain('Nota 1 ponderada: 3.20');
    expect(resultado?.textContent).toContain('Nota 2 ponderada: 5.40');
    expect(resultado?.textContent).toContain('Examen ponderado: 7.00');
    expect(resultado?.textContent).toContain('Nota final: 15.60 / 20');
  });

  it('muestra un mensaje cuando los datos de cálculo no son válidos', () => {
    // ARRANGE
    const horas: HTMLInputElement =
      fixture.nativeElement.querySelector('#horasReserva');
    const botonCosto: HTMLButtonElement =
      fixture.nativeElement.querySelector('#calcularCosto');
    const nota1: HTMLInputElement =
      fixture.nativeElement.querySelector('#nota1');
    const nota2: HTMLInputElement =
      fixture.nativeElement.querySelector('#nota2');
    const examen: HTMLInputElement =
      fixture.nativeElement.querySelector('#examen');
    const botonNota: HTMLButtonElement =
      fixture.nativeElement.querySelector('#calcularNota');
    horas.value = '0';
    nota1.value = '21';
    nota2.value = '15';
    examen.value = '15';

    // ACT
    botonCosto.click();
    botonNota.click();
    fixture.detectChanges();

    // ASSERT
    expect(
      fixture.nativeElement.querySelector('#costoReservaResultado')?.textContent,
    ).toContain('Las horas deben ser mayores que cero');
    expect(
      fixture.nativeElement.querySelector('#notaFinalResultado')?.textContent,
    ).toContain('Cada nota debe estar entre 0 y 20.');
  });

  it('avisa cuando faltan valores numéricos para calcular', () => {
    // ARRANGE
    const botonCosto: HTMLButtonElement =
      fixture.nativeElement.querySelector('#calcularCosto');
    const botonNota: HTMLButtonElement =
      fixture.nativeElement.querySelector('#calcularNota');

    // ACT
    botonCosto.click();
    botonNota.click();
    fixture.detectChanges();

    // ASSERT
    expect(
      fixture.nativeElement.querySelector('#costoReservaResultado')?.textContent,
    ).toContain('Ingresa una cantidad de horas válida.');
    expect(
      fixture.nativeElement.querySelector('#notaFinalResultado')?.textContent,
    ).toContain('Ingresa las tres notas como números.');
  });

  it('rechaza valores que no pueden convertirse en números finitos', () => {
    // ARRANGE

    // ACT
    component.ejecutarCalculoCosto('NaN', 'normal');
    component.ejecutarCalculoNotaFinal('NaN', '15', '15');
    fixture.detectChanges();

    // ASSERT
    expect(component.mensajeCostoReserva).toBe(
      'Ingresa una cantidad de horas válida.',
    );
    expect(component.mensajeNotaFinal).toBe(
      'Ingresa las tres notas como números.',
    );
  });
});
