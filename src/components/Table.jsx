import React from 'react';

const Table = ({ headers, children, title, actions }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {(title || actions) && (
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          {title && <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight">{title}</h3>}
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {headers.map((header, i) => (
                <th key={i} className="px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
