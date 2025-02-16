import React from 'react';

const DeviceList = ({ devices, userRole, fetchDevices }) => {
  return (
    <div>
      <h2 className="text-lg font-bold">Danh sách Thiết Bị</h2>
      <ul>
        {devices.map((device) => (
          <li key={device._id} className="border p-2 my-2">
            <strong>{device.name}</strong> - {device.specs} - {device.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeviceList;
