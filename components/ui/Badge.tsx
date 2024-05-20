const Badge = ({ tag }: { tag: string }) => {
  return (
    <div className="cursor-pointer px-4 py-2 bg-[#cecece] text-light-1 text-xs font-medium lowercase rounded-xl">
      {tag}
    </div>
  );
};

export default Badge;
