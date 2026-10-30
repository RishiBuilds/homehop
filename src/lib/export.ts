import type { Property } from "@/types";
import { formatCurrency, computeUpfrontCost } from "./utils";

export function exportPropertiesToText(properties: Property[]): string {
  const lines: string[] = [
    "HOMEHOP MUMBAI RENTALS COMPARISON",
    `Generated: ${new Date().toLocaleDateString("en-IN")}`,
    "--------------------------------------------------",
    "",
  ];

  properties.forEach((p, idx) => {
    const upfront = computeUpfrontCost(p.rent, p.deposit, p.brokerage);
    lines.push(
      `${idx + 1}. [${p.referenceId}] ${p.title}`,
      `   Locality: ${p.locality} (Near ${p.nearbyStation} Station)`,
      `   Rent: ${formatCurrency(p.rent)}/mo | Deposit: ${formatCurrency(p.deposit)} | Brokerage: ${p.brokerage > 0 ? formatCurrency(p.brokerage) : "Zero"}`,
      `   Total Upfront Outlay: ${formatCurrency(upfront)}`,
      `   Configuration: ${p.bedrooms} BHK | Area: ${p.area} ${p.areaUnit} | Furnishing: ${p.furnishing}`,
      `   Availability: ${p.availability} (Confirmed: ${p.lastConfirmedDate})`,
      ""
    );
  });

  return lines.join("\n");
}

