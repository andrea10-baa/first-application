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

  // función unificada: lee filterType y decide qué filtro aplicar
  filtrar() {
    if (this.filterType === 'NAME') {
      this._router.navigate(['recipes-detail-v2'], {
        queryParams: {name: this._name}
      });
    } else if (this.filterType === 'DIFFICULTY') {
      this._router.navigate(['recipes-detail-v2'], {
        queryParams: {difficulty: this._difficulty}
      });
    }
  }
}
