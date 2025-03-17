import { SidebarTrigger } from "@/components/ui/sidebar";

const Dashbaord = () => {
  return (
    <div className="relative">
      <div className="w-full flex justify-between items-center">
        <SidebarTrigger className="md:hidden" />
      </div>
      <div className="h-[60vh] flex justify-center items-center text-3xl text-primary text-center p-5">
        Thinking for something to show here...
      </div>
    </div>
  );
};

export default Dashbaord;
