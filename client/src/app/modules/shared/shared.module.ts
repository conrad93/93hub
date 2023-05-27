import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CodeEditorModule } from '@ngstack/code-editor';
import { StatusPipe } from 'src/app/pipes/status.pipe';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { MonacoEditorComponent } from 'src/app/components/monaco-editor/monaco-editor.component';

@NgModule({
  declarations: [
    StatusPipe,
    SafePipe,
    MonacoEditorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CodeEditorModule.forRoot({
      baseUrl: 'assets/monaco',
      typingsWorkerUrl: 'assets/workers/typings-worker.js'
    })
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    StatusPipe,
    SafePipe,
    MonacoEditorComponent
  ]
})
export class SharedModule { }
