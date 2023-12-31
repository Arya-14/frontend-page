import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import editIcon from '../../Assets/Images/editicon.png'

const SettingsPage = () => {
  const [customField, setCustomField] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/customFields')
      .then(response => {
        console.log(response);
        setCustomField(response.data);
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
            <Link to={`/main/edit-student-customFields`} state={{ from: rowData}} ><img className='editimg' src={editIcon}/></Link>
        </div>
    );
};
const renderHeader = () => {
    return (
        <div className="studentfield">
            <span className="p-input-icon-left">
                <h3> Student's Custom Fields</h3>
            </span>
            <button className="btn btn-primary">
                <Link to="/main/add-student-customFields"> + Add New</Link>
            </button>
        </div>
    );
};
const header = renderHeader();

  return (
    <div className='settings'>
        <DataTable value={customField} header={header} >
    <Column field="Group" header="Group" />    
    <Column field="Section" header="Section" />
    <Column field="Label" header="Label" />
    <Column field="Type" header="Type" />
    <Column header="Actions" style={{ minWidth: '12rem' }} body={countryBodyTemplate}  />
    
</DataTable>
    </div>
);
};

export default SettingsPage;