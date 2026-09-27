import { Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RECIPES_LIST_DATA } from '../../data/recipes-list-data';

@Component({
  selector: 'app-recipes-detail-v2',
  imports: [],
  templateUrl: './recipes-detail-v2.html',
  styleUrl: './recipes-detail-v2.css',
})
export class RecipesDetailV2 {

  name = input<string>();
  difficulty = input<string>();

  _router = inject(Router);

  recipesList = signal(RECIPES_LIST_DATA);

  _recipesListFilter = computed(() => {
    const name = this.name()?.toLowerCase() ?? '';
    const difficulty = this.difficulty()?.toLowerCase() ?? '';

    return this.recipesList().recipes.filter(x => {
      if (name) {
        return x.name.toLowerCase().includes(name);
      }
      if (difficulty) {
        return x.difficulty.toLowerCase().includes(difficulty);
      }
      return false;
    });
  });

  viewDetails(id: number) {
    this._router.navigate(['recipes-detail', id]);
  }

}
