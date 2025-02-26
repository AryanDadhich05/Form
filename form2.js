
console.log("JavaScript file loaded!");


let formDataArray = [];

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded!");

    
    document.getElementById("userForm").addEventListener("submit", function (event) {
        event.preventDefault();
    
        let name = document.getElementById("name").value.trim();
        let rollno = document.getElementById("rollno").value.trim();
        let address = document.getElementById("address").value.trim();
        let course = document.getElementById("course").value.trim();
        let skill = document.getElementById("skill").value.trim();
        let email = document.getElementById("email").value.trim();
        let phoneno = document.getElementById("phoneno").value.trim();

        
        let gender = document.querySelector('input[name="gender"]:checked');
        gender = gender ? gender.value : "Not specified";

       
        if (!name || !rollno || !address || !course || !skill || !email || !phoneno) {
            alert("Please fill all the fields!");
            return;
        }

        
        let userData = { name, rollno, gender, address, course, skill, email, phoneno };

        
        formDataArray.push(userData);

        
        updateTable();

        
        document.getElementById("userForm").reset();
    });
});


function updateTable() {
    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    formDataArray.forEach((data, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${data.name}</td>
            <td>${data.rollno}</td>
            <td>${data.gender}</td>
            <td>${data.address}</td>
            <td>${data.course}</td>
            <td>${data.skill}</td>
            <td>${data.email}</td>
            <td>${data.phoneno}</td>
            <td><button onclick="deleteRow(${index})">Delete</button></td>
            
        `;
        tableBody.appendChild(row);
    });

    console.log("Table updated!", formDataArray); 
}

function deleteRow(index) {
    formDataArray.splice(index, 1); 
    updateTable(); 
}

function searchTable() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let tableRows = document.querySelectorAll("#tableBody tr");

    tableRows.forEach(row => {
        let name = row.children[1].textContent.toLowerCase(); 
        let rollno = row.children[2].textContent.toLowerCase(); 

        // Check if search input matches name or roll number
        if (name.includes(input) || rollno.includes(input)) {
            row.style.display = ""; 
        } else {
            row.style.display = "none";
        }
    });
}
function downloadExcel() {
    if (formDataArray.length === 0) {
        alert("No data available to download!");
        return;
    }

    
    let ws = XLSX.utils.json_to_sheet(formDataArray);

    
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Student Data");
    XLSX.writeFile(wb, "StudentData.xlsx");
}

