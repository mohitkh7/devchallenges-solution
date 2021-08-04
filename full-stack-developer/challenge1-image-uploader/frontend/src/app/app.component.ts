import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONSTANTS } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  SERVER_URL = APP_CONSTANTS.SERVER_URL;
  State = State;
  currState: State = State.INIT;
  image: any;
  file: any;
  imageUrl: string = '';
  failureMsg = '';
  formData: FormData = new FormData();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

  }

  uploadImage(): void {
    this.formData = new FormData();
    this.formData.append('image', this.file, this.file.name);
    this.changeState(State.PROGRESS);
    this.http.post(this.SERVER_URL + '/upload', this.formData).subscribe((resp: any) => {
      this.imageUrl = resp.imagePath;
      this.changeState(State.SUCCESS);
    }, (error) => {
      console.error(error);
      this.failureMsg = error.error.message;
      this.changeState(State.FAIL);
    });
  }

  changeState(newState: State): void {
    this.currState = newState;
  }

  onFileChanged(event: any): void {
    const fileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
    }
  }

  onFileDrop(file: File): void {
    this.file = file;
  }

  onCopy(): void {
    let urlTextElement = document.getElementById('image-url-text') as HTMLInputElement;
    const copyText = this.SERVER_URL + urlTextElement?.innerHTML;
    navigator.clipboard.writeText(copyText).then().catch(e => console.error(e));
  }

  uploadAnotherFile(): void {
    this.file = null;
    this.changeState(State.INIT);
  }
}

enum State {
  INIT,
  PROGRESS,
  SUCCESS,
  FAIL
}
