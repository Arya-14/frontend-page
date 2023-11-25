import React, { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import editIcon from "../../Assets/Images/editicon.png";
import searchIcon from '../../Assets/Images/searchicon.jpg';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/students')
      .then(response => {
        console.log(response);
        setStudents(response.data);
        setLoading(false);
      })
      .catch((err)=> {
        console.log(err);
        if(err && err.response && (err.response.status === 401|| err.response.status === 408)){
            localStorage.removeItem("TOKEN");
            window.location.href="/login";
        }
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
            <Link to={'/main/Edit-studentDetails'} state={{ from: rowData}} >  <img className='editimg' src={editIcon}/></Link>
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
        <div className="studentfield">
            <span className="p-input-icon-left">
                <img className="searchimg" src={searchIcon}/>
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </span>
            <button className="btn btn-primary">
                <Link to={'/main/add-student'}> + Add New</Link>
            </button>
        </div>
    );
};
const header = renderHeader();

  return (
    <div className="studentpage">
        <DataTable value={students} paginator rows={6} dataKey="Id" filters={filters} filterDisplay="row" loading={loading}
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
    
  );
};

export default StudentsPage;