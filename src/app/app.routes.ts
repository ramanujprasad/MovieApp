import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { SearchComponent } from './search/search.component';
import { FeaturedComponent } from './featured/featured.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// Route Configuration
export const routes: Routes = [
    {
        path: '',
        component: SearchComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'featured',
        component: FeaturedComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

export const AppRoutingProvider: ModuleWithProviders = RouterModule.forRoot(routes);
