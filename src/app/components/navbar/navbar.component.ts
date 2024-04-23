import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { SearchService } from '../../services/search.service';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public isAdmin: boolean = false;
  public isMenuOpen: boolean = false;
  public isSearchOpen: boolean = false;
  public idUser: any = null;
  public itemCount = 0;
  public isSearchVisible = true;
  public currentRoute: string = '';


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    localStorage.removeItem("user");
    localStorage.removeItem("shoppingCart");
    this.router.navigate(['/login']);
  }

  constructor(private router: Router, private _cartService: CartService, private _searchService: SearchService) {

  }

  ngOnInit(): void {
    this.verifyAdmin()
    this.setUser()
    this._cartService.cartItemCountObservable.subscribe((count) => {
      console.log('!ASSSS')
      this.itemCount = count; // Actualiza el valor del badge
    });
    this.subscribeToRouterEvents();
  }

  subscribeToRouterEvents() {
    this.currentRoute = this.router.url;
    this.isSearchVisible = this.currentRoute.includes('/dashboard');
    console.log(this.currentRoute, this.isSearchVisible)
  }

  verifyAdmin() {
    const profile = localStorage.getItem("profile");
    profile === 'Administrador' ? this.isAdmin = true : this.isAdmin = false;

  }

  setUser() {
    const user = localStorage.getItem("user");
    this.idUser = user;

  }

  showingCart() {
    this._cartService.toggleShowCart(); // Alterna el estado del carrito
  }

  onSearchChange(event: any) {
    const searchTerm = event.target.value;
    this._searchService.updateSearchTerm(searchTerm);
  }
}
