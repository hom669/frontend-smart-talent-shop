import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RecipeApiService } from '../../services/recipe-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  public recipeData: any;

  constructor(private _recipeApiService: RecipeApiService) { }

  async ngOnInit() {
    try {
      this.recipeData = await this._recipeApiService.getCombinedRecipeData();
    } catch (error) {
      console.error('Error obteniendo datos de recetas:', error);
    }
  }

}
