import { Loader } from "lucide-react";

const loading = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Loader className="text-light-2 h-5 w-5 animate-spin transition-all" />
    </div>
  );
};

export default loading;
