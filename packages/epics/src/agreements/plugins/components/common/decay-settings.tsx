import React from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Input,
} from '@hypha-platform/ui';
import { PercentIcon } from 'lucide-react';

type TimeFormat = 'Minutes' | 'Hours' | 'Days' | 'Weeks' | 'Months';

type DecaySettings = {
  decayPeriod: number | '';
  timeFormat: TimeFormat;
  decayPercent: number | '';
};

type DecaySettingsProps = {
  value?: DecaySettings;
  onChange?: (value: DecaySettings) => void;
};

export const DecaySettings = ({ value, onChange }: DecaySettingsProps) => {
  const [decayPeriod, setDecayPeriod] = React.useState<number | ''>(
    value?.decayPeriod ?? '',
  );
  const [timeFormat, setTimeFormat] = React.useState<TimeFormat>(
    value?.timeFormat ?? 'Minutes',
  );
  const [decayPercent, setDecayPercent] = React.useState<number | ''>(
    value?.decayPercent ?? '',
  );

  React.useEffect(() => {
    if (value) {
      setDecayPeriod(value.decayPeriod);
      setTimeFormat(value.timeFormat);
      setDecayPercent(value.decayPercent);
    }
  }, [value]);

  const notifyChange = (newValues: DecaySettings) => {
    if (onChange) onChange(newValues);
  };

  const handleDecayPeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const num = val === '' ? '' : Number(val);
    setDecayPeriod(num);
    notifyChange({ decayPeriod: num, timeFormat, decayPercent });
  };

  const handleTimeFormatChange = (val: string) => {
    const format = val as TimeFormat;
    setTimeFormat(format);
    notifyChange({ decayPeriod, timeFormat: format, decayPercent });
  };

  const handleDecayPercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const num = val === '' ? '' : Number(val);
    setDecayPercent(num);
    notifyChange({ decayPeriod, timeFormat, decayPercent: num });
  };

  return (
    <div className="flex gap-4 items-center">
      <div className="flex flex-col flex-1">
        <Input
          id="decay-period"
          type="number"
          value={decayPeriod === '' ? '' : decayPeriod}
          onChange={handleDecayPeriodChange}
          placeholder="Decay period"
        />
      </div>

      <div className="flex flex-col flex-1">
        <Select value={timeFormat} onValueChange={handleTimeFormatChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select time format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Minutes">Minutes</SelectItem>
            <SelectItem value="Hours">Hours</SelectItem>
            <SelectItem value="Days">Days</SelectItem>
            <SelectItem value="Weeks">Weeks</SelectItem>
            <SelectItem value="Months">Months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col flex-1">
        <Input
          id="decay-percent"
          type="number"
          min={1}
          max={100}
          value={decayPercent === '' ? '' : decayPercent}
          onChange={handleDecayPercentChange}
          placeholder="Decay"
          rightIcon={<PercentIcon size={'14px'} />}
        />
      </div>
    </div>
  );
};
