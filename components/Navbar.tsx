import { UserButton } from "@clerk/nextjs"
import RouteNav from "./RouteNav"
import StoreSwitcher from "./store-switcher"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ModeToggle } from "./theme-toggle";


async function Navbar() {
  const {userId} = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId
    }
  })
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div>
           <StoreSwitcher items={stores}/>
        </div>
        <div>
            <RouteNav />
        </div>
        <div className="ml-auto flex items-center space-x-4">
             <ModeToggle />
            <UserButton />
        </div>

      </div>
    </div>
  )
}

export default Navbar
