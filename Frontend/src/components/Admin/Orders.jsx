import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { FaTrash, FaCheck, FaRegTimesCircle } from 'react-icons/fa';
import { GrView } from 'react-icons/gr';
import { EditIcon, ServedIcon } from '../../utils/auth';
import { useFoodcontext } from "../../context/productContext";
import { useNavigate } from 'react-router-dom';

export default function Orders() {
  const { changeOrderStatus, deleteOrder, orders, getOrders } = useFoodcontext();
  const navigate = useNavigate();
  const columns = [
    {
      field: 'table',
      type: 'number',
      width: 80,
      headerName: 'Table No.',
      align: 'center',
      valueGetter: (params) => params.row.user.table,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      align: 'left',
      valueGetter: (params) => params.row.user.name,
    },
    {
      field: 'mobile',
      type: 'number',
      headerName: 'Mobile',
      align: 'right',
      sortable: false,
      valueGetter: (params) => params.row.user.mobile,
      width: 120,
    },
    {
      field: 'items',
      type: 'number',
      headerName: 'Items',
      align: 'right',
      width: 80,
      valueGetter: (params) => params.row.orderItems.length,
    },
    {
      field: 'totalPrice',
      type: 'number',
      headerName: 'Amount',
      align: 'right',
      width: 80,
    },
    {
      field: 'orderStatus',
      headerName: 'Status',
      align: 'left',
      width: 120,
    },
    {
      field: 'createdAt',
      type: 'dateTime',
      disablePadding: false,
      headerName: 'Receive At',
      align: 'right',
      width: 170,
      valueGetter: (params) => new Date(params.row.createdAt),
    },
    {
      field: 'actions',
      type: 'actions',
      width: 50,
      getActions: (params) => [
        <GridActionsCellItem icon={<GrView />} label="View" onClick={() => { navigate(`/admin/order/${params.id}`) }} showInMenu />,
        <GridActionsCellItem icon={<FaCheck />} onClick={() => {
          changeOrderStatus(params.id, 'Served');
        }} label="Serve" showInMenu />,
        <GridActionsCellItem icon={<FaRegTimesCircle />} onClick={() => {
          changeOrderStatus(params.id, 'Cancel');
        }} label="Cancel" showInMenu />,
        <GridActionsCellItem icon={<FaTrash />} onClick={() => {
          deleteOrder(params.id);
        }} label="Delete" showInMenu />,
      ]
    }
  ];


  useEffect(()=>{
    const timeoutId = window.setTimeout(() => {
      getOrders();
    }, 1000 * 30); // in milliseconds
    return ()=> window.clearTimeout(timeoutId);
  },[]);
  
  return (
    <>
      <br id="orders" />
      <h2 className="d-flex justify-content-center mb-3" >ORDERS</h2>
      <div style={{ height:"75vh", margin: 'auto' }} className="col-lg-8">
        <DataGrid
          rows={orders}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 15, 20, 50, 100]}
          getRowId={(row) => row._id}
          initialState={{
            sorting: {
              sortModel: [{ field: 'createdAt', sort: 'desc' }],
            },
          }}
        />
      </div>
    </>
  );
}
