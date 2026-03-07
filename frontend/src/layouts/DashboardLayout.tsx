import Slidebar from "../components/SlideBar";

interface Props {
   children: React.ReactNode;
}

function DashboardLayout({ children }: Props) {
   return (
      <div className="flex">
         <Slidebar />

         <main>{children}</main>
      </div>
   );
}

export default DashboardLayout;
