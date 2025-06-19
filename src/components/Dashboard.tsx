
import { MetricCards } from "./dashboard/MetricCards";
import { ChartsArea } from "./dashboard/ChartsArea";
import { ActionBar } from "./dashboard/ActionBar";

export function Dashboard() {
  return (
    <div className="space-y-4 md:space-y-6 p-3 md:p-6 bg-transparent min-h-full">
      <ActionBar />
      <MetricCards />
      <ChartsArea />
    </div>
  );
}
