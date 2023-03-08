console.log("script is loaded");
//all varibles
const form = document.querySelector("form");
const result = document.querySelector("#result");
const tableBody = document.querySelector("tbody");
const positionDropDown = document.querySelector("select");

const submitbtn = document.querySelector("#submit");

//
let id;
{
  let employee = JSON.parse(localStorage.getItem("emp")) ?? [];

  employee.length != 0 ? employee.findLast((item) => (id = item.id)) : (id = 0);
  console.log(id);
}
let positionList = [
  "C.E.O",
  "HR",
  "Internee",
  "General Manager",
  "Sr. Web Dev",
  "UI/UX Designer",
];

//create options for positions
function createDropDown(params) {
  params.map((position, index) => {
    positionDropDown.innerHTML += `<option value=${index}>${position}</option>`;
  });
}
createDropDown(positionList);
updateSet("Loading Database", "lightblue");

document.onload = loadData();
updateReset();
form.addEventListener("submit", (e) => {
  e.preventDefault();
  saveData();

  setTimeout(() => {
    form.reset();
  }, 1000);
});

function saveData() {
  const regName = /^[a-zA-Z-'. ]+$/;
  if (!regName.test(form.fname.value)) {
    updateSet("Invalid Fullname", "crimson");
    updateReset();
  } else {
    const singleEmploye = {
      id: ++id,
      fname: form.fname.value.trim(),
      age: form.age.value,
      position: form.position.value,
      gender: form.gender.value,
      salary: form.salary.value,
      email: form.email.value.toLowerCase(),
    };
    let employee = JSON.parse(localStorage.getItem("emp")) ?? [];

    employee.push(singleEmploye);
    console.log(singleEmploye);
    localStorage.setItem("emp", JSON.stringify(employee));
  }
  updateSet("Database Updated", "rgb(79, 216, 79)");

  loadData();
  updateReset();
  //  console.log(employee);
}
form.addEventListener("reset", () => {
  updateSet("Form Cleared", "crimson");
  form.reset();
  submitbtn.classList.remove("hide");
  document.querySelector("#updatebtn").classList.add("hide");
  updateReset();
});
function loadData() {
  employee = JSON.parse(localStorage.getItem("emp")) ?? [];
  tableBody.innerHTML = "";

  employee.map((item, i) => {
    createTableRow(item, i);
  });
}
function createTableRow(data, index) {
  // emp.map((one) => {
  //   if (one.id === 0) {
  //     return;
  //   }
  let setGender;
  if (data.gender === "male") {
    setGender = "fa-mars";
  } else {
    setGender = "fa-venus";
  }
  const tdata = `<tr id=${data.id}>
<td>${index + 1}</td>
<td>${data.fname}</td>
<td>${data.age}</td>
<td>${positionList[data.position]}</td>
<td>${data.gender}<i class="fa-solid ${setGender}"></i></td>
<td>${data.salary}</td>
<td>${data.email}</td>
<td><i class="fa-regular fa-pen-to-square editor"></i></td>
<td><i class="fa-solid fa-trash remover"></i></td>
</tr>`;

  tableBody.innerHTML += tdata;

  const tableEdit = document.querySelectorAll(".editor");
  const tableDelete = document.querySelectorAll(".remover");
  updateListener(tableEdit);
  deleteListener(tableDelete);
}
function updateListener(element) {
  for (let index = 0; index < element.length; index++) {
    element[index].addEventListener("click", (e) => {
      let employee = JSON.parse(localStorage.getItem("emp")) ?? [];
      const empID = e.target.parentNode.parentNode.id;
      employee.filter((item) => {
        if (empID == item.id) {
          updateSet("Update Employee Data", "lightblue");
          form.fname.value = item.fname;
          form.fname.value = item.fname;
          form.age.value = item.age;
          form.position.value = item.position;
          form.gender.value = item.gender;
          form.salary.value = item.salary;
          form.email.value = item.email;
        }
      });

      updateReset();

      document.querySelector("#updatebtn").classList.remove("hide");
      submitbtn.classList.add("hide");

      document.querySelector("#updatebtn").addEventListener("click", () => {
        updateData(empID);
        setTimeout(() => {
          form.reset();
        }, 1000);
      });
    });
  }
}
function updateData(param) {
  const regName = /^[a-zA-Z-'. ]+$/;
  if (!regName.test(form.fname.value)) {
    updateSet("Invalid Fullname", "crimson");
    updateReset();
  } else {
    updateSet("Updated Record", "rgb(79, 216, 79)");
    let employee = JSON.parse(localStorage.getItem("emp")) ?? [];
    const newEmp = employee.filter((i) => {
      if (i.id == param) {
        i.id = param;
        i.fname = form.fname.value.trim();
        i.age = form.age.value;
        i.position = form.position.value;
        i.gender = form.gender.value;
        i.salary = form.salary.value;
        i.email = form.email.value.toLowerCase();
        return i;
      } else return i;
    });

    localStorage.setItem("emp", JSON.stringify(newEmp));
    loadData();
    submitbtn.classList.remove("hide");
    document.querySelector("#updatebtn").classList.add("hide");

    updateReset();
  }
}

function loadData() {
  employee = JSON.parse(localStorage.getItem("emp")) ?? [];
  tableBody.innerHTML = "";
  employee.map((item, i) => {
    createTableRow(item, i);
  });
}
function deleteListener(element) {
  for (let index = 0; index < element.length; index++) {
    element[index].addEventListener("click", (e) => {
      updateSet("Record Deleted", "crimson");
      let employee = JSON.parse(localStorage.getItem("emp")) ?? [];
      const newEmp = employee.filter((item) => {
        if (e.target.parentNode.parentNode.id != item.id) {
          return item;
        }
      });
      localStorage.setItem("emp", JSON.stringify(newEmp));
      updateReset();
      loadData();
    });
  }
}

//custom functions
function updateSet(msg, color) {
  result.innerText = msg;
  result.parentNode.style.backgroundColor = color;
}
function updateReset() {
  setTimeout(() => {
    result.innerText = "";
    result.parentNode.style.backgroundColor = "rgb(79, 216, 79)";
  }, 2000);
}

//set dummy data in form fields

//only for development mode
// const setDummyData = () => {
//   form.fname.value = "dummy name";
//   form.age.value = 30;
//   form.position.value = 3;
//   form.gender.value = "male";
//   form.salary.value = 40000;
//   form.email.value = "email@dummy.mail";
// };
// setDummyData();
