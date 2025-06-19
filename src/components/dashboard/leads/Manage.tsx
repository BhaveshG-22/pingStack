"use client"

import React from 'react'
import { columns, Lead } from "./_columns"
import { DataTable } from "./_data-table"

// Mock data for leads
const mockLeads: Lead[] = [
  {
    id: "728ed52f",
    name: "Ken Smith",
    email: "ken99@example.com",
    company: "TechCorp Inc",
    group: "tech-leads",
    status: "responded",
    createdAt: "2024-01-15",
  },
  {
    id: "489e1d42",
    name: "Abe Johnson",
    email: "abe45@example.com",
    company: "StartupXYZ",
    group: "startup-founders",
    status: "responded",
    createdAt: "2024-01-14",
  },
  {
    id: "611ed52f",
    name: "Monserrat Garcia",
    email: "monserrat44@example.com",
    company: "InnovateLab",
    group: "hr-managers",
    status: "contacted",
    createdAt: "2024-01-13",
  },
  {
    id: "733ed52f",
    name: "Silas Thompson",
    email: "silas22@example.com",
    company: "DesignStudio",
    group: "recruiters",
    status: "scheduled",
    createdAt: "2024-01-12",
  },
  {
    id: "855ed52f",
    name: "Carmella Rodriguez",
    email: "carmella@example.com",
    company: "MediaGroup",
    group: "hr-managers",
    status: "closed",
    createdAt: "2024-01-11",
  },
  {
    id: "977ed52f",
    name: "John Doe",
    email: "john.doe@techcompany.com",
    company: "Tech Company",
    group: "engineering-managers",
    status: "contacted",
    createdAt: "2024-01-10",
  },
  {
    id: "199ed52f",
    name: "Jane Wilson",
    email: "jane.wilson@startup.io",
    company: "Startup IO",
    group: "startup-founders",
    status: "responded",
    createdAt: "2024-01-09",
  },
  {
    id: "311ed52f",
    name: "Bob Brown",
    email: "bob.brown@enterprise.com",
    company: "Enterprise Corp",
    group: "tech-leads",
    status: "scheduled",
    createdAt: "2024-01-08",
  }
]

const ManageLeads = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Leads</h1>
          <p className="text-muted-foreground">
            View and manage your existing leads and contacts.
          </p>
        </div>
      </div>
      <DataTable columns={columns} data={mockLeads} />
    </div>
  )
}

export default ManageLeads