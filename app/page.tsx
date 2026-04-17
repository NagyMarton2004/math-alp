import Workspace from "@/components/Workspace";
import Sidebar from "@/components/Sidebar";



export default function Home() {
  return (
    <div className="flex h-screen p-4 gap-4">
      <div className="w-1/3 ">
        <Sidebar />
      </div>
      <div className="w-2/3">
        <Workspace />
      </div>
    </div>
  );
}