export interface PlanDisplay {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  features: Array<{
    name: string;
    included: boolean;
  }>;
  isPopular?: boolean;
}
