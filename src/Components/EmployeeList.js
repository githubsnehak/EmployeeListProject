import React, { useState, useEffect } from 'react';
import '../App.css'
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const EmployeeList = () => {
const [form,setForm]=useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    phoneNumber: '',
    modeOfContact: [],
    maritalStatus: '',
    immediateJoiner: '',
  }) ;
const [employees,setEmployees]=useState([])
const [isEditMode,setIsEditMode]=useState(false)
const [editIndex,setEditIndex]=useState(null)


useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees);
  }, []);

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

function handleChange(e){
    const { name, value } = e.target;
    setForm({...form,[name]:value})
}
function handleSubmit(e){
    e.preventDefault()
    
       if(editIndex !== null){
        const updatedEmployees=[...employees]
        updatedEmployees[editIndex]=form;
        setEmployees(updatedEmployees)
        setIsEditMode(false);
        setEditIndex(null);
       }
       else{
        
        setEmployees([...employees, form]);
    }

    setForm({
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      phoneNumber: '',
      modeOfContact: [],
      maritalStatus: '',
      immediateJoiner: '',
    });

}

const handleClear = () => {
    setForm({
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      phoneNumber: '',
      modeOfContact: [],
      maritalStatus: '',
      immediateJoiner: '',
    });
    setIsEditMode(false);
    setEditIndex(null);
  };

const handleEdit = (index) => {
    setForm(employees[index]);
    setIsEditMode(true);
    setEditIndex(index);
  };


const handleDelete=(index)=>{
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);
    setEmployees(updatedEmployees);
    setIsEditMode(false);
    setEditIndex(null);
  }

  return (
    <div className="App">
      <h1>Employees List</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Middle Name:</label>
          <input
            type="text"
            name="middleName"
            value={form.middleName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={form.gender === 'male'}
            onChange={handleChange}
          /> Male
          <input
            type="radio"
            name="gender"
            value="female"
            checked={form.gender === 'female'}
            onChange={handleChange}
          /> Female
          <input
            type="radio"
            name="gender"
            value="others"
            checked={form.gender === 'others'}
            onChange={handleChange}
          /> Others
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="number"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mode of Contact:</label>
          <input
            type="checkbox"
            name="modeOfContact"
            value="email"
            checked={form.modeOfContact === ('email')}
            onChange={handleChange}
          /> Email
          <input
            type="checkbox"
            name="modeOfContact"
            value="phone"
             checked={form.modeOfContact === ('phone')}
            onChange={handleChange}
          /> Phone
        </div>
        <div>
          <label>Marital Status:</label>
          <select
            name="maritalStatus"
            value={form.maritalStatus}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="married">Married</option>
            <option value="single">Single</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>
        <div>
          <label>Immediate Joiner:</label>
          <input
            type="radio"
            name="immediateJoiner"
            value="yes"
            checked={form.immediateJoiner === 'yes'}
            onChange={handleChange}
          /> Yes
          <input
            type="radio"
            name="immediateJoiner"
            value="no"
            checked={form.immediateJoiner === 'no'}
            onChange={handleChange}
          /> No
        </div>
        <div>
          <button type="submit">{isEditMode ? 'Update' : 'Submit'}</button>
          <button type="button"  onClick={handleClear}>Clear</button>
        </div>
      </form><br/><br/>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Phone Number</th>
            <th>Mode of Contact</th>
            <th>Marital Status</th>
            <th>Immediate Joiner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.firstName}</td>
              <td>{employee.middleName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.gender}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.modeOfContact}</td>
              <td>{employee.maritalStatus}</td>
              <td>{employee.immediateJoiner}</td>
              <td> 
                <FaEdit onClick={() => handleEdit(index)} className='icon'/>
                <FaTrashAlt onClick={() => handleDelete(index)} className='icon' />
              </td>
            </tr>
          ))}
        </tbody>
    </table>
    </div>
  );
};

export default EmployeeList;
