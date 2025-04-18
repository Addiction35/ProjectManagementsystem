// Simulated API functions with dummy data

// Purchase Orders data
const purchaseOrders = [
  {
    id: "PO-2023-001",
    vendor: "Office Supplies Inc.",
    date: "2023-10-15",
    expectedDelivery: "2023-10-30",
    amount: "$1,234.56",
    status: "Pending",
    notes: "Standard office supplies for Q4",
    items: [
      { id: 1, name: "Paper", description: "A4 printing paper", quantity: 10, price: 45.67 },
      { id: 2, name: "Pens", description: "Blue ballpoint pens", quantity: 50, price: 1.23 },
      { id: 3, name: "Notebooks", description: "Spiral notebooks", quantity: 20, price: 3.45 },
    ],
  },
  {
    id: "PO-2023-002",
    vendor: "Tech Solutions Ltd.",
    date: "2023-10-10",
    expectedDelivery: "2023-11-10",
    amount: "$5,678.90",
    status: "Approved",
    notes: "New equipment for engineering team",
    items: [
      { id: 1, name: "Laptops", description: "15-inch laptops", quantity: 2, price: 1200.0 },
      { id: 2, name: "Monitors", description: "24-inch monitors", quantity: 4, price: 300.0 },
      { id: 3, name: "Keyboards", description: "Mechanical keyboards", quantity: 5, price: 80.0 },
    ],
  },
  {
    id: "PO-2023-003",
    vendor: "Furniture Depot",
    date: "2023-10-05",
    expectedDelivery: "2023-11-15",
    amount: "$3,456.78",
    status: "Received",
    notes: "Office furniture for new hires",
    items: [
      { id: 1, name: "Desks", description: "Adjustable standing desks", quantity: 3, price: 800.0 },
      { id: 2, name: "Chairs", description: "Ergonomic office chairs", quantity: 6, price: 200.0 },
      { id: 3, name: "Filing Cabinets", description: "3-drawer cabinets", quantity: 2, price: 150.0 },
    ],
  },
  {
    id: "PO-2023-004",
    vendor: "Cleaning Services Co.",
    date: "2023-09-28",
    expectedDelivery: "2023-10-05",
    amount: "$890.12",
    status: "Paid",
    notes: "Monthly cleaning services",
    items: [
      { id: 1, name: "Monthly Cleaning", description: "Regular office cleaning", quantity: 1, price: 500.0 },
      { id: 2, name: "Window Cleaning", description: "Exterior windows", quantity: 1, price: 300.0 },
      { id: 3, name: "Carpet Cleaning", description: "Deep carpet cleaning", quantity: 1, price: 90.12 },
    ],
  },
]

// Wages data
const wages = [
  {
    id: "WG-2023-001",
    employee: "John Smith",
    department: "Engineering",
    payPeriod: "Oct 1-15, 2023",
    amount: "$3,500.00",
    status: "Paid",
    details: {
      regularHours: 80,
      overtimeHours: 5,
      regularRate: "$40.00",
      overtimeRate: "$60.00",
      deductions: "$500.00",
    },
  },
  {
    id: "WG-2023-002",
    employee: "Jane Doe",
    department: "Marketing",
    payPeriod: "Oct 1-15, 2023",
    amount: "$2,800.00",
    status: "Pending",
    details: {
      regularHours: 80,
      overtimeHours: 0,
      regularRate: "$35.00",
      overtimeRate: "$52.50",
      deductions: "$400.00",
    },
  },
  {
    id: "WG-2023-003",
    employee: "Robert Johnson",
    department: "Finance",
    payPeriod: "Oct 1-15, 2023",
    amount: "$4,200.00",
    status: "Paid",
    details: {
      regularHours: 80,
      overtimeHours: 8,
      regularRate: "$45.00",
      overtimeRate: "$67.50",
      deductions: "$600.00",
    },
  },
  {
    id: "WG-2023-004",
    employee: "Emily Williams",
    department: "Human Resources",
    payPeriod: "Oct 1-15, 2023",
    amount: "$3,000.00",
    status: "Paid",
    details: {
      regularHours: 80,
      overtimeHours: 0,
      regularRate: "$37.50",
      overtimeRate: "$56.25",
      deductions: "$450.00",
    },
  },
]

// Expenses data
const expenses = [
  {
    id: "EXP-2023-001",
    category: "Travel",
    description: "Business trip to New York",
    date: "2023-10-15",
    amount: "$1,250.75",
    status: "Approved",
    submittedBy: "John Smith",
    details: [
      { id: 1, item: "Flight", amount: "$450.00" },
      { id: 2, item: "Hotel (3 nights)", amount: "$600.00" },
      { id: 3, item: "Meals", amount: "$150.75" },
      { id: 4, item: "Transportation", amount: "$50.00" },
    ],
  },
  {
    id: "EXP-2023-002",
    category: "Office Supplies",
    description: "Quarterly office supply restock",
    date: "2023-10-10",
    amount: "$345.67",
    status: "Pending",
    submittedBy: "Jane Doe",
    details: [
      { id: 1, item: "Paper", amount: "$45.67" },
      { id: 2, item: "Pens and Markers", amount: "$65.43" },
      { id: 3, item: "Notebooks", amount: "$87.65" },
      { id: 4, item: "Printer Ink", amount: "$146.92" },
    ],
  },
  {
    id: "EXP-2023-003",
    category: "Software",
    description: "Annual software subscriptions",
    date: "2023-10-05",
    amount: "$2,345.00",
    status: "Approved",
    submittedBy: "Robert Johnson",
    details: [
      { id: 1, item: "Design Software", amount: "$899.00" },
      { id: 2, item: "Project Management Tool", amount: "$599.00" },
      { id: 3, item: "CRM System", amount: "$847.00" },
    ],
  },
  {
    id: "EXP-2023-004",
    category: "Training",
    description: "Team workshop on leadership",
    date: "2023-09-28",
    amount: "$1,500.00",
    status: "Reimbursed",
    submittedBy: "Emily Williams",
    details: [
      { id: 1, item: "Workshop Fee", amount: "$1,200.00" },
      { id: 2, item: "Materials", amount: "$150.00" },
      { id: 3, item: "Catering", amount: "$150.00" },
    ],
  },
]

// Proposals data
const proposals = [
  {
    id: "PROP-2023-001",
    client: "Acme Corporation",
    title: "Website Redesign Project",
    date: "2023-10-15",
    expiryDate: "2023-11-15",
    amount: "$12,500.00",
    status: "Sent",
    sections: [
      { id: 1, name: "Design", amount: "$4,500.00" },
      { id: 2, name: "Development", amount: "$6,000.00" },
      { id: 3, name: "Testing", amount: "$1,000.00" },
      { id: 4, name: "Deployment", amount: "$1,000.00" },
    ],
  },
  {
    id: "PROP-2023-002",
    client: "TechStart Inc.",
    title: "Mobile App Development",
    date: "2023-10-10",
    expiryDate: "2023-11-10",
    amount: "$25,000.00",
    status: "Draft",
    sections: [
      { id: 1, name: "UI/UX Design", amount: "$5,000.00" },
      { id: 2, name: "Frontend Development", amount: "$8,000.00" },
      { id: 3, name: "Backend Development", amount: "$10,000.00" },
      { id: 4, name: "Testing & QA", amount: "$2,000.00" },
    ],
  },
  {
    id: "PROP-2023-003",
    client: "Global Enterprises",
    title: "Digital Marketing Campaign",
    date: "2023-10-05",
    expiryDate: "2023-11-05",
    amount: "$8,750.00",
    status: "Approved",
    sections: [
      { id: 1, name: "Strategy", amount: "$2,000.00" },
      { id: 2, name: "Content Creation", amount: "$3,500.00" },
      { id: 3, name: "Ad Management", amount: "$2,250.00" },
      { id: 4, name: "Reporting", amount: "$1,000.00" },
    ],
  },
  {
    id: "PROP-2023-004",
    client: "Retail Solutions",
    title: "E-commerce Platform Integration",
    date: "2023-09-28",
    expiryDate: "2023-10-28",
    amount: "$15,000.00",
    status: "Rejected",
    sections: [
      { id: 1, name: "Requirements Analysis", amount: "$2,000.00" },
      { id: 2, name: "Integration Development", amount: "$10,000.00" },
      { id: 3, name: "Data Migration", amount: "$2,000.00" },
      { id: 4, name: "Training", amount: "$1,000.00" },
    ],
  },
]

// Bills data
const bills = [
  {
    id: "BILL-2023-001",
    vendor: "Office Supplies Inc.",
    description: "Monthly office supplies",
    date: "2023-10-15",
    dueDate: "2023-11-15",
    amount: "$1,234.56",
    status: "Pending",
    source: "Purchase Order",
    sourceId: "PO-2023-001",
    items: [
      { id: 1, name: "Paper", quantity: 10, price: "$45.67" },
      { id: 2, name: "Pens", quantity: 50, price: "$1.23" },
      { id: 3, name: "Notebooks", quantity: 20, price: "$3.45" },
    ],
  },
  {
    id: "BILL-2023-002",
    vendor: "Tech Solutions Ltd.",
    description: "IT equipment purchase",
    date: "2023-10-10",
    dueDate: "2023-11-10",
    amount: "$5,678.90",
    status: "Paid",
    source: "Purchase Order",
    sourceId: "PO-2023-002",
    items: [
      { id: 1, name: "Laptops", quantity: 2, price: "$1,200.00" },
      { id: 2, name: "Monitors", quantity: 4, price: "$300.00" },
      { id: 3, name: "Keyboards", quantity: 5, price: "$80.00" },
    ],
  },
  {
    id: "BILL-2023-003",
    vendor: "Payroll Services",
    description: "Monthly wages",
    date: "2023-10-05",
    dueDate: "2023-10-15",
    amount: "$23,456.78",
    status: "Paid",
    source: "Wages",
    sourceId: "WG-2023-001",
    items: [
      { id: 1, name: "Regular Hours", quantity: 1, price: "$20,000.00" },
      { id: 2, name: "Overtime", quantity: 1, price: "$3,456.78" },
    ],
  },
  {
    id: "BILL-2023-004",
    vendor: "Travel Agency",
    description: "Business trip expenses",
    date: "2023-09-28",
    dueDate: "2023-10-28",
    amount: "$1,250.75",
    status: "Overdue",
    source: "Expense",
    sourceId: "EXP-2023-001",
    items: [
      { id: 1, name: "Flight", quantity: 1, price: "$450.00" },
      { id: 2, name: "Hotel", quantity: 1, price: "$600.00" },
      { id: 3, name: "Meals", quantity: 1, price: "$150.75" },
      { id: 4, name: "Transportation", quantity: 1, price: "$50.00" },
    ],
  },
]

// Estimates data
const estimates = [
  {
    id: "EST-2023-001",
    client: "Acme Corporation",
    title: "Website Redesign Project",
    date: "2023-10-15",
    expiryDate: "2023-11-15",
    amount: "$12,500.00",
    status: "Draft",
    description: "Complete redesign of corporate website with new branding",
    items: [
      { id: 1, name: "UI/UX Design", description: "Design of all website pages", quantity: 1, price: "$4,500.00" },
      {
        id: 2,
        name: "Frontend Development",
        description: "HTML, CSS, and JavaScript implementation",
        quantity: 1,
        price: "$5,000.00",
      },
      {
        id: 3,
        name: "Backend Integration",
        description: "CMS setup and API integration",
        quantity: 1,
        price: "$3,000.00",
      },
    ],
  },
  {
    id: "EST-2023-002",
    client: "TechStart Inc.",
    title: "Mobile App Development",
    date: "2023-10-10",
    expiryDate: "2023-11-10",
    amount: "$25,000.00",
    status: "Sent",
    description: "Development of iOS and Android mobile applications",
    items: [
      { id: 1, name: "UI/UX Design", description: "App interface design", quantity: 1, price: "$5,000.00" },
      { id: 2, name: "iOS Development", description: "Native iOS app development", quantity: 1, price: "$10,000.00" },
      {
        id: 3,
        name: "Android Development",
        description: "Native Android app development",
        quantity: 1,
        price: "$10,000.00",
      },
    ],
  },
  {
    id: "EST-2023-003",
    client: "Global Enterprises",
    title: "Digital Marketing Campaign",
    date: "2023-10-05",
    expiryDate: "2023-11-05",
    amount: "$8,750.00",
    status: "Approved",
    description: "Three-month digital marketing campaign across multiple channels",
    items: [
      {
        id: 1,
        name: "Strategy Development",
        description: "Marketing strategy and planning",
        quantity: 1,
        price: "$2,000.00",
      },
      {
        id: 2,
        name: "Content Creation",
        description: "Blog posts, social media content, and ads",
        quantity: 1,
        price: "$3,500.00",
      },
      {
        id: 3,
        name: "Campaign Management",
        description: "Three months of campaign management",
        quantity: 3,
        price: "$1,000.00",
      },
      {
        id: 4,
        name: "Reporting",
        description: "Weekly and monthly performance reports",
        quantity: 1,
        price: "$1,250.00",
      },
    ],
  },
]

// Helper function to simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Generate a new ID for a specific type
const generateId = (type) => {
  const year = new Date().getFullYear()
  let prefix = ""
  let lastId = 0

  switch (type) {
    case "purchase-order":
      prefix = "PO"
      lastId =
        purchaseOrders.length > 0 ? Number.parseInt(purchaseOrders[purchaseOrders.length - 1].id.split("-")[2]) : 0
      break
    case "wage":
      prefix = "WG"
      lastId = wages.length > 0 ? Number.parseInt(wages[wages.length - 1].id.split("-")[2]) : 0
      break
    case "expense":
      prefix = "EXP"
      lastId = expenses.length > 0 ? Number.parseInt(expenses[expenses.length - 1].id.split("-")[2]) : 0
      break
    case "proposal":
      prefix = "PROP"
      lastId = proposals.length > 0 ? Number.parseInt(proposals[proposals.length - 1].id.split("-")[2]) : 0
      break
    case "bill":
      prefix = "BILL"
      lastId = bills.length > 0 ? Number.parseInt(bills[bills.length - 1].id.split("-")[2]) : 0
      break
    case "estimate":
      prefix = "EST"
      lastId = estimates.length > 0 ? Number.parseInt(estimates[estimates.length - 1].id.split("-")[2]) : 0
      break
    default:
      prefix = "ITEM"
  }

  return `${prefix}-${year}-${String(lastId + 1).padStart(3, "0")}`
}

// API functions for Purchase Orders
export const fetchPurchaseOrders = async () => {
  await delay(500) // Simulate network delay
  return [...purchaseOrders]
}

export const fetchPurchaseOrder = async (id) => {
  await delay(300)
  const po = purchaseOrders.find((po) => po.id === id)
  if (!po) throw new Error(`Purchase order with ID ${id} not found`)
  return { ...po }
}

export const createPurchaseOrder = async (data) => {
  await delay(500)
  const newPO = {
    id: generateId("purchase-order"),
    ...data,
    date: data.date || new Date().toISOString().split("T")[0],
  }
  purchaseOrders.push(newPO)
  return { ...newPO }
}

export const updatePurchaseOrder = async (id, data) => {
  await delay(500)
  const index = purchaseOrders.findIndex((po) => po.id === id)
  if (index === -1) throw new Error(`Purchase order with ID ${id} not found`)

  const updatedPO = { ...purchaseOrders[index], ...data }
  purchaseOrders[index] = updatedPO
  return { ...updatedPO }
}

export const deletePurchaseOrder = async (id) => {
  await delay(500)
  const index = purchaseOrders.findIndex((po) => po.id === id)
  if (index === -1) throw new Error(`Purchase order with ID ${id} not found`)

  purchaseOrders.splice(index, 1)
  return { success: true }
}

// API functions for Wages
export const fetchWages = async () => {
  await delay(500)
  return [...wages]
}

export const fetchWage = async (id) => {
  await delay(300)
  const wage = wages.find((w) => w.id === id)
  if (!wage) throw new Error(`Wage with ID ${id} not found`)
  return { ...wage }
}

export const createWage = async (data) => {
  await delay(500)
  const newWage = {
    id: generateId("wage"),
    ...data,
    date: data.date || new Date().toISOString().split("T")[0],
  }
  wages.push(newWage)
  return { ...newWage }
}

export const updateWage = async (id, data) => {
  await delay(500)
  const index = wages.findIndex((w) => w.id === id)
  if (index === -1) throw new Error(`Wage with ID ${id} not found`)

  const updatedWage = { ...wages[index], ...data }
  wages[index] = updatedWage
  return { ...updatedWage }
}

export const deleteWage = async (id) => {
  await delay(500)
  const index = wages.findIndex((w) => w.id === id)
  if (index === -1) throw new Error(`Wage with ID ${id} not found`)

  wages.splice(index, 1)
  return { success: true }
}

// API functions for Expenses
export const fetchExpenses = async () => {
  await delay(500)
  return [...expenses]
}

export const fetchExpense = async (id) => {
  await delay(300)
  const expense = expenses.find((e) => e.id === id)
  if (!expense) throw new Error(`Expense with ID ${id} not found`)
  return { ...expense }
}

export const createExpense = async (data) => {
  await delay(500)
  const newExpense = {
    id: generateId("expense"),
    ...data,
    date: data.date || new Date().toISOString().split("T")[0],
  }
  expenses.push(newExpense)
  return { ...newExpense }
}

export const updateExpense = async (id, data) => {
  await delay(500)
  const index = expenses.findIndex((e) => e.id === id)
  if (index === -1) throw new Error(`Expense with ID ${id} not found`)

  const updatedExpense = { ...expenses[index], ...data }
  expenses[index] = updatedExpense
  return { ...updatedExpense }
}

export const deleteExpense = async (id) => {
  await delay(500)
  const index = expenses.findIndex((e) => e.id === id)
  if (index === -1) throw new Error(`Expense with ID ${id} not found`)

  expenses.splice(index, 1)
  return { success: true }
}

// API functions for Proposals
export const fetchProposals = async () => {
  await delay(500)
  return [...proposals]
}

export const fetchProposal = async (id) => {
  await delay(300)
  const proposal = proposals.find((p) => p.id === id)
  if (!proposal) throw new Error(`Proposal with ID ${id} not found`)
  return { ...proposal }
}

export const createProposal = async (data) => {
  await delay(500)
  const newProposal = {
    id: generateId("proposal"),
    ...data,
    date: data.date || new Date().toISOString().split("T")[0],
  }
  proposals.push(newProposal)
  return { ...newProposal }
}

export const updateProposal = async (id, data) => {
  await delay(500)
  const index = proposals.findIndex((p) => p.id === id)
  if (index === -1) throw new Error(`Proposal with ID ${id} not found`)

  const updatedProposal = { ...proposals[index], ...data }
  proposals[index] = updatedProposal
  return { ...updatedProposal }
}

export const deleteProposal = async (id) => {
  await delay(500)
  const index = proposals.findIndex((p) => p.id === id)
  if (index === -1) throw new Error(`Proposal with ID ${id} not found`)

  proposals.splice(index, 1)
  return { success: true }
}

// API functions for Bills
export const fetchBills = async () => {
  await delay(500)
  return [...bills]
}

export const fetchBill = async (id) => {
  await delay(300)
  const bill = bills.find((b) => b.id === id)
  if (!bill) throw new Error(`Bill with ID ${id} not found`)
  return { ...bill }
}

export const createBill = async (data) => {
  await delay(500)
  const newBill = {
    id: generateId("bill"),
    ...data,
    date: data.date || new Date().toISOString().split("T")[0],
  }
  bills.push(newBill)
  return { ...newBill }
}

export const updateBill = async (id, data) => {
  await delay(500)
  const index = bills.findIndex((b) => b.id === id)
  if (index === -1) throw new Error(`Bill with ID ${id} not found`)

  const updatedBill = { ...bills[index], ...data }
  bills[index] = updatedBill
  return { ...updatedBill }
}

export const deleteBill = async (id) => {
  await delay(500)
  const index = bills.findIndex((b) => b.id === id)
  if (index === -1) throw new Error(`Bill with ID ${id} not found`)

  bills.splice(index, 1)
  return { success: true }
}

// API functions for Estimates
export const fetchEstimates = async () => {
  await delay(500) // Simulate network delay
  return [...estimates]
}

export const fetchEstimate = async (id) => {
  await delay(300)
  const estimate = estimates.find((est) => est.id === id)
  if (!estimate) throw new Error(`Estimate with ID ${id} not found`)
  return { ...estimate }
}

export const createEstimate = async (data) => {
  await delay(500)
  const newEstimate = {
    id: generateId("estimate"),
    ...data,
    date: data.date || new Date().toISOString().split("T")[0],
  }
  estimates.push(newEstimate)
  return { ...newEstimate }
}

export const updateEstimate = async (id, data) => {
  await delay(500)
  const index = estimates.findIndex((est) => est.id === id)
  if (index === -1) throw new Error(`Estimate with ID ${id} not found`)

  const updatedEstimate = { ...estimates[index], ...data }
  estimates[index] = updatedEstimate
  return { ...updatedEstimate }
}

export const deleteEstimate = async (id) => {
  await delay(500)
  const index = estimates.findIndex((est) => est.id === id)
  if (index === -1) throw new Error(`Estimate with ID ${id} not found`)

  estimates.splice(index, 1)
  return { success: true }
}

// Convert estimate to proposal
export const convertToProposal = async (id) => {
  await delay(700)
  const estimate = estimates.find((est) => est.id === id)
  if (!estimate) throw new Error(`Estimate with ID ${id} not found`)

  const newProposal = {
    id: generateId("proposal"),
    client: estimate.client,
    title: estimate.title,
    date: new Date().toISOString().split("T")[0],
    expiryDate: estimate.expiryDate,
    amount: estimate.amount,
    status: "Draft",
    sections: estimate.items.map((item) => ({
      id: item.id,
      name: item.name,
      amount: item.price,
    })),
  }

  proposals.push(newProposal)
  return { ...newProposal }
}

// Convert to Bill function
export const convertToBill = async (type, id) => {
  await delay(700)
  let sourceData
  let newBill

  // Find the source item
  switch (type) {
    case "purchase-order":
      sourceData = purchaseOrders.find((po) => po.id === id)
      if (!sourceData) throw new Error(`Purchase order with ID ${id} not found`)

      newBill = {
        id: generateId("bill"),
        vendor: sourceData.vendor,
        description: `Bill from purchase order ${sourceData.id}`,
        date: new Date().toISOString().split("T")[0],
        dueDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split("T")[0],
        amount: sourceData.amount,
        status: "Yet to be Approved",
        source: "Purchase Order",
        sourceId: sourceData.id,
        project: "Opollo Residence", // Add project information
        items: sourceData.items.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description || "",
          quantity: item.quantity,
          price: `$${item.price.toFixed(2)}`,
        })),
      }
      break

    case "wage":
      sourceData = wages.find((w) => w.id === id)
      if (!sourceData) throw new Error(`Wage with ID ${id} not found`)

      newBill = {
        id: generateId("bill"),
        vendor: "Payroll Services",
        description: `Wages for ${sourceData.employee}`,
        date: new Date().toISOString().split("T")[0],
        dueDate: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split("T")[0],
        amount: sourceData.amount,
        status: "Yet to be Approved",
        source: "Wages",
        sourceId: sourceData.id,
        project: "Opollo Residence", // Add project information
        items: [
          {
            id: 1,
            name: "Regular Hours",
            description: "Standard working hours",
            quantity: 1,
            price: `$${(sourceData.details.regularHours * Number.parseFloat(sourceData.details.regularRate.replace("$", ""))).toFixed(2)}`,
          },
          {
            id: 2,
            name: "Overtime",
            description: "Additional hours worked",
            quantity: 1,
            price: `$${(sourceData.details.overtimeHours * Number.parseFloat(sourceData.details.overtimeRate.replace("$", ""))).toFixed(2)}`,
          },
        ],
      }
      break

    case "expense":
      sourceData = expenses.find((e) => e.id === id)
      if (!sourceData) throw new Error(`Expense with ID ${id} not found`)

      newBill = {
        id: generateId("bill"),
        vendor: sourceData.submittedBy,
        description: sourceData.description,
        date: new Date().toISOString().split("T")[0],
        dueDate: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split("T")[0],
        amount: sourceData.amount,
        status: "Yet to be Approved",
        source: "Expense",
        sourceId: sourceData.id,
        project: "Opollo Residence", // Add project information
        items: sourceData.details.map((detail) => ({
          id: detail.id,
          name: detail.item,
          description: sourceData.category,
          quantity: 1,
          price: detail.amount,
        })),
      }
      break

    default:
      throw new Error(`Invalid source type: ${type}`)
  }

  // Add the new bill
  bills.push(newBill)
  return { ...newBill }
}

// Export functions for Excel
export const generateExcel = async (type, id) => {
  await delay(500)
  // In a real app, this would generate an Excel file
  return {
    success: true,
    message: `Excel file for ${type} ${id} generated successfully`,
    url: `https://example.com/excel/${type}/${id}.xlsx`,
  }
}
