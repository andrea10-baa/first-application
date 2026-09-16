import { Component, signal, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipes-list',
  imports: [RouterLink, FormsModule],
  templateUrl: './recipes-list.html',
  styleUrl: './recipes-list.css',
})
export class RecipesList {

  recipesList = signal<any>({
    recipes: [],
    total: 0,
    skip: 0,
    limit: 30
  });

  // tipo de filtro seleccionado: NAME o DIFFICULTY
  filterType = '';
  // valor ingresado en el input de nombre
  name = '';
  // valor seleccionado en el dropdown de dificultad
  difficulty = '';

  // guarda el filtro que realmente se aplicó al hacer clic en el botón
  appliedFilter = signal<{ type: string, value: string }>({ type: '', value: '' });

  filteredRecipes = computed(() => {
    const recipes = this.recipesList().recipes;
    const filter = this.appliedFilter();

    if (filter.type === 'NAME' && filter.value) {
      return recipes.filter((r: any) =>
        r.name.toLowerCase().includes(filter.value.toLowerCase())
      );
    }

    if (filter.type === 'DIFFICULTY' && filter.value) {
      return recipes.filter((r: any) =>
        r.difficulty.toLowerCase() === filter.value.toLowerCase()
      );
    }

    return recipes;
  });

  constructor(private router: Router) {}

  async ngOnInit() {
    const response = await fetch('https://dummyjson.com/recipes?limit=30');
    const data = await response.json();
    this.recipesList.set(data);
    // Punto 3: se cargan todos sin filtro (appliedFilter queda vacío por defecto)
  }

  viewRecipe(id: number) {
    this.router.navigate(['/recipes-detail', id]);
  }

  // Punto 1 y 2: una sola función, lee filterType (el radio marcado)
  // y decide si usa 'name' o 'difficulty' como valor a filtrar
  filterRecipesList() {
    if (this.filterType === 'NAME') {
      this.appliedFilter.set({ type: 'NAME', value: this.name });
    } else if (this.filterType === 'DIFFICULTY') {
      this.appliedFilter.set({ type: 'DIFFICULTY', value: this.difficulty });
    } else {
      this.appliedFilter.set({ type: '', value: '' });
    }
  }

}
