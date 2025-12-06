import { Checkbox, CheckboxProps, Menu, MenuProps } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import type { TodoDto } from "../../../../../../packages/team-do-types/src/index.js";

// Menu options for a todo
type MenuItem = Required<MenuProps>['items'][number];
const todoActionMenu: MenuItem[] = [
  {
    key: 'todo-actions',
    children: [
      {
        key: 'edit',
        label: 'Edit',
        icon: null,
      },
      {
        key: 'delete',
        label: 'Delete',
        icon: null,
      },
      {
        key: 'share',
        label: 'Share',
        icon: null,
      },
    ]
  }
]


// Checkbox check/uncheck handler, change matching todo item in atom
const checkBoxChange: CheckboxProps['onChange'] = (e) => {
  console.log(`checked = ${e.target.checked}`);

  if (e.target.checked) {
    // Send PUT request to mark todo as completed to server
    console.log("Marking todo as completed");
  }
  else {
    // Send PUT request to mark todo as not completed to server
    console.log("Marking todo as not completed");
  }
};

const menuClick: MenuProps['onClick'] = (e) => {
  console.log('click', e);
  switch (e.key) {
    case 'edit':
      console.log("Editing todo");
      break;
    case 'delete':
      console.log("Deleting todo");
      break;
    case 'share':
      console.log("Sharing todo");
      break;
    default:
      break;
  }
};

export default function TodoItem({ todo }: { todo: TodoDto }){
  return (
    <div className="text-teal-900">
      <Checkbox className={todo.id} onChange={checkBoxChange} checked={todo.completed}>{todo.title}</Checkbox>
      <Menu onClick={menuClick} mode="vertical" items={todoActionMenu}/>
    </div>
  );
}
