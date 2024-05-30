import React from 'react';
import CFE from '../img/CFE.png';
import Esta from '../img/Esta.png';

const repairItems = [
  {
    id: 1,
    title: 'Cambio de pantalla de iPhone',
    description: 'Se cambió la pantalla de un iPhone 12 debido a una rotura.',
    date: '2024-05-20'
  },
  {
    id: 2,
    title: 'Reparación de batería de MacBook',
    description: 'Se reemplazó la batería de un MacBook Pro 2018.',
    date: '2024-05-18'
  },
  {
    id: 3,
    title: 'Arreglo de teclado de laptop',
    description: 'Se arregló el teclado de una laptop Dell XPS 15.',
    date: '2024-05-15'
  },
  {
    id: 4,
    title: 'Cambio de disco duro',
    description: 'Se cambió el disco duro de una computadora de escritorio.',
    date: '2024-05-14'
  },
  {
    id: 5,
    title: 'Reparación de pantalla de TV',
    description: 'Se reparó la pantalla de un televisor Samsung de 50 pulgadas.',
    date: '2024-05-13'
  }
];

const Dashboard = () => {
  return (
    <div className="dark:bg-zinc-800 h-screen overflow-y-auto">
      <Header />
      <MainContent />
    </div>
  );
};

const Header = () => {
  return (
    <div className="bg-red-600 text-white p-4 flex justify-between items-center">
      <button className="bg-red-700 text-white py-2 px-4 rounded-lg">Panel principal</button>
      <img src={CFE} alt="CFE" className="mr-2 w-20 h-9" />
      <div className="text-right">
        <p>Martes 21 de mayo</p>
        <p>01:50 P.M.</p>
      </div>
    </div>
  );
};

const MainContent = () => {
  return (
    <div className="flex flex-col md:flex-row mt-4 text-black h-full md:space-x-2 p-2">
      <SalesSection />
      <ServiceAndRepairs />
    </div>
  );
};

const SalesSection = () => {
  return (
    <div className="w-full md:w-2/3 p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-md text-black mb-[-10px] md:mb-0 h-full overflow-y-auto max-h-96 md:max-h-full">
      <h2 className="text-xl font-bold mb-4">Ventas del día</h2>
      <SalesList />
      <p className="font-bold">Total de venta: $2,026</p>
      <div className="flex justify-between mt-4 text-black">
        <button className="bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 py-2 px-4 rounded-lg">Ver reportes anteriores</button>
      </div>
    </div>
  );
};

const SalesList = () => {
  const sales = [
    { item: "Recarga Telcel Paq. Amigo Sin Limite - $50", time: "09:02 A.M." },
    { item: "Cargador completo tipo C 1Hora - $95", time: "09:24 A.M." },
    { item: "Cargador completo tipo C 1Hora - $95", time: "09:24 A.M." },
    { item: "Cargador completo tipo C 1Hora - $95", time: "09:24 A.M." },
   
  ];

  return (
    <ul className="mb-4">
      {sales.map((sale, index) => (
        <li key={index} className="flex justify-between text-black">
          <span>{sale.item}</span>
          <span>{sale.time}</span>
        </li>
      ))}
    </ul>
  );
};

const ServiceAndRepairs = () => {
  return (
    <div className="w-full md:w-1/3 p-4 text-black h-full overflow-y-auto">
      <Services />
      <Repairs />
    </div>
  );
};

const Services = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-4 mb-1 text-black md:mb-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Servicios</h2>
      <ul>
        <li className="flex items-center mb-2">
          <img src={Esta} alt="CURP" className="mr-2 w-8 h-8" /> CURP
        </li>
        <li className="flex items-center mb-2">
          <img src={CFE} alt="CFE" className="mr-2 w-8 h-4" /> Recibo de luz
        </li>
        <li className="flex items-center">
          <img src="https://placehold.co/20x20" alt="Recargas" className="mr-2" /> Recargas
        </li>
      </ul>
    </div>
  );
};

const Repairs = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-4 text-black max-h-44 md:max-h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Reparaciones recientes</h2>
      <div className="max-h-32 overflow-y-auto">
        <ul>
          {repairItems.map(item => (
            <li key={item.id} className="mb-4">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.date}</p>
            </li>
          ))}
        </ul>
      </div>
      <button className="bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 py-2 px-4 rounded-lg mt-4">Mostrar todos</button>
    </div>
  );
};

export default Dashboard;
