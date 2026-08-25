import type { Metadata } from "next";
import { CriticalComponentsLab } from "@/src/design-system/components/critical-components-lab";

export const metadata: Metadata = {
  title: "Critical component design lab",
};

export default function CriticalComponentsPage() {
  return <CriticalComponentsLab />;
}
