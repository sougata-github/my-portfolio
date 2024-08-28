import { Loader } from "lucide-react";

const loading = () => {
  return (
    <div className="mx-auto max-w-4xl w-full pt-20 h-[500px] bg-transparent flex items-center justify-center">
      <Loader className="h-5 w-5 animate-spin transition-all" />
    </div>
  );
};

export default loading;
