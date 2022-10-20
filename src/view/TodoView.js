class TodoView {
  static createSimpleViewFromVO(index, vo) {
    const checked = vo.isCompleted ? 'checked' : '';
    return `
            <li>
                <input
                 type="checkbox"
                  id="${index}"
                  ${checked}
                  >${vo.title}
                </li>
           `;
  }
}
export default TodoView;
