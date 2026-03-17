import Slidebar from "../components/SlideBar";
import Header from "../components/Header";

interface Props {
   children: React.ReactNode;
}

function DashboardLayout({ children }: Props) {
   return (
      <div className="flex h-screen bg-blue-100">
         <Slidebar />

         <div className="flex flex-col flex-1">
            <Header />

            <main className="flex-1">{children}</main>
         </div>
      </div>
   );
}

export default DashboardLayout;
