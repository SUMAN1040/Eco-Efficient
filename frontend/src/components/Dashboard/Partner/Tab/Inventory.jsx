import React from 'react';
import { Package } from 'lucide-react';

const Inventory = ({ inventoryItems }) => {
  return (
    <div className="row g-4">
      <div className="col-12 col-md-4">
        <div className="stat-card text-center py-5">
          <div className="rounded-circle bg-primary-soft mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
            <Package size={32} />
          </div>
          <h2 className="fw-bold mb-1">1,240kg</h2>
          <p className="text-muted small fw-bold">Total Stock</p>
          <button className="btn btn-primary btn-sm rounded-pill px-4 mt-3">Add Stock</button>
        </div>
      </div>
      <div className="col-12 col-md-8">
        <div className="data-card p-4">
          <h6 className="fw-bold mb-4">Storage Breakdown</h6>
          {inventoryItems.map((item, i) => (
            <div className="mb-4" key={i}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div>
                  <p className="mb-0 fw-bold">{item.category}</p>
                  <small className="text-muted">{item.quantity} current stock</small>
                </div>
                <div className="text-end">
                  <p className="mb-0 fw-bold text-primary">{item.capacity}</p>
                  <small className="text-muted">Capacity used</small>
                </div>
              </div>
              <div className="progress-bar-custom">
                <div className="progress-fill" style={{ width: item.capacity, background: 'var(--primary)' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
