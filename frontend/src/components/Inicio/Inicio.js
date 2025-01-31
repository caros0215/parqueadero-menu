import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
    Bike as Motorcycle,  // Importamos Bike y lo renombramos como Motorcycle
    CreditCard, 
    Wallet, 
    Users 
  } from 'lucide-react';
import './inicio.css';  // Asegúrate de importar el archivo CSS

const Inicio = () => {
  // Datos de ejemplo para el gráfico de línea
  const monthlyData = [
    { name: 'Ene', usuarios: 120 },
    { name: 'Feb', usuarios: 150 },
    { name: 'Mar', usuarios: 180 },
    { name: 'Abr', usuarios: 170 },
    { name: 'May', usuarios: 190 },
    { name: 'Jun', usuarios: 210 }
  ];

  // Datos de ejemplo para el gráfico circular
  const vehicleData = [
    { name: 'Motos Particulares', value: 60 },
    { name: 'Motos Mensajería', value: 25 },
    { name: 'Motos Eléctricas', value: 15 }
  ];

  const colors = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="dashboard-container">
      {/* Tarjetas de métricas */}
      <div className="cards-container">
        <div className="card card-blue">
          <div className="card-content">
            <div>
              <p className="card-title">Vehículos Estacionados</p>
              <h3 className="card-value">15</h3>
            </div>
            <Motorcycle size={32} className="icon" />
          </div>
        </div>

        <div className="card card-green">
          <div className="card-content">
            <div>
              <p className="card-title">Tarifa/Hora</p>
              <h3 className="card-value">$2,000</h3>
            </div>
            <CreditCard size={32} className="icon" />
          </div>
        </div>

        <div className="card card-orange">
          <div className="card-content">
            <div>
              <p className="card-title">Dinero en Caja</p>
              <h3 className="card-value">$458,000</h3>
            </div>
            <Wallet size={32} className="icon" />
          </div>
        </div>

        <div className="card card-red">
          <div className="card-content">
            <div>
              <p className="card-title">Abonados</p>
              <h3 className="card-value">60</h3>
            </div>
            <Users size={32} className="icon" />
          </div>
        </div>
      </div>

      {/* Gráfico de línea */}
      <div className="chart-container">
        <h3 className="chart-title">Usuarios por Mes</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="usuarios" 
                stroke="#2563eb" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico circular */}
      <div className="chart-container">
        <h3 className="chart-title">Tipos de Vehículos</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={vehicleData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {vehicleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Inicio;