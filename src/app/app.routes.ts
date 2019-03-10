import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { SearchComponent } from './components/search/search.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
// Route Configuration
export const routes: Routes = [
    { path: '', component: SearchComponent },
    { path: 'search', component: SearchComponent },
    { path: 'featured', component: FeaturedComponent },
    { path:'**', component: PageNotFoundComponent}
];

export const appRoutingProvider: ModuleWithProviders = RouterModule.forRoot(routes);
