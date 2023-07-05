import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotesResolverService } from './services/notes-resolver.service';

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
    resolve: [NotesResolverService],
  },
  {
    path: 'bin',
    loadChildren: () =>
      import('./pages/bin/bin.module').then((m) => m.BinModule),
    resolve: [NotesResolverService],
  },
  {
    path: 'archive',
    loadChildren: () =>
      import('./pages/archive/archive.module').then((m) => m.ArchiveModule),
    resolve: [NotesResolverService],
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./pages/search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'custom-notes',
    loadChildren: () =>
      import('./pages/custom-notes/custom-notes.module').then(
        (m) => m.CustomNotesModule
      ),
    resolve: [NotesResolverService],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
