import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { ToolBarComponent } from './main-components/tool-bar/tool-bar.component';
import { SideNavModule } from './main-components/side-nav/side-nav.module';
import { SettingsMenuComponent } from './main-components/tool-bar/settings-menu/settings-menu.component';
import { MatRippleModule } from '@angular/material/core';
import { SharedComponentsModule } from './shared-components/shared-components.module';
import { ArchiveService } from './services/archive.service';
import { BinService } from './services/bin.service';

@NgModule({
  declarations: [AppComponent, ToolBarComponent, SettingsMenuComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    MatCardModule,
    MatSelectModule,
    MatRippleModule,
    SideNavModule,
    SharedComponentsModule,
  ],
  providers: [ArchiveService, BinService],
  bootstrap: [AppComponent],
})
export class AppModule {}
