import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // In a real application, you would generate a PDF here
  // For this example, we'll just return a placeholder response

  return new NextResponse(
    `<html>
      <head>
        <title>Proposal ${params.id} PDF View</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
          .logo { font-size: 24px; font-weight: bold; }
          .proposal-info { margin-bottom: 30px; }
          .section { margin-bottom: 30px; }
          h1 { color: #2563eb; }
          h2 { color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-top: 30px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f8f9fa; }
          .text-right { text-align: right; }
          .total-row { font-weight: bold; }
          .footer { margin-top: 50px; font-size: 12px; color: #666; border-top: 1px solid #e5e7eb; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">BuildPro</div>
          <div>
            <p>Date: September 15, 2023</p>
            <p>Proposal #: ${params.id}</p>
            <p>Valid Until: October 15, 2023</p>
          </div>
        </div>
        
        <div class="proposal-info">
          <div>
            <strong>Prepared For:</strong><br>
            Riverside Development Corp<br>
            123 Main Street<br>
            Metropolis, NY 10001
          </div>
        </div>
        
        <div class="section">
          <h1>Riverside Apartments Development</h1>
          
          <h2>Introduction</h2>
          <p>Thank you for the opportunity to submit this proposal for the Riverside Apartments Development project. BuildPro Construction Management is excited about the possibility of working with Riverside Development Corp on this significant project. With our extensive experience in multi-family residential construction and our commitment to quality and timeliness, we are confident that we can deliver exceptional results that meet your vision and requirements.</p>
          
          <h2>Scope of Work</h2>
          <p>The Riverside Apartments Development project consists of constructing a luxury apartment complex with 120 units across 5 floors, including underground parking, amenity spaces, and landscaped outdoor areas. Our comprehensive construction management services will include:</p>
          <ul>
            <li>Complete site preparation and foundation work</li>
            <li>Structural framing and building envelope construction</li>
            <li>Full mechanical, electrical, and plumbing systems installation</li>
            <li>Interior finishing of all units and common areas</li>
            <li>Exterior hardscaping and landscaping</li>
            <li>Project management, quality control, and safety oversight</li>
            <li>Coordination with all regulatory agencies and inspections</li>
            <li>Comprehensive project documentation and reporting</li>
          </ul>
          
          <h2>Timeline</h2>
          <p>We propose the following timeline for the Riverside Apartments Development project:</p>
          <ul>
            <li><strong>Phase 1 (Months 1-3):</strong> Site preparation, excavation, and foundation work</li>
            <li><strong>Phase 2 (Months 4-9):</strong> Structural framing and building envelope</li>
            <li><strong>Phase 3 (Months 10-18):</strong> MEP systems and interior construction</li>
            <li><strong>Phase 4 (Months 19-22):</strong> Finishing work and exterior improvements</li>
            <li><strong>Phase 5 (Months 23-24):</strong> Final inspections, commissioning, and project closeout</li>
          </ul>
          <p>Total project duration: 24 months from notice to proceed</p>
          
          <h2>Methodology</h2>
          <p>Our approach to the Riverside Apartments Development will incorporate the following key methodologies:</p>
          <ul>
            <li><strong>Integrated Project Delivery:</strong> Collaborative approach with all stakeholders</li>
            <li><strong>BIM (Building Information Modeling):</strong> For coordination and clash detection</li>
            <li><strong>Lean Construction Principles:</strong> To minimize waste and maximize efficiency</li>
            <li><strong>Quality Management System:</strong> Rigorous quality control at every stage</li>
            <li><strong>Safety-First Culture:</strong> Comprehensive safety program exceeding OSHA requirements</li>
            <li><strong>Sustainable Building Practices:</strong> Targeting LEED Silver certification</li>
          </ul>
        </div>
        
        <h2>Pricing</h2>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th class="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Site Preparation and Foundation</td>
              <td class="text-right">$450,000</td>
            </tr>
            <tr>
              <td>Structural Framing and Building Envelope</td>
              <td class="text-right">$875,000</td>
            </tr>
            <tr>
              <td>Mechanical, Electrical, and Plumbing Systems</td>
              <td class="text-right">$625,000</td>
            </tr>
            <tr>
              <td>Interior Construction and Finishes</td>
              <td class="text-right">$350,000</td>
            </tr>
            <tr>
              <td>Exterior Improvements and Landscaping</td>
              <td class="text-right">$150,000</td>
            </tr>
            <tr class="total-row">
              <td class="text-right">Total Project Cost:</td>
              <td class="text-right">$2,450,000</td>
            </tr>
          </tbody>
        </table>
        
        <div class="section">
          <h2>Terms and Conditions</h2>
          <ol>
            <li>This proposal is valid for 30 days from the date of issue.</li>
            <li>Payment terms: 30% upon contract signing, 30% at project midpoint, 30% upon substantial completion, 10% upon final completion.</li>
            <li>Any changes to the scope of work may result in price adjustments.</li>
            <li>The timeline provided is an estimate and may be subject to change based on unforeseen circumstances, weather conditions, or client-requested modifications.</li>
            <li>All materials and workmanship are guaranteed for a period of one year from the date of completion.</li>
            <li>BuildPro will maintain all necessary insurance coverage as required by law and the contract.</li>
          </ol>
        </div>
        
        <div class="section">
          <h2>Next Steps</h2>
          <p>To proceed with this proposal, please sign below and return a copy to our office. Upon receipt, we will prepare a detailed contract for your review. We are available to discuss any questions or concerns you may have about this proposal.</p>
          
          <p>We look forward to the opportunity to work with Riverside Development Corp on this exciting project.</p>
          
          <div style="margin-top: 40px;">
            <p><strong>Accepted by:</strong> ________________________</p>
            <p><strong>Date:</strong> ________________________</p>
          </div>
        </div>
        
        <div class="footer">
          <p>BuildPro Construction Management | 456 Business Ave, Metropolis, NY 10001 | (555) 123-4567 | proposals@buildpro.com</p>
        </div>
      </body>
    </html>`,
    {
      headers: {
        "Content-Type": "text/html",
      },
    },
  )
}

