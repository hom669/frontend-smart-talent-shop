import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

// Aquí necesitamos una referencia al Router para redirigir
export const authGuard: CanActivateFn = (route, state) => {
  const router = new Router(); // Inicializamos el Router para manejar la navegación
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token'); // Obtenemos el token del localStorage

    if (token) {
      return true; // Si hay token, permite el acceso
    } else {
      router.navigate(['/login']); // Si no hay token, redirige a /login
      return false; // Deniega el acceso
    }
  }

  return false;
};