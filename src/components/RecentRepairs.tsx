import React from 'react'




type Props = {}

const RecentRepairs = (props: Props) => {
  return (
    <div className="bg-black dark:bg-zinc-900 rounded-lg shadow-md p-4 mb-4 text-black">
      <h2 className="text-xl font-bold mb-4">Servicios</h2>
      <ul>
      <li className="flex items-center mb-2">
          <img src="" alt="CURP" className="mr-2 w-8 h-8" /> CURP
        </li>        <li className="flex items-center mb-2">
          <img src="" alt="CURP" className="mr-2 w-8 h-4" /> Recibo de luz
        </li>
        <li className={"flex items-center"}><img src="https://placehold.co/20x20" alt="Recargas" className="mr-2" /> Recargas</li>
      </ul>
    </div>
  );
};
export default RecentRepairs