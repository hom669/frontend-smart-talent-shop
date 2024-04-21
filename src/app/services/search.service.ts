import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchTermSubject = new BehaviorSubject<string>('');
  public searchTermObservable = this.searchTermSubject.asObservable();

  updateSearchTerm(term: string) {
    this.searchTermSubject.next(term); // Actualizar el valor del término de búsqueda
  }
}