import React from 'react';

const Receipt = () => {
  return (
    <div className="receipt">
      <h2>Recibo</h2>
      <p>Detalles de la compra:</p>
      <ul>
        <li>Producto 1 - $50</li>
        <li>Producto 2 - $30</li>
        {/* Agrega más elementos según sea necesario */}
      </ul>
      <p>Total: $80</p>
    </div>
  );
};

export default Receipt;
