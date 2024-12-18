"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const plans = [
  {
    name: "Basic",
    price: 9.99,
    features: ["10 users", "Basic support", "1 project"],
  },
  {
    name: "Pro",
    price: 19.99,
    features: ["Unlimited users", "Priority support", "10 projects"],
  },
  {
    name: "Enterprise",
    price: 49.99,
    features: ["Unlimited users", "24/7 support", "Unlimited projects"],
  },
]

export function PlanSelection() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState(plans[0].name)

  const handleContinue = () => {
    // TODO: Implement logic to save selected plan
    router.push("/subscription/payment")
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Choose a Plan</CardTitle>
        <CardDescription>Select the plan that best fits your needs.</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
          {plans.map((plan) => (
            <div key={plan.name} className="flex items-center space-x-2 mb-4">
              <RadioGroupItem value={plan.name} id={plan.name} />
              <Label htmlFor={plan.name} className="flex flex-col">
                <span className="font-semibold">{plan.name}</span>
                <span className="text-sm text-muted-foreground">${plan.price}/month</span>
              </Label>
              <ul className="ml-6 text-sm">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button onClick={handleContinue} className="w-full">Continue to Payment</Button>
      </CardFooter>
    </Card>
  )
}

