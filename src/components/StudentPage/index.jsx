import React, { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/students')
      .then(response => {
        console.log(response);
        setStudents(response.data);
        setLoading(false);
      });
  }, []);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const countryBodyTemplate = (rowData) => {
    console.log(rowData,"rowData");
    return (
        <div>
            <Link to={`/edit-student/${rowData.id}`}>Edit</Link>
        </div>
    );
};
const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
};
const renderHeader = () => {
    return (
        <div className="flex-content">
            <span className="p-input-icon-left">
                <i className="pi pi-search"></i>
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </span>
            <button className="btn-primary">
                <i className="pi pi-plus" />
                <Link to={'/main/add-student'}> + Add New</Link>
            </button>
            <button className="btn-secondary">
                 <i className="pi pi-pencil" />
                 <Link to={'/main/Edit-studentDetails'}> Edit Student Details </Link>
            </button>
        </div>
    );
};
const header = renderHeader();

  return (
    <div className="studentpage">
        <DataTable value={students} paginator rows={5} dataKey="Id" filters={filters} filterDisplay="row" loading={loading}
        globalFilterFields={['Firstname']} header={header} emptyMessage="No students found.">
    <Column field="Id" header="ID" />    
    <Column field="Firstname" header="First Name" />
    <Column field="Lastname" header="Last Name" />
    <Column field="DOB" header="Date Of Birth" />
    <Column field="Class" header="Class" />
    <Column field="ParentsName" header="Parent's Name" />
    <Column field="Address" header="Address" />
    <Column header="Actions" style={{ minWidth: '12rem' }} body={countryBodyTemplate}  />
    
</DataTable>
    </div>
    
    // <div className="students-page">
    //   <div className="student-content">
    //     <input class='search_btn' type="text" placeholder="Search students..." />
    //     <button class='edit'><Link to={'/edit-student/${student.id}'}> Edit Student Details </Link></button>
    //     <button class='add_new'><Link to="/add-student">+ Add New</Link></button>
    //     </div>

    //     <table>
    //       <thead>
    //         <tr>
    //           <th>ID</th>
    //           <th>First Name</th>
    //           <th>Last Name</th>
    //           <th>Email</th>
    //           <th>Date of Birth</th>
    //           <th>Class</th>
    //           <th>Parent's Name</th>
    //           <th>Address</th>
    //           <th>Actions</th>
    //         </tr>

    //     </thead>
    //     <tbody>
    //         {students.map(student => (
    //           <tr key={student.Id}>
    //             <td>{student.Id}</td>
    //             <td>{student.Firstname}</td>
    //             <td>{student.Lastname}</td>
    //             <td>{student.Email}</td>
    //             <td>{student.DOB}</td>
    //             <td>{student.Class}</td>
    //             <td>{student.ParentsName}</td>
    //             <td>{student.Address}</td>
    //             <td>
    //               <Link to={`/edit-student/${student.id}`}>Edit</Link>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    // </div>
  );
};

export default StudentsPage;