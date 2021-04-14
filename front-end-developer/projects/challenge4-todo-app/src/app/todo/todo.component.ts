import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service';

export enum DisplayState {
  ALL,
  ACTIVE,
  COMPLETED
}


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoList: Todo[];
  todoDetail: string;
  displayState = DisplayState;
  state: DisplayState = DisplayState.ALL;

  constructor(private todoService: TodoService) {
    this.todoList = [];
    this.todoDetail = '';
  }

  ngOnInit(): void {
    this.fetchTodo();
  }

  fetchTodo(): void {
    this.todoService.get().subscribe((todoList) => {
      this.todoList = todoList;
    });
  }

  onAdd(): void {
    this.todoService.add(this.todoDetail);
    this.todoDetail = '';
  }

  changeState(newState: DisplayState): void {
    this.state = newState;
  }

  onTodoToggle(id: number): void {
    this.todoService.toggle(id);
  }

  filterTodo(todoList: Todo[]): Todo[] {
    switch (this.state) {
      case this.displayState.ACTIVE:
        todoList = todoList.filter(todo => !todo.isCompleted);
        break;
      case this.displayState.COMPLETED:
        todoList = todoList.filter(todo => todo.isCompleted);
        break;
    }
    return todoList;
  }

  onDeleteAll(): void {
    this.todoService.deleteAllCompleted();
  }

  deleteTodo(id: number): void {
    this.todoService.delete(id);
  }

}
