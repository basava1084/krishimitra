import React from 'react';

const Table = ({ headers, children, title, actions }) => {
  return (
    <div className="glass-panel border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {(title || actions) && (
        <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between bg-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
          {title && <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] text-glow">{title}</h3>}
          {actions && <div className="flex gap-4">{actions}</div>}
        </div>
      )}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              {headers.map((header, i) => (
                <th key={i} className="px-8 py-5 text-[10px] font-black text-white/50 uppercase tracking-[0.3em]">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
