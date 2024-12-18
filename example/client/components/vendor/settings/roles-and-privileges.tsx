"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const rolePrivileges = [
  {
    role: "Vendor",
    privileges: [
      "Manage Products",
      "View Sales",
      "Respond to Reviews",
      "Manage Inventory",
      "Access Vendor Analytics",
      "Manage Store Settings",
      "Process Orders",
      "Manage Promotions",
    ],
  },
]

export function RolesAndPrivileges() {
  const [checkedPrivileges, setCheckedPrivileges] = useState<Record<string, string[]>>({})

  const handlePrivilegeChange = (role: string, privilege: string) => {
    setCheckedPrivileges((prev) => {
      const rolePrivileges = prev[role] || []
      if (rolePrivileges.includes(privilege)) {
        return { ...prev, [role]: rolePrivileges.filter((p) => p !== privilege) }
      } else {
        return { ...prev, [role]: [...rolePrivileges, privilege] }
      }
    })
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Vendor Privileges</h1>
      <Accordion type="single" collapsible className="w-full">
        {rolePrivileges.map((roleData) => (
          <AccordionItem value={roleData.role} key={roleData.role}>
            <AccordionTrigger>{roleData.role}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {roleData.privileges.map((privilege) => (
                  <div className="flex items-center space-x-2" key={privilege}>
                    <Checkbox
                      id={`${roleData.role}-${privilege}`}
                      checked={(checkedPrivileges[roleData.role] || []).includes(privilege)}
                      onCheckedChange={() => handlePrivilegeChange(roleData.role, privilege)}
                    />
                    <Label htmlFor={`${roleData.role}-${privilege}`}>{privilege}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

