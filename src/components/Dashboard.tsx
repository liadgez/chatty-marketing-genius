
import { MetricCards } from "./dashboard/MetricCards";
import { ChartsArea } from "./dashboard/ChartsArea";
import { ActionBar } from "./dashboard/ActionBar";

export function Dashboard() {
  return (
    <div className="space-y-6 p-6 bg-transparent">
      <ActionBar />
      <MetricCards />
      <ChartsArea />
    </div>
  );
}
