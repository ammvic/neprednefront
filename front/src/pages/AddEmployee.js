import React, { useState } from "react";
import "./pageStyles/addEmployee.css";

const AddEmployee = () => {
  const [notification, setNotification] = useState("");
  const [employees, setEmployees] = useState([]);

  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    password: "",
    jmbg: "", // Dodajemo JMBG
  });

  const roleMap = {
    0: "Photographer",
    1: "Videographer",
    2: "Designer",
    3: "Administrator",
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    const employeeToSend = {
      ...newEmployee,
      role: roleMap[newEmployee.role], // Mapiramo string na broj
    };

    try {
      const response = await fetch(
        "http://miellephotostudiobe.somee.com/api/Employees",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeToSend),
        }
      );

      if (response.ok) {
        // Uspešan odgovor
        const employeesData = await (
          await fetch("http://miellephotostudiobe.somee.com/api/Employees")
        ).json();
        setEmployees(employeesData.$values);
        setNewEmployee({
          firstName: "",
          lastName: "",
          role: "Photographer",
          email: "",
          password: "",
          jmbg: "",
        });
        setNotification("Employee successfully added.");
        setTimeout(() => setNotification(""), 5000);
      } else {
        const errorMessage = await response.text();
        console.error("Greška prilikom dodavanja zaposlenog:", errorMessage);
        setNotification(`Error: ${errorMessage}`);
        setTimeout(() => setNotification(""), 5000);
      }
    } catch (error) {
      console.error("Greška prilikom dodavanja zaposlenog:", error);
      setNotification(`Error: ${error.message}`);
      setTimeout(() => setNotification(""), 5000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="addEmp-section">
        <h3>Add New Employee</h3>
        <form onSubmit={handleAddEmployee}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={newEmployee.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={newEmployee.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>JMBG:</label>
              <input
                type="text"
                name="jmbg"
                value={newEmployee.jmbg}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={newEmployee.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={newEmployee.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Role:</label>
              <select
                name="role"
                value={newEmployee.role}
                onChange={handleInputChange}
                required
              >
                <option value="Photographer">Photographer</option>
                <option value="Videographer">Videographer</option>
                <option value="Designer">Designer</option>
                <option value="Administrator">Administrator</option>
              </select>
            </div>
          </div>
          <div className="btn">
            <button type="submit">Add Employee</button>
          </div>
        </form>
        {notification && <div className="notification">{notification}</div>}
      </div>
    </div>
  );
};

export default AddEmployee;
