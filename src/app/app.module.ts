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
import { LocalStorageService } from './services/local-storage.service';
import { AngularMaterialModule } from './modules/angular-material.module';
import { FormsModule } from '@angular/forms';
import { AppService } from './services/app.service';
import { EditLabelsComponent } from './main-components/edit-labels/edit-labels.component';
import { DrawComponent } from './main-components/draw/draw.component';
import { DrawService } from './main-components/draw/draw.service';
import { CustomNotesService } from './services/custom-notes.service';
import { SharedComponentsModule } from './shared-components/shared-components.module';

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
  ],
  providers: [
    ArchiveService,
    BinService,
    LocalStorageService,
    AppService,
    DrawService,
    CustomNotesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
