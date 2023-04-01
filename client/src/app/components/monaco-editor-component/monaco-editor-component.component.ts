import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CodeModel } from '@ngstack/code-editor';

@Component({
  selector: 'app-monaco-editor-component',
  templateUrl: './monaco-editor-component.component.html',
  styleUrls: ['./monaco-editor-component.component.css']
})
export class MonacoEditorComponentComponent implements OnInit {

  @Input() language!: string;
  @Input() value!: string;
  @Output() outputCode = new EventEmitter<string>();
  theme = 'vs-dark';
  model: CodeModel = {
    language: '',
    value: '',
    uri: '',
  };
  options = {
    lineNumbers: true,
    contextmenu: true,
    minimap: {
      enabled: false
    }
  };
  extension:any = {
    javascript: "js",
    json: "json",
    typescript: "ts",
    html: "html",
    css: "css"
  };

  ngOnInit() {
    this.model.language = this.language ? this.language : '';
    this.model.value = this.value ? this.value : '';
    this.model.uri = this.language ? 'main.' + this.extension[this.language] : '';
  }

  onCodeChanged(value: string) {
    this.outputCode.emit(value);
  }

}
