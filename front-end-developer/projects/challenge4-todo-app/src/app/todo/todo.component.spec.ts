import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { TodoComponent } from './todo.component';
import { TodoService } from './todo.service';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let todoServiceSpy: jasmine.SpyObj<TodoService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TodoService', ['deleteAllCompleted', 'get', 'add', 'toggle', 'delete']);
    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ TodoComponent ],
      providers: [{ provide: TodoService, useValue: spy }]
    })
    .compileComponents();
    todoServiceSpy = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
  });

  beforeEach(() => {
    todoServiceSpy.get.and.returnValue(of([]));
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onAdd() should add todo and clear todo input', () => {
    component.todoDetail = 'lorem ipsum';
    component.onAdd();
    expect(todoServiceSpy.add).toHaveBeenCalledWith('lorem ipsum');
    expect(component.todoDetail).toBe('');
  });

  it('changeState() should change state of display todo', () => {
    component.state = component.displayState.ACTIVE;
    component.changeState(component.displayState.COMPLETED);
    expect(component.state).toEqual(2);
  });

  it('onTodoToggle() should call todo service toggle', () => {
    const id = 1;
    component.onTodoToggle(id);
    expect(todoServiceSpy.toggle).toHaveBeenCalledWith(id);
  });

  it('filterTodo() should filter active todos when state is "Active"', () => {
    component.state = component.displayState.ACTIVE;
    const todoList = [
      {id: 1, detail: 'a', isCompleted: true},
      {id: 2, detail: 'b', isCompleted: true},
      {id: 3, detail: 'c', isCompleted: false},
    ];
    expect(component.filterTodo(todoList).length).toBe(1);
  });

  it('filterTodo() should filter completed todos when state is "Completed"', () => {
    component.state = component.displayState.COMPLETED;
    const todoList = [
      {id: 1, detail: 'a', isCompleted: true},
      {id: 2, detail: 'b', isCompleted: true},
      {id: 3, detail: 'c', isCompleted: false},
    ];
    expect(component.filterTodo(todoList).length).toBe(2);
  });

  it('onDeleteAll() should call todo service to delete all completed todos', () => {
    component.onDeleteAll();
    expect(todoServiceSpy.deleteAllCompleted).toHaveBeenCalled();
  });

  it('deleteTodo() should call todo service to delete specific todo', () => {
    component.deleteTodo(1);
    expect(todoServiceSpy.delete).toHaveBeenCalledWith(1);
  });
});
