let myLeads = [];
const inputEl = document.querySelector("#input-el");
const ulEl = document.querySelector("#ul-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const leadsFromLoclStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLoclStorage) {
  myLeads = leadsFromLoclStorage;
  render(myLeads);
}

inputBtn.addEventListener("click", () => {
  myLeads.push(inputEl.value);
  inputEl.value = "";

  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  console.log(myLeads);

  render(myLeads);
});

deleteBtn.addEventListener("dblclick", () => {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

tabBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  console.log(leads);
  let listItems = "";
  for (let lead of leads) {
    // Use "Template String"
    listItems += `
      <li>
        <a href="${lead}" target="_blank">${lead}</a>
      </li>`;
  }
  ulEl.innerHTML = listItems;
}

// Uncaught TypeError: Assignment to constant variable.
// inputEl = 'test';

// for(let lead of myLeads){
//   const li = document.createElement("li");
//   li.textContent = lead;
//   ulEl.append(li);
// }

// localStorage.setItem("myLeads", "www.google.com");
// console.log(localStorage.getItem("myLeads"));

// localStorage.clear();
// console.log(localStorage.getItem("myLeads"));
