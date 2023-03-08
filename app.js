console.log("script is loaded");
//all varibles
const form = document.querySelector("form");
const result = document.querySelector("#result");
const tableBody = document.querySelector("tbody");
const submitbtn = document.querySelector("#submit");
const positionDropDown = document.querySelector("select");
//

let positionList = [
  "C.E.O",
  "HR",
  "Internee",
  "General Manager",
  "Sr. Web Dev",
  "UI/UX Designer",
];
let employee = [{ id: 0 }];
//try code block

let counterID = employee.at(-1).id;
let isData = false;
readDatabase();
//create options for positions
function createDropDown(params) {
  params.map((position, index) => {
    positionDropDown.innerHTML += `<option value=${index}>${position}</option>`;
  });
}
createDropDown(positionList);
//event listeners for forms
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const regName = /^[a-zA-Z-'. ]+$/;
  if (!regName.test(form.fname.value)) {
    updateSet("Invalid Fullname", "crimson");
    updateReset();
  } else {
    const singleEmploye = {
      id: ++counterID,
      fname: form.fname.value.trim(),
      age: form.age.value,
      position: form.position.value,
      gender: form.gender.value,
      salary: form.salary.value,
      email: form.email.value.toLowerCase(),
    };

    employee.push(singleEmploye);

    //  createTableRow(singleEmploye, counterID);
    updateDatabase();
    tableBody.innerHTML = "";
    employee.map((item, index) => {
      createTableRow(item, index + 1);
    });
  }
});

//update local storage with new single employee
updateDatabase = () => {
  if (employee[0]) {
    if (employee[0].fname === undefined) {
      employee.shift();
    }
  }

  localStorage.setItem("employeeList", JSON.stringify(employee));
  updateSet("Database Updated", "rgb(79, 216, 79)");
  updateReset();
};

//read local storage

function readDatabase() {
  let savedEmployee = JSON.parse(localStorage.getItem("employeeList"));
  if (savedEmployee) {
    if (!savedEmployee.length == 0) {
      employee = savedEmployee;
      isData = true;
      counterID = employee.at(-1).id;
      updateSet("Loading Database data", "lightblue");
      updateReset();
    }
  }
}
if (isData) {
  console.log("object");
  employee.map((item, index) => {
    createTableRow(item, index + 1);
  });
}
//creating table rows
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
<td>${index}</td>
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
  addListner(tableEdit, 1);
  addListner(tableDelete, 0);
}

//event listener for row edit and remove
function addListner(element, isEdit) {
  for (let index = 0; index < element.length; index++) {
    element[index].addEventListener("click", (e) => {
      const currID = e.target.parentNode.parentNode.id;
      // console.log(currID);
      if (isEdit) {
        updateSet("Update Employee Data", "lightblue");
        console.log(currID);
        form.fname.value = employee[currID].fname;
        form.age.value = employee[currID ].age;
        form.position.value = employee[currID].position;
        form.gender.value = employee[currID].gender;
        form.salary.value = employee[currID].salary;
        form.email.value = employee[currID].email;
        document.querySelector("#updatebtn").classList.remove("hide");
        submitbtn.classList.add("hide");
        console.log();
        updateReset();
      } else {
        console.log(currID);
        for (let index = currID - 1; index < employee.length - 1; index++) {
          const currEmp = employee[index];
          const nextEmp = employee[index + 1];
          employee[index] = nextEmp;
          employee[index + 1] = currEmp;
        }
        console.log(employee.pop());
        updateDatabase();
        //  console.log(employee.at(-1).id);
        tableBody.innerHTML = "";
        --counterID;
        //  console.log(employee);
        if (!employee.length) {
          counterID = 0;
          console.log("empty");
        } else {
          employee.map((item, index) => {
            createTableRow(item, index + 1);
          });
        }
      }
    });
  }
}

//event listener for reset button
form.addEventListener("reset", () => {
  updateSet("Form Cleared", "crimson");
  form.reset();
  updateReset();
});
//custom functions
function updateSet(msg, color) {
  result.innerText = msg;
  result.parentNode.style.backgroundColor = color;
}
function updateReset() {
  setTimeout(() => {
    result.innerText = "";
    result.parentNode.style.backgroundColor = "rgb(79, 216, 79)";
  }, 3000);
}

//set dummy data in form fields

//only for development mode
const setDummyData = () => {
  form.fname.value = "dummy name";
  form.age.value = 30;
  form.position.value = 3;
  form.gender.value = "male";
  form.salary.value = 40000;
  form.email.value = "email@dummy.mail";
};
setDummyData();
