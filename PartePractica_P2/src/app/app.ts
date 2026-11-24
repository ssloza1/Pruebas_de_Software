import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  public costoCalculado = false;
  public detalleCostoReserva: {
    horas: number;
    tipoSala: string;
    tarifa: number;
    costoInicial: number;
    descuento: number;
    resultado: number;
  } | null = null;
  public mensajeCostoReserva = '';

  public notaCalculada = false;
  public detalleNotaFinal: {
    ponderacion1: number;
    ponderacion2: number;
    ponderacionExamen: number;
    resultado: number;
  } | null = null;
  public mensajeNotaFinal = '';

  public calcularCostoReserva(horas: number, tipoSala: string): number | null {
    if (horas <= 0 || (tipoSala !== 'normal' && tipoSala !== 'laboratorio')) {
      return null;
    }

    const tarifa = tipoSala === 'normal' ? 12 : 20;
    const costoInicial = horas * tarifa;

    return horas > 3 ? costoInicial * 0.9 : costoInicial;
  }

  public calcularNotaFinal(
    nota1: number,
    nota2: number,
    examen: number,
  ): number | null {
    if (
      [nota1, nota2, examen].some((nota) => nota < 0 || nota > 20)
    ) {
      return null;
    }

    const resultado = nota1 * 0.2 + nota2 * 0.3 + examen * 0.5;
    return Number(resultado.toFixed(2));
  }

  public ejecutarCalculoCosto(horasTexto: string, tipoSala: string): void {
    this.costoCalculado = true;
    this.detalleCostoReserva = null;

    const horas = Number(horasTexto);
    if (horasTexto.trim() === '' || !Number.isFinite(horas)) {
      this.mensajeCostoReserva = 'Ingresa una cantidad de horas válida.';
      return;
    }

    const resultado = this.calcularCostoReserva(horas, tipoSala);
    if (resultado === null) {
      this.mensajeCostoReserva =
        'Las horas deben ser mayores que cero y el tipo de sala debe ser válido.';
      return;
    }

    const tarifa = tipoSala === 'normal' ? 12 : 20;
    const costoInicial = horas * tarifa;
    const descuento = horas > 3 ? costoInicial * 0.1 : 0;

    this.mensajeCostoReserva = '';
    this.detalleCostoReserva = {
      horas,
      tipoSala,
      tarifa,
      costoInicial,
      descuento,
      resultado,
    };
  }

  public ejecutarCalculoNotaFinal(
    nota1Texto: string,
    nota2Texto: string,
    examenTexto: string,
  ): void {
    this.notaCalculada = true;
    this.detalleNotaFinal = null;

    const textosNotas = [nota1Texto, nota2Texto, examenTexto];
    const notas = textosNotas.map(Number);
    if (
      textosNotas.some((texto) => texto.trim() === '') ||
      notas.some((nota) => !Number.isFinite(nota))
    ) {
      this.mensajeNotaFinal = 'Ingresa las tres notas como números.';
      return;
    }

    const [nota1, nota2, examen] = notas;
    const resultado = this.calcularNotaFinal(nota1, nota2, examen);
    if (resultado === null) {
      this.mensajeNotaFinal = 'Cada nota debe estar entre 0 y 20.';
      return;
    }

    this.mensajeNotaFinal = '';
    this.detalleNotaFinal = {
      ponderacion1: nota1 * 0.2,
      ponderacion2: nota2 * 0.3,
      ponderacionExamen: examen * 0.5,
      resultado,
    };
  }
}
