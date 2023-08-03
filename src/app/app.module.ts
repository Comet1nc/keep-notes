import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { ToolBarComponent } from './main-components/tool-bar/tool-bar.component';
import { SideNavModule } from './main-components/side-nav/side-nav.module';
import { SettingsMenuComponent } from './main-components/tool-bar/settings-menu/settings-menu.component';
import { AngularMaterialModule } from './modules/angular-material.module';
import { AppService } from './services/app.service';
import { EditLabelsComponent } from './main-components/edit-labels/edit-labels.component';
import { DrawComponent } from './main-components/draw/draw.component';
import { DrawService } from './main-components/draw/draw.service';
import { SharedComponentsModule } from './shared-components/shared-components.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import * as fromApp from './store/app.reducer';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { NotesEffects } from './store/notes-store/notes.effects';
import { LabelsEffects } from './store/labels-store/labels.effects';
import { ArchivedNotesEffects } from './store/archive-store/archive.effects';
import { DeletedNotesEffects } from './store/bin-store/bin.effects';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ToolBarComponent,
    SettingsMenuComponent,
    EditLabelsComponent,
    DrawComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    LayoutModule,
    SideNavModule,
    SharedComponentsModule,
    AngularMaterialModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([
      NotesEffects,
      LabelsEffects,
      ArchivedNotesEffects,
      DeletedNotesEffects,
    ]),
    StoreDevtoolsModule.instrument({ logOnly: isDevMode() }),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [AppService, DrawService],
  bootstrap: [AppComponent],
})
export class AppModule {}
