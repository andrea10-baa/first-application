import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RECIPES_LIST_DATA } from '../../data/recipes-list-data';

@Component({
  selector: 'app-recipes-list',
  imports: [RouterLink, FormsModule],
  templateUrl: './recipes-list.html',
  styleUrl: './recipes-list.css',
})
export class RecipesList {

  // tipo de filtro seleccionado: NAME o DIFFICULTY
  filterType = '';

  // valor ingresado en el input de nombre
  _name = '';

  // valor seleccionado en el dropdown
  _difficulty = '';

  _router = inject(Router);

  recipesList = RECIPES_LIST_DATA;
  _recipesListFilter = this.recipesList.recipes;

  viewDetails(id: number) {
    this._router.navigate(['recipes-detail', id]);
  }

  // true solo si hay un tipo de filtro elegido Y su valor no está vacío
  get canFilter(): boolean {
    if (this.filterType === 'NAME') {
      return this._name.trim().length > 0;
    }
    if (this.filterType === 'DIFFICULTY') {
      return this._difficulty.trim().length > 0;
    }
    return false;
  }

  // FILTRO LOCAL: filtra la tabla de esta misma página
  filterRecipesList(): void {
    if (this.filterType === 'NAME') {
      this.filterRecipesListByName();
    } else if (this.filterType === 'DIFFICULTY') {
      this.filterRecipesListByDifficulty();
    } else {
      this._recipesListFilter = this.recipesList.recipes;
    }
  }

  filterRecipesListByName(): void {
    this._recipesListFilter = this.recipesList.recipes.filter((x) =>
      x.name.toLowerCase().includes(this._name.toLowerCase())
    );
  }

  filterRecipesListByDifficulty(): void {
    this._recipesListFilter = this.recipesList.recipes.filter((x) =>
      x.difficulty.toLowerCase().includes(this._difficulty.toLowerCase())
    );
  }

  // FILTRO EXTERNO: redirige a recipes-detail-v2 con query params
  filterRecipesListExternal(): void {
    this._router.navigate(['recipes-detail-v2'], {
      queryParams:
        this.filterType === 'NAME'
          ? { name: this._name }
          : { difficulty: this._difficulty },
    });
  }

}
