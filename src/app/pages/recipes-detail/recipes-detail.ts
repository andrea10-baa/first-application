import { Component, computed, input, signal } from '@angular/core';
import { RECIPES_LIST_DATA } from '../../data/recipes-list-data';

@Component({
  selector: 'app-recipes-detail',
  imports: [],
  templateUrl: './recipes-detail.html',
  styleUrl: './recipes-detail.css',
})
export class RecipesDetail {

  id = input<string>();

  recipesList = signal(RECIPES_LIST_DATA);

  filterRecipesList = computed(() => {
    return this.recipesList()
      .recipes
      .filter(
        x => x.id === Number(this.id())
      )
  });

}
