import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  // Función para formatear números con separadores de miles
  public formatNumberWithSeparators(value: number): string {
    const formatter = new Intl.NumberFormat('es-ES'); // Configuración para español (España)
    return `$ ${formatter.format(value)}`; // Formatear número
  }

  // Función para extraer solo la fecha de un timestamp
  public extractDateFromTimestamp(timestamp: string): string {
    const date = new Date(timestamp);

    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Meses son de 0 a 11
    const day = date.getUTCDate().toString().padStart(2, '0'); // Día del mes
    const hours = date.getUTCHours().toString().padStart(2, '0'); // Horas (UTC)
    const minutes = date.getUTCMinutes().toString().padStart(2, '0'); // Minutos (UTC)

    return `${year}-${month}-${day} ${hours}:${minutes}`;// Formato 'YYYY-MM-DD'
  }

}
