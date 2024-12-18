import Image from 'next/image';
import MembersGraphSrc from './graph.svg';

type MembersGraphProps = {
  width?: number;
  height?: number;
};

export const MembersGraph = ({ width = 600, height = 600 }: MembersGraphProps) => (
  <Image
    src={MembersGraphSrc}
    alt="Members Graph"
    width={width}
    height={height}
  />
);
