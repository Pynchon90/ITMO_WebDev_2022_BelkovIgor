class TodoView {
  static createSimpleViewFromVO(index, vo) {
    return `
            <li>
                <input type="checkbox" id="${index}">${vo.title}
                </li>
           `;
  }
}
export default TodoView;
