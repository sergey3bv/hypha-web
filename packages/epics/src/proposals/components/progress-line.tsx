import * as React from 'react';
import { Progress } from '@hypha-platform/ui';

interface ProgressLineProps {
  label: string;
  value: number;
  indicatorColor?: string;
}

export function ProgressLine({
  label,
  value,
  indicatorColor,
}: ProgressLineProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="text-sm">{label}</div>
        <div className="text-sm">{value}%</div>
      </div>
      <Progress value={value} indicatorColor={indicatorColor} className="h-1" />
    </div>
  );
}
