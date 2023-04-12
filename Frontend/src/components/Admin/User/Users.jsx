import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useUserContext, } from "../../../context/userContext";
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaCheck, FaRegTimesCircle } from 'react-icons/fa';
import { GrView } from 'react-icons/gr';
import { EditIcon, ServedIcon } from '../../../utils/auth';

export default function Users() {
  const { users } = useUserContext();
  const navigate = useNavigate();
  const columns = [
    {
      field: 'firstname',
      width: 100,
      headerName: 'First Name',
      align: 'center',
    },
    {
      field: 'surname',
      headerName: 'Surname',
      width: 100,
      align: 'left',
    },
    {
      field: 'email',
      headerName: 'Mobile',
      align: 'right',
      width: 200,
    },
    {
      field: 'role',
      headerName: 'Role',
      align: 'right',
      width: 80,
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params) => [
        // <GridActionsCellItem icon={<GrView />} label="View" onClick={() => { navigate(`/admin/order/${params.id}`) }} showInMenu />,
        // <GridActionsCellItem icon={<FaCheck />} onClick={() => {
        //   changeOrderStatus(params.id, 'Served');
        // }} label="Serve" showInMenu />,
        // <GridActionsCellItem icon={<FaRegTimesCircle />} onClick={() => {
        //   changeOrderStatus(params.id, 'Cancel');
        // }} label="Cancel" showInMenu />,
        // <GridActionsCellItem icon={<FaTrash />} onClick={() => {
        //   deleteOrder(params.id);
        // }} label="Delete" showInMenu />,
      ]
    }
  ];



  useEffect(() => {
    // setUsers();
  }, [])
  console.log(users);
  return (
    <div style={{ height: 400, margin: 'auto' }} className="col-lg-9">
      <br/>
      <br/>
      <h2 className="d-flex justify-content-center mb-3">Users</h2>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 15, 20, 50, 100]}
        getRowId={(row) => row._id}
      />
    </div>
  );
}
