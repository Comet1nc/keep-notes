import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/notes',
    pathMatch: 'full',
  },
  {
    path: 'notes',
    loadChildren: () =>
      import('./pages/notes/notes.module').then((m) => m.NotesModule),
  },
  {
    path: 'bin',
    loadChildren: () =>
      import('./pages/bin/bin.module').then((m) => m.BinModule),
  },
  {
    path: 'archive',
    loadChildren: () =>
      import('./pages/archive/archive.module').then((m) => m.ArchiveModule),
  },
  {
    path: 'reminders',
    loadChildren: () =>
      import('./pages/reminders/reminders.module').then(
        (m) => m.RemindersModule
      ),
  },
  {
    path: 'custom-notes',
    loadChildren: () =>
      import('./pages/custom-notes/custom-notes.module').then(
        (m) => m.CustomNotesModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
