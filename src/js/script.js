"use strict";
// document ui
const btnDropdown = document.getElementById("btn_dropdown");
const menuDropdown = document.getElementById("menu_dropdown");
const iconDropdown = document.getElementById("icon_dropdown");
const textDropdown = document.getElementById("text_btn_dropdown");
const itemDropdown = document.querySelectorAll(".item");
const bgBackMenu = document.querySelector("#bg_back_menu");
const selectMouse = document.getElementById("styleDelete");
// ---------
// created data
const addTodoList = document.getElementById("add_Todo");
const addTodoInput = document.getElementById("input_Todo");
const listTodoItem = document.getElementById("todoList");
const addTodoBtn = document.getElementById("add_btn");
//-----------

let menuValue = "all";

document.addEventListener("DOMContentLoaded", (e) => {
  const datas = getDatasLocalStorage();
  dataTodos(datas);
});

// Menu show
function showMenu() {
  menuDropdown.classList.toggle("hidden");
  iconDropdown.classList.toggle("-rotate-180");
  bgBackMenu.classList.toggle("hidden");
}

//filter data & ui menu
function itemMenu(value) {
  const datas = getDatasLocalStorage();
  switch (value) {
    case "all": {
      textDropdown.textContent = "مشاهده همه";
      dataTodos(datas);
      checkItem(datas.length);
      break;
    }

    case "completed": {
      textDropdown.textContent = "انجام شده";
      const newData = datas.filter((data) => {
        return data.isCompeletd;
      });
      dataTodos(newData);
      checkItem(newData.length);

      break;
    }

    case "uncompleted": {
      textDropdown.textContent = "انجام نشده";
      const newData = datas.filter((data) => {
        return !data.isCompeletd;
      });
      dataTodos(newData);
      checkItem(newData.length);
      break;
    }
    default: {
      dataTodos(datas);

      break;
    }
  }
}

btnDropdown.addEventListener("click", showMenu);

itemDropdown.forEach((item) => {
  item.addEventListener("click", (e) => {
    menuValue = e.target.value;
    itemMenu(menuValue);
  });
});

// The background that is displayed when the menu is displayed
bgBackMenu.addEventListener("click", () => {
  menuDropdown.classList.add("hidden");
  iconDropdown.classList.remove("-rotate-180");
  bgBackMenu.classList.add("hidden");
});

// -------------

// Change icon list
function styleIconMouseenter(outline, solid) {
  document.getElementById(outline).classList.add("hidden");
  document.getElementById(solid).classList.remove("hidden");
}
function styleIconMouseleave(outline, solid) {
  document.getElementById(outline).classList.remove("hidden");
  document.getElementById(solid).classList.add("hidden");
}

// ------------

// check img and item
function checkItem(data) {
  if (data !== 0) {
    listTodoItem.classList.remove("hidden");
    document.getElementById("imgListItem").classList.add("hidden");
  } else {
    listTodoItem.classList.add("hidden");
    document.getElementById("imgListItem").classList.remove("hidden");
  }
}

//create code html
function dataTodos(datatodo) {
  checkItem(datatodo.length);
  let htmldata = "";
  datatodo.forEach((data) => {
    htmldata += `<div
                  class="flex justify-between items-center p-5 ${
                    data.isCompeletd
                      ? "text-slate-400 line-through blur-sm bg-slate-900 rounded-xl "
                      : "hover:bg-slate-900 hover:rounded-xl"
                  } my-2 transition"
                >
                  <div class="w-1/2">
                    <p 
                      title="${data.title}"
                      class="text-gray-300 text-xl font-medium truncate ${
                        data.isEditing ? "hidden" : ""
                      }"
                      id="todoText${data.id}"
                      ondblclick="editItem(${data.id})"
                    >
                      ${data.title}
                    </p>
                    <input 
                      type="text"
                      class="text-gray-300 text-xl font-medium w-full bg-transparent border border-slate-700 rounded-md p-2 ${
                        data.isEditing ? "" : "hidden"
                      }"
                      id="editInput${data.id}"
                      value="${data.title}"
                      onblur="saveEdit(${data.id})"
                      onkeydown="handleEditKey(event, ${data.id})"
                    />
                  </div>
                  <div class="flex gap-5 items-center">
                    <p
                      class="font-thin text-slate-400 proportional-nums mt-0.5 hidden sm:block md:hidden lg:block"
                      title="${data.dateCreated}"
                    >
                      ${data.dateCreated}
                    </p>
                    
                    <!-- Edit Button -->
                    <button
                      onclick="editItem(${data.id})"
                      title="Edit"
                      class="edit-btn"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6 text-blue-500 hover:text-blue-700"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 3.487a2.25 2.25 0 0 1 3.182 3.182l-9.82 9.82-4.24.942.942-4.24 9.82-9.82ZM19.5 8.25 15.75 4.5M12 21h7.5"
                        />
                      </svg>
                    </button>

                    <!-- Delete Button -->
                    <button
                      onclick="removeItem(${data.id})"
                      title="Delete"
                      class="delete-btn"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6 text-red-500 hover:text-red-700"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>

                    <!-- Complete Button -->
                    <button
                      onclick="completeItem(${data.id})"
                      title="Complete"
                      class="complete-btn"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6 text-green-500 hover:text-green-700"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </button>
                  </div>
                </div>`;
  });
  listTodoItem.innerHTML = htmldata;
  addTodoInput.value = "";
}

// add data in form
function addNewTodo(e) {
  e.preventDefault();
  if (!addTodoInput.value) {
    addTodoBtn.classList.add(
      "[&>svg]:!border-red-500",
      "[&>svg]:!text-red-500",
    );
    addTodoInput.classList.add("!bg-red-700/20");
    addTodoInput.classList.add("error");
    addTodoInput.placeholder = "هنوز چیزی ننوشتی که ...";
    return;
  }
  const newData = {
    id: Date.now(),
    dateCreated: new Date().toLocaleDateString("fa"),
    title: addTodoInput.value,
    isCompeletd: false,
  };
  setDataLocalStorage(newData);
  itemMenu(menuValue);
}

addTodoList.addEventListener("submit", addNewTodo);

// -------------------

// event remove item
function removeItem(id) {
  let datas = getDatasLocalStorage();
  datas = datas.filter((data) => data.id !== id);
  updateLocalStorage(datas);
  itemMenu(menuValue);
}

function completeItem(id) {
  let datas = getDatasLocalStorage();
  datas = datas.map((data) => {
    if (data.id === id) {
      return { ...data, isCompeletd: !data.isCompeletd };
    }
    return data;
  });
  updateLocalStorage(datas);
  itemMenu(menuValue);
}

addTodoInput.addEventListener("input", (e) => {
  if (addTodoInput.classList.contains("error")) {
    addTodoBtn.classList.remove(
      "[&>svg]:!border-red-500",
      "[&>svg]:!text-red-500",
    );
    addTodoInput.classList.remove("!bg-red-700/20");
    addTodoInput.classList.remove("error");
    addTodoInput.placeholder = "مثال : برنامه نویسی";
  }
});

// Edit a To-Do item
function editItem(id) {
  let datas = getDatasLocalStorage();
  datas = datas.map((data) => {
    if (data.id === id) {
      return { ...data, isEditing: true };
    }
    return data;
  });
  updateLocalStorage(datas);
  itemMenu(menuValue);
  document.getElementById(`editInput${id}`).focus();
}

function saveEdit(id) {
  let editInput = document.getElementById(`editInput${id}`).value.trim();
  let datas = getDatasLocalStorage();

  if (editInput === "") {
    datas = datas.filter((data) => data.id !== id);
  } else {
    datas = datas.map((data) => {
      if (data.id === id) {
        return { ...data, title: editInput, isEditing: false };
      }
      return data;
    });
  }

  updateLocalStorage(datas);
  itemMenu(menuValue);
}

// Update localStorage with edited data
function updateLocalStorage(updatedDatas) {
  localStorage.setItem("todos", JSON.stringify(updatedDatas));
}

// LocalStorage helper functions
function getDatasLocalStorage() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function setDataLocalStorage(newData) {
  const currentData = getDatasLocalStorage();
  currentData.push(newData);
  localStorage.setItem("todos", JSON.stringify(currentData));
}

function handleEditKey(event, id) {
  if (event.key === "Enter") {
    saveEdit(id);
  }
}
