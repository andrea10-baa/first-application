import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contact } from './pages/contact/contact';
import { Recipes } from './pages/recipes/recipes';
import { RecipesDetail } from './pages/recipes-detail/recipes-detail';
import { RecipesList } from './pages/recipes-list/recipes-list';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'contact', component: Contact },
  {path: 'recipes-list', component: RecipesList},
  {path: 'recipes-detail/:id', component: RecipesDetail},
  {path: 'recipes', component: Recipes},
];
