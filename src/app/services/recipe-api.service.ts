import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../enviroment/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipeApiService {
  private apiKey = environment.apiKeyRecipes;
  private randomRecipeUrl = `${environment.apiBaseRecipes}random?number=5&apiKey=${this.apiKey}`;

  async getCombinedRecipeData() {
    const dataKey = 'combinedRecipeData';
    const expiryKey = 'combinedRecipeExpiry';
    const now = new Date().getTime();

    const storedExpiry = localStorage.getItem(expiryKey);
    const storedData = localStorage.getItem(dataKey);

    if (storedExpiry && storedData && parseInt(storedExpiry) > now) {
      return JSON.parse(storedData);
    }

    try {
      // Obtener recetas aleatorias
      const randomResponse = await axios.get(this.randomRecipeUrl);
      const randomRecipes = randomResponse.data.recipes;

      const detailedRecipes = [];

      // Recorrer cada receta y obtener información adicional
      for (const recipe of randomRecipes) {
        const recipeId = recipe.id;
        const recipeInfoUrl = `${environment.apiBaseRecipes}${recipeId}/information?includeNutrition=false&apiKey=${this.apiKey}`;

        const infoResponse = await axios.get(recipeInfoUrl);
        const recipeInfo = infoResponse.data;

        const detailedRecipe = {
          ...recipe,
          extendedIngredients: recipeInfo.extendedIngredients, // Añadir la propiedad al objeto
          additionalInfo: recipeInfo,
        };

        detailedRecipes.push(detailedRecipe);
      }

      // Guardar en `localStorage`
      const expiryTime = now + 24 * 60 * 60 * 1000; // 24 horas
      localStorage.setItem(dataKey, JSON.stringify(detailedRecipes));
      localStorage.setItem(expiryKey, expiryTime.toString());

      return detailedRecipes;
    } catch (error) {
      console.error('Error obteniendo datos de recetas:', error);
      throw error;
    }
  }
}
