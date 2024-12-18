import Image from 'next/image';
import TreasuryGraphSrc from './graph.svg';

type TreasuryGraphProps = {
  width?: number;
  height?: number;
};

export const TreasuryGraph = ({
  width = 600,
  height = 600,
}: TreasuryGraphProps) => (
  <Image
    src={TreasuryGraphSrc}
    alt="Treasury Graph"
    width={width}
    height={height}
  />
);
