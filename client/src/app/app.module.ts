import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CodeEditorModule } from '@ngstack/code-editor';
import { SharedModule } from './modules/shared/shared.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ToastComponent } from './components/toast/toast.component';
import { MonacoEditorComponentComponent } from './components/monaco-editor-component/monaco-editor-component.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoaderComponent,
    ToastComponent,
    MonacoEditorComponentComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CodeEditorModule.forRoot({
      baseUrl: 'assets/monaco',
      typingsWorkerUrl: 'assets/workers/typings-worker.js'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
