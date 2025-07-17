import AdminSidebar from "@/components/admin-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import UserNav from "@/components/user-nav";

export default function AdminLayout({children}) {
  return (
    <SidebarProvider>
        {/* 1. Sidebar section */}
        <AdminSidebar/>

        {/* 2. Main content section */}
        <SidebarInset>
               <header>
                <div className="flex h-16 items-center  justify-between px-4">
                   <h1 className="text-xl font-bold">Admin Dashboard</h1>
                   {/* <div className="bg-red-600 rounded-full h-10 w-10 flex items-center justify-center">
                     TW
                   </div> */}
                   <UserNav/>
                </div>
               </header>
               <div className="flex-1 p-4 md:p-8" >{children}</div>
        </SidebarInset>

    </SidebarProvider>
  )
}
