/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  createdAt: string;
}

export interface BudgetLineItem {
  id: string;
  name: string;
  category: "Materials" | "Labor" | "Equipment" | "Permits" | "Logistics";
  currentCost: number;
  suggestedCost?: number;
  wasteMetric?: number;
  procurementStrategy?: string;
  status: "Active" | "Optimized" | "Pending";
}

export interface ComplianceAuditReport {
  scenario: string;
  report: string;
  score: number;
  severity: "Low" | "Medium" | "High" | "Critical";
  violations: string[];
  corrections: string[];
  systemModule?: string;
  createdAt: string;
}

export interface HapiDelivery {
  id: string;
  materialName: string;
  quantity: string;
  source: string;
  destination: string;
  status: "In Transit" | "Dispatched" | "Delivered" | "Delayed";
  driver: string;
  eta: string;
}

export interface HathorSupplyNode {
  id: string;
  siteName: string;
  resourceType: "Granite" | "Sand" | "Limestone" | "Copper Ore" | "Steel Alloy";
  dailyYield: number; // tons
  purity: number; // percentage (0 - 100)
  freightStatus: "Sufficient" | "Critical Alert" | "Optimal";
  lastTonnageReport: string;
}

export interface MamiWataValves {
  id: string;
  valveName: string;
  pressure: number; // bar
  flowRate: number; // m3/s
  status: "Open" | "Closed" | "Vent Mode";
  integrityPct: number; // integrity safety level 0-100
}

export interface RaPowerGrid {
  arrayName: string;
  solarYieldKw: number;
  batteryPercent: number;
  gridPowerStatus: "Nominal" | "Surplus Active" | "Low Charging";
  siteConsumptionKw: number;
}

export interface SiteMetaMetrics {
  cumulativeTimelinePct: number;
  estimatedCompletion: string;
  activeLaborForce: number;
  openIncidentsCount: number;
  overallSiteSafetyScore: number;
}
