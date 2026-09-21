import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RECIPES_LIST_DATA } from '../../data/recipes-list-data';

@Component({
  selector: 'app-recipes',
  imports: [],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css'
})
export class Recipes {
  recipesList = RECIPES_LIST_DATA;

  _recipesListFilter: any[] = [];

  constructor(private router: Router) {}

  viewDetails(id: number) {
    this.router.navigate(['/recipes-detail', id]);
  }
}
