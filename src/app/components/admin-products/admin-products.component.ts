import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { UtilityService } from '../../services/utility.service';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/error.service';
@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent {

  listProdutcs: Product[] = []
  idUser: any = null;
  editingProduct: Product | null = null; // Producto en edición
  isEditModalOpen = false; // Estado del modal
  isAddModalOpen = false;
  isConfirmModalOpen = false;
  productSelectDelete: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    userCreatedId: 0,
    image: '',
    codeProduct: ''
  };
  newProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    userCreatedId: 0,
    image: '',
    codeProduct: ''
  }; // Producto inicial

  constructor(private _productService: ProductService, private _utilityService: UtilityService, private toastr: ToastrService, private router: Router, private _errorService: ErrorService) {

  }

  openEditModal(product: Product) {
    this.editingProduct = { ...product }; // Hacer una copia para editar
    this.isEditModalOpen = true;
  }

  openAddModal() {
    this.newProduct = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      stock: 0,
      userCreatedId: this.idUser,
      image: '',
      codeProduct: ''
    }; // Restaurar valor por defecto
    this.isAddModalOpen = true;
  }

  closeEditModal() {
    this.editingProduct = null;
    this.isEditModalOpen = false;
  }

  ngOnInit(): void {
    this.setUser();
    this.getOrdersById();
  }

  getOrdersById() {
    this._productService.getProducts().subscribe(data => {
      this.listProdutcs = data;

    })
  }

  setUser() {
    const user = localStorage.getItem("user");
    this.idUser = user;

  }

  setDateFormat(dateString: string): string {
    return this._utilityService.extractDateFromTimestamp(dateString);
  }

  setMoneyFormat(numero: number): string {
    return this._utilityService.formatNumberWithSeparators(numero);
  }

  editProduct() {
    const product = this.editingProduct;

    if (product) {
      if (product.name == '') {
        this.toastr.warning(`El nombre del producto no puede ser Vacio`, 'Advertencia')
        return;
      }

      if (product.price == 0) {
        this.toastr.warning(`El valor del producto no puede ser Cero`, 'Advertencia')
        return;
      }

      this._productService.editProduct(product).subscribe({
        next: (v) => {
          this.toastr.success(`El producto <b>${product.name}</b> fue actualizado con exito`, 'Producto Editado')
          this.closeEditModal()
          this.getOrdersById()
        },
        error: (e: HttpErrorResponse) => {
          this._errorService.msjError(e);
        },
        complete: () => { console.info('Complete'); }

      })
    }


  }

  closeAddModal() {
    this.isAddModalOpen = false;
  }

  deleteProduct() {
    this._productService.deleteProduct(this.productSelectDelete.id).subscribe({
      next: (v) => {
        this.toastr.error(`El producto <b>${this.productSelectDelete.name}</b> fue eliminado con exito`, 'Producto Eliminado')
        this.closeEditModal()
        this.getOrdersById()
        this.closeConfirmModal()
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
      },
      complete: () => { console.info('Complete'); }

    })
  }

  openConfirmModal(product: Product) {
    this.isConfirmModalOpen = true;
    this.productSelectDelete = product;
  }

  closeConfirmModal() {
    this.isConfirmModalOpen = false;
  }

  saveProduct() {
    const product = this.newProduct;

    if (product) {
      if (product.name == '') {
        this.toastr.warning(`El nombre del producto no puede ser Vacio`, 'Advertencia')
        return;
      }

      if (product.price == 0) {
        this.toastr.warning(`El valor del producto no puede ser Cero`, 'Advertencia')
        return;
      }

      this._productService.saveProduct(product).subscribe({
        next: (v) => {
          this.toastr.success(`El producto <b>${product.name}</b> fue creado con exito`, 'Producto Registrado')
          this.closeAddModal()
          this.getOrdersById()
        },
        error: (e: HttpErrorResponse) => {
          this._errorService.msjError(e);
        },
        complete: () => { console.info('Complete'); }

      })
    }
  }


}
