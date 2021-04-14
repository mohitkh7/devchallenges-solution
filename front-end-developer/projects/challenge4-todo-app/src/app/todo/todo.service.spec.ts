import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  beforeEach(() => {
    service.todoList = [
      {id: 1, detail: 'a', isCompleted: true},
      {id: 2, detail: 'b', isCompleted: false},
      {id: 3, detail: 'c', isCompleted: true},
    ];
    const store = {
      todoList: '[]'
    };
    spyOn(localStorage, 'getItem').and.callFake((key) => '[]');
    spyOn(localStorage, 'setItem').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get() should return a subject as observable', () => {
    expect(service.get()).toBeInstanceOf(Observable);
  });

  it('add() should create todo object and add to todoList', () => {
    service.add('lorem');
    expect(service.todoList).toContain({id: jasmine.any(Number), detail: 'lorem', isCompleted: false});
  });

  it('delete() should remove specified id todo from todoList', () => {
    service.delete(1);
    expect(service.todoList).not.toContain({id: 1, detail: 'a', isCompleted: true});
  });

  it('deleteAllCompleted() should remove all completed todo from todoList', () => {
    service.deleteAllCompleted();
    expect(service.todoList.length).toBe(1);
  });

  it('toggle() should change isCompleted property of specific todo', () => {
    service.toggle(1);
    expect(service.todoList[0].isCompleted).toBeFalse();
  });
});
