
import Image from 'next/image';
import AssignmentsGraphSrc from './graph.svg';

type AssignmentsGraphProps = {
  width?: number;
  height?: number;
};

export const AssignmentsGraph = ({
  width = 600,
  height = 600,
}: AssignmentsGraphProps) => (
  <Image
    src={AssignmentsGraphSrc}
    alt="Assignments Graph"
    width={width}
    height={height}
  />
);
