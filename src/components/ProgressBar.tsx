
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface ProgressBarProps {
  progress: number;
  label: string;
  sublabel?: string;
  color?: string;
}

export const ProgressBar = ({ progress, label, sublabel, color = 'bg-blue-600' }: ProgressBarProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-800">{label}</span>
          {sublabel && <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{sublabel}</span>}
        </div>
        <span className="text-sm font-mono font-bold text-slate-600">{progress}%</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full rounded-full", color)}
        />
      </div>
    </div>
  );
};
