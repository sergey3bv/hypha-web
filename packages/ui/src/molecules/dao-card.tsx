type DaoCardProps = {
  icon: string;
  title: string;
  description: string;
  members: number;
};

export const DaoCard: React.FC<DaoCardProps> = ({ icon }) => {
  return (
    <div className="bg-white rounded">
      <img
        className="w-36 h-36"
        src="https://hypha.infura-ipfs.io/ipfs/QmRsJAvDpAPp54Tqf9P7LdyhU46YjZuuvjmkMMhjWwNFKk"
        alt="logo"
      />
      DaoCard
    </div>
  );
};
