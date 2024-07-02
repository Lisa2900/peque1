import React from 'react';
import CFE from '../img/CFE.png';
import Esta from '../img/Esta.png';
import Recargas from '../img/recargasxd.jpg';
import Telcel from  '../img/Telcel_Logo.png';
import Att from '../img/at&t_Logo.png'
import Movista from '../img/Movista_Logo.png';
type Props = {}

export default function ServicioS({}: Props) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold mb-4 ">SERVICIOS</h1>
      <div className="flex flex-col sm:flex-row items-center justify-center w-full space-y-4 sm:space-y-0 sm:space-x-4 mt-10">
        <a href="https://www.cfe.mx" className="group">
          <div className="flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-600 rounded-lg shadow-lg w-48 h-48 group-hover:opacity-70 transition-opacity">
            <img src={CFE} alt="CFE" className="w-24 h-24 object-contain" />
            <p className="mt-2 text-blue-600 dark:text-blue-400">CFE</p>
          </div>
        </a>
        <a href="https://www.gob.mx/curp/" className="group">
          <div className="flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-600 rounded-lg shadow-lg w-48 h-48 group-hover:opacity-70 transition-opacity">
            <img src={Esta} alt="CURP" className="w-24 h-24 object-contain" />
            <p className="mt-2 text-blue-600 dark:text-blue-400">CURP</p>
          </div>
        </a>
        <a href="https://www.telcel.com/personas/amigo/paquetes/paquetes-amigo-sin-limite?utm_source=google&utm_medium=sem&utm_campaign=12024_google_RECARGASAON2024_ventas_prepago_amigokitsinlimite_sem&utm_content=google_recarga500_nacional___na&utm_id=%7B%7Bcampaign.id%7D%7D&&&&&&campaignid=21354646025&network=g&device=c&gad_source=1&gclid=CjwKCAjw34qzBhBmEiwAOUQcFyl1Sb8D5hcdq46fYX41_t6xOF98WFV8FmPae7IXQrIuNeBzxHUDiRoC6IkQAvD_BwE&gclsrc=aw.ds" className="group">
          <div className="flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-600 rounded-lg shadow-lg w-48 h-48 group-hover:opacity-70 transition-opacity">
            <img src={Telcel} alt="Recargas" className="w-24 h-24 object-contain" />
            <p className="mt-2 text-blue-600 dark:text-blue-400">Telcel</p>
          </div>
        </a>
        <a href="https://tienda.movistar.com.mx/recarga-en-linea" className="group">
          <div className="flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-600 rounded-lg shadow-lg w-48 h-48 group-hover:opacity-70 transition-opacity">
            <img src={Movista} alt="Recargas" className="w-24 h-24 object-contain" />
            <p className="mt-2 text-blue-600 dark:text-blue-400">Movista</p>
          </div>
        </a>
        <a href="https://www.att.com.mx/att-mas.html?gad_source=1&gclid=CjwKCAjw34qzBhBmEiwAOUQcF0H_lZeEz4sKXjOB3thqJwtTZVg4w4gyrP7HvB-Rpq-RoD7X4hO06xoC8p8QAvD_BwE&gclsrc=aw.ds" className="group">
          <div className="flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-600 rounded-lg shadow-lg w-48 h-48 group-hover:opacity-70 transition-opacity">
            <img src={Att} alt="Recargas" className="w-24 h-24 object-contain" />
            <p className="mt-2 text-blue-600 dark:text-blue-400">at&t</p>
          </div>
        </a>
      </div>
    </div>
  );
}
