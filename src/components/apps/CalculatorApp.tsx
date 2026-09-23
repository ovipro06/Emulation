import React, { useState } from 'react';
import { Delete, Divide, Equal, Minus, Plus, X } from 'lucide-react';

export const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [prevVal, setPrevVal] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);

  const handleNum = (n: string) => {
    setDisplay((prev) => (prev === '0' ? n : prev + n));
  };

  const handleOp = (op: string) => {
    setPrevVal(display);
    setOperation(op);
    setDisplay('0');
  };

  const handleCalculate = () => {
    if (!prevVal || !operation) return;
    const a = parseFloat(prevVal);
    const b = parseFloat(display);
    let res = 0;
    switch (operation) {
      case '+':
        res = a + b;
        break;
      case '-':
        res = a - b;
        break;
      case '×':
        res = a * b;
        break;
      case '÷':
        res = b !== 0 ? a / b : 0;
        break;
    }
    setDisplay(String(res));
    setPrevVal(null);
    setOperation(null);
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevVal(null);
    setOperation(null);
  };

  return (
    <div className="w-full h-full bg-slate-950 text-white flex flex-col justify-between p-4 select-none overflow-hidden font-sans">
      <div className="flex-1 flex flex-col justify-end p-4 text-right">
        {prevVal && (
          <span className="text-sm font-mono text-slate-400">
            {prevVal} {operation}
          </span>
        )}
        <span className="text-4xl font-bold font-mono text-white tracking-tight truncate">
          {display}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2.5 pt-4 border-t border-white/10">
        <button
          onClick={handleClear}
          className="p-4 rounded-2xl bg-slate-800 text-amber-400 text-sm font-bold active:scale-95 transition-transform"
        >
          AC
        </button>
        <button
          onClick={() => setDisplay((prev) => String(-parseFloat(prev)))}
          className="p-4 rounded-2xl bg-slate-800 text-slate-200 text-sm font-bold active:scale-95 transition-transform"
        >
          ±
        </button>
        <button
          onClick={() => setDisplay((prev) => String(parseFloat(prev) / 100))}
          className="p-4 rounded-2xl bg-slate-800 text-slate-200 text-sm font-bold active:scale-95 transition-transform"
        >
          %
        </button>
        <button
          onClick={() => handleOp('÷')}
          className="p-4 rounded-2xl bg-amber-600 text-white text-sm font-bold active:scale-95 transition-transform flex items-center justify-center"
        >
          <Divide size={18} />
        </button>

        {['7', '8', '9'].map((num) => (
          <button
            key={num}
            onClick={() => handleNum(num)}
            className="p-4 rounded-2xl bg-slate-900 text-white text-base font-bold active:scale-95 transition-transform"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleOp('×')}
          className="p-4 rounded-2xl bg-amber-600 text-white text-sm font-bold active:scale-95 transition-transform flex items-center justify-center"
        >
          <X size={18} />
        </button>

        {['4', '5', '6'].map((num) => (
          <button
            key={num}
            onClick={() => handleNum(num)}
            className="p-4 rounded-2xl bg-slate-900 text-white text-base font-bold active:scale-95 transition-transform"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleOp('-')}
          className="p-4 rounded-2xl bg-amber-600 text-white text-sm font-bold active:scale-95 transition-transform flex items-center justify-center"
        >
          <Minus size={18} />
        </button>

        {['1', '2', '3'].map((num) => (
          <button
            key={num}
            onClick={() => handleNum(num)}
            className="p-4 rounded-2xl bg-slate-900 text-white text-base font-bold active:scale-95 transition-transform"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleOp('+')}
          className="p-4 rounded-2xl bg-amber-600 text-white text-sm font-bold active:scale-95 transition-transform flex items-center justify-center"
        >
          <Plus size={18} />
        </button>

        <button
          onClick={() => handleNum('0')}
          className="col-span-2 p-4 rounded-2xl bg-slate-900 text-white text-base font-bold active:scale-95 transition-transform text-center"
        >
          0
        </button>
        <button
          onClick={() => handleNum('.')}
          className="p-4 rounded-2xl bg-slate-900 text-white text-base font-bold active:scale-95 transition-transform"
        >
          .
        </button>
        <button
          onClick={handleCalculate}
          className="p-4 rounded-2xl bg-blue-600 text-white text-base font-bold active:scale-95 transition-transform flex items-center justify-center shadow-lg"
        >
          <Equal size={20} />
        </button>
      </div>
    </div>
  );
};
