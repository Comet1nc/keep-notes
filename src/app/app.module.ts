import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LayoutModule } from '@angular/cdk/layout';
import { ToolBarComponent } from './main-components/tool-bar/tool-bar.component';
import { SideNavModule } from './main-components/side-nav/side-nav.module';
import { SettingsMenuComponent } from './main-components/tool-bar/settings-menu/settings-menu.component';
import { ArchiveService } from './services/archive.service';
import { BinService } from './services/bin.service';
import { AngularMaterialModule } from './modules/angular-material.module';
import { FormsModule } from '@angular/forms';
import { AppService } from './services/app.service';
import { EditLabelsComponent } from './main-components/edit-labels/edit-labels.component';
import { DrawComponent } from './main-components/draw/draw.component';
import { DrawService } from './main-components/draw/draw.service';
import { SharedComponentsModule } from './shared-components/shared-components.module';
import { NotesService } from './services/notes.service';
import { HttpClientModule } from '@angular/common/http';
import { LabelService } from './services/label.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import * as fromApp from './store/app.reducer';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { NotesEffects } from './store/notes-store/notes.effects';
import { LabelsEffects } from './store/labels-store/labels.effects';

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
    EffectsModule.forRoot([NotesEffects, LabelsEffects]),
    StoreDevtoolsModule.instrument({ logOnly: isDevMode() }),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    NotesService,
    ArchiveService,
    BinService,
    AppService,
    DrawService,
    LabelService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
