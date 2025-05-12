// src/admin/Dashboard.jsx

import React, { useState, useEffect } from "react";
import { useDataProvider, Title } from "react-admin";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleIcon from "@mui/icons-material/People";

const monthNames = [
  "Enero","Febrero","Marzo","Abril",
  "Mayo","Junio","Julio","Agosto",
  "Septiembre","Octubre","Noviembre","Diciembre"
];

const Dashboard = () => {
  const dataProvider = useDataProvider();
  const navigate = useNavigate();

  const [month, setMonth]             = useState(new Date().getMonth() + 1);
  const [day,   setDay]               = useState(0);
  const [revenue, setRevenue]         = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [payments, setPayments]       = useState([]);

  const fetchSales = async () => {
    const { data, total } = await dataProvider.getList("orders", {
      filter: { month, day },
      sort: { field: "payment_date", order: "DESC" },
      pagination: { page: 1, perPage: 1000 },
    });
    const totalRev = data.reduce((sum, p) => sum + (p.amount || 0), 0);
    setRevenue(totalRev / 100);
    setOrdersCount(total);
    setPayments(data);
  };

  const fetchOnlineUsers = async () => {
    const { data } = await dataProvider.getOne("metrics", { id: "onlineUsers" });
    setOnlineUsers(data.count || 0);
  };

  useEffect(() => {
    fetchSales();
    fetchOnlineUsers();
  }, [month, day]);

  return (
    <Box p={2} display="flex" flexDirection="column" gap={3}>
      {/* Encabezado con selectores */}
      <Box display="flex" flexWrap="wrap" gap={2}>
        {/* Ventas */}
        <Card sx={{ flex: "1 1 300px" }}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={1}>
              <MonetizationOnIcon color="primary" sx={{ mr:1 }} />
              <Typography variant="subtitle1">Ventas</Typography>
            </Box>
            <FormControl fullWidth sx={{ mb:2 }}>
              <InputLabel>Mes</InputLabel>
              <Select value={month} label="Mes" onChange={e => setMonth(e.target.value)}>
                {monthNames.map((m,i) =>
                  <MenuItem key={i} value={i+1}>{m}</MenuItem>
                )}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Día</InputLabel>
              <Select value={day} label="Día" onChange={e => setDay(e.target.value)}>
                <MenuItem value={0}>Todos los días</MenuItem>
                {Array.from({ length: 31 }, (_, i) => i + 1).map(d =>
                  <MenuItem key={d} value={d}>{d}</MenuItem>
                )}
              </Select>
            </FormControl>
            <Typography variant="h4" color="primary" mt={2}>
              €{revenue.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {ordersCount} pedidos
            </Typography>
          </CardContent>
        </Card>

        {/* Usuarios online */}
        <Card sx={{ flex: "1 1 200px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={1}>
              <PeopleIcon color="secondary" sx={{ mr:1 }} />
              <Typography variant="subtitle1">Usuarios online</Typography>
            </Box>
            <Typography variant="h4" color="secondary">
              {onlineUsers}
            </Typography>
          </CardContent>
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Button
              variant="outlined"
              startIcon={<PeopleIcon />}  // o cualquier otro icono de casa
              onClick={() => navigate('/')}
            >
              <i className="bi bi-house-door me-1"></i>
              Volver al inicio
            </Button>
          </Box>
        </Card>
      </Box>

      {/* Tabla de todos los pagos */}
      <Paper>
        <Typography variant="h6" p={2}>Listado de Pagos</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Importe (€)</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map(p => (
              <TableRow key={p.id}>
                <TableCell>{p.id}</TableCell>
                <TableCell>{new Date(p.payment_date).toLocaleString()}</TableCell>
                <TableCell>€{(p.amount/100).toFixed(2)}</TableCell>
                <TableCell>{p.customer_name}</TableCell>
                <TableCell>{p.total_items}</TableCell>
                <TableCell>{p.item_titles.join(", ")}</TableCell>
                <TableCell>{p.estado}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Dashboard;
