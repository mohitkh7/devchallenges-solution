import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly LOCAL_STORAGE_KEY = 'todoList';
  todoList: Todo[] = [];
  private todoStorage = new BehaviorSubject<Todo[]>([]);

  constructor() {
    this.todoList = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY) || '[]');
    this.todoStorage.next(this.todoList);
  }

  store(): void {
    // store updated todo data to local storage
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.todoList));
    // notify updated todo data to subscriber component
    this.todoStorage.next(this.todoList);
  }

  get(): Observable<Todo[]> {
    return this.todoStorage.asObservable();
  }

  add(detail: string): void {
    const todo: Todo = {
      id: Date.now(),
      detail,
      isCompleted: false
    };
    this.todoList.push(todo);
    this.store();
  }

  delete(id: number): void {
    this.todoList = this.todoList.filter(todo => todo.id !== id);
    this.store();
  }

  deleteAllCompleted(): void {
    this.todoList = this.todoList.filter(todo => !todo.isCompleted);
    this.store();
  }

  toggle(id: number): void {
    for (const todo of this.todoList) {
      if (id === todo.id) {
        todo.isCompleted = !todo.isCompleted;
      }
    }
    this.store();
  }
}
