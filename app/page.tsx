import Navbar from "./Component/navbar/navbar";
import Sidebar from "./Component/sidebar/sidebar";
import Playbar from "./Component/playbar/playbar";
import Mainbar from "./Component/mainbar/mainbar";

export default function Home() {
  return (
    <main className="container mx-auto">
      <div className="bg-black font-mono flex flex-col items-center min-h-screen max-w-full">
        <div className="mt-4 w-full">
        <Navbar />
        </div>
          <div className="mt-2">
            <div className="">
              <Sidebar/>
            </div>
            <div>
            <Mainbar/>
            </div>
        </div>
        <div>
        <Playbar/>
        </div>
      </div>
    </main>
  );
}
