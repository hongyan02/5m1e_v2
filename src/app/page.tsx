import FlowChart from "@/components/flow/flow";
import Header from "@/components/header";

export default function Home() {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <div className="w-full h-10 flex-shrink-0">
                <Header />
            </div>
            <div className="w-full h-[calc(100vh-2.5rem)] overflow-auto">
                <FlowChart />
            </div>
        </div>
    );
}
