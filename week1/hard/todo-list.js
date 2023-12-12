/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor () {
    this.toDos = [];
  }

  add(toDo) {
    this.toDos.push(toDo);
  }

  remove(indexOfTodo) {
    if(this.toDos[indexOfTodo]) {
      this.toDos.splice(indexOfTodo, 1);
    }
  }

  update(indexOfTodo, updatedTodo) {
    if(this.toDos[indexOfTodo]) {
      this.toDos[indexOfTodo] = updatedTodo;
    }
  }

  get(indexOfTodo) {

    if(this.toDos[indexOfTodo]) {
      return this.toDos[indexOfTodo];
    } else {
      return null;
    }
  }

  getAll() {
    return this.toDos;
  }

  clear() {
    this.toDos = [];
  }

}

module.exports = Todo;
