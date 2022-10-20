class TodoVO {
  static createFromTitle(title) {
    const todoId = Date.now().toString();
    return new TodoVO(todoId, title);
  }
  constructor(id, title, date = new Date()) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.isCompleted = false;
  }
}
export default TodoVO;
