import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'controls',
    pathMatch: 'full'
  },
  {
    path: 'controls',
    loadChildren: './controls/controls.module#ControlsPageModule'
  },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  // {
  //   path: 'settings',
  //   loadChildren: './settings/settings.module#SettingsPageModule'
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
