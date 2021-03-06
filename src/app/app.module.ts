import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// rutas
import { APP_ROUTES } from './app.routes';

// importacion de modulos
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceModule } from './services/service.module';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SpeechRecognitionModule } from '@kamiazya/ngx-speech-recognition';
import { ListaOperacionesComponent } from './security/lista-operaciones/lista-operaciones.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ListaOperacionesComponent,
 ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ServiceModule,
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    SpeechRecognitionModule.forRoot({ lang: 'en-US' }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
