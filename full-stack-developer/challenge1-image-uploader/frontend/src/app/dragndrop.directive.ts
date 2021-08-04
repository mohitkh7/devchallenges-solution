import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDragndrop]'
})
export class DragndropDirective {
  @Output() fileDropped = new EventEmitter<File>();

  constructor() { }

  // mouse enter event
  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent): void {
  }

  // dragenter listener
  @HostListener('dragenter', ['$event'])
  onDragEnter(event: DragEvent): void {
    this.disableDefaultEvent(event);
  }

  // dragover listener
  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    this.disableDefaultEvent(event);
  }

  // dragleave listener
  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    this.disableDefaultEvent(event);
  }

  // drag drop listener
  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    this.disableDefaultEvent(event);
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.fileDropped.emit(files[0]);
    }
  }

  private disableDefaultEvent(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

}
