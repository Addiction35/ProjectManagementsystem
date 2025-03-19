"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePicker } from "@/components/ui/date-picker"

const formSchema = z.object({
  vendor: z.string().min(2, {
    message: "Vendor name is required.",
  }),
  project: z.string().min(2, {
    message: "Project is required.",
  }),
  deliveryDate: z.date({
    required_error: "Delivery date is required.",
  }),
  shippingAddress: z.string().min(2, {
    message: "Shipping address is required.",
  }),
  billingAddress: z.string().min(2, {
    message: "Billing address is required.",
  }),
  items: z
    .array(
      z.object({
        description: z.string().min(2, {
          message: "Description is required.",
        }),
        quantity: z.coerce.number().min(1, {
          message: "Quantity must be at least 1.",
        }),
        unit: z.string().min(1, {
          message: "Unit is required.",
        }),
        unitPrice: z.coerce.number().min(0.01, {
          message: "Unit price must be greater than 0.",
        }),
      }),
    )
    .min(1, {
      message: "At least one item is required.",
    }),
})

export function PurchaseOrderForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vendor: "",
      project: "",
      shippingAddress: "",
      billingAddress: "",
      items: [{ description: "", quantity: 1, unit: "", unitPrice: 0 }],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // In a real app, you would send this to your API
    alert("Purchase order created successfully!")
  }

  function addItem() {
    const items = form.getValues("items")
    form.setValue("items", [...items, { description: "", quantity: 1, unit: "", unitPrice: 0 }])
  }

  function removeItem(index: number) {
    const items = form.getValues("items")
    if (items.length > 1) {
      form.setValue(
        "items",
        items.filter((_, i) => i !== index),
      )
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="vendor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vendor</FormLabel>
                <FormControl>
                  <Input placeholder="Vendor name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="project"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a project" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="riverside">Riverside Apartments</SelectItem>
                    <SelectItem value="oakwood">Oakwood Office Complex</SelectItem>
                    <SelectItem value="sunset">Sunset Heights Condos</SelectItem>
                    <SelectItem value="greenfield">Greenfield Shopping Mall</SelectItem>
                    <SelectItem value="lakeside">Lakeside Medical Center</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="deliveryDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Delivery Date</FormLabel>
                <DatePicker selected={field.value} onSelect={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-end">
            <Checkbox id="same-address" />
            <label
              htmlFor="same-address"
              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Billing address same as shipping
            </label>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="shippingAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shipping Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter shipping address" className="min-h-[80px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="billingAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billing Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter billing address" className="min-h-[80px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Order Items</h3>
            <Button type="button" variant="outline" size="sm" onClick={addItem}>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>

          {form.getValues("items").map((_, index) => (
            <div key={index} className="grid gap-4 p-4 border rounded-md">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Item {index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(index)}
                  disabled={form.getValues("items").length <= 1}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>

              <FormField
                control={form.control}
                name={`items.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Item description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name={`items.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`items.${index}.unit`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. each, box, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`items.${index}.unitPrice`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit Price ($)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>

        <Tabs defaultValue="preview">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="terms">Terms & Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-4">Purchase Order Preview</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Vendor:</p>
                  <p className="text-sm">{form.getValues("vendor") || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Project:</p>
                  <p className="text-sm">{form.getValues("project") || "Not specified"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Delivery Date:</p>
                  <p className="text-sm">{form.getValues("deliveryDate")?.toLocaleDateString() || "Not specified"}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Items:</p>
                <table className="w-full text-sm">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left py-2">Description</th>
                      <th className="text-right py-2">Quantity</th>
                      <th className="text-right py-2">Unit</th>
                      <th className="text-right py-2">Unit Price</th>
                      <th className="text-right py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.getValues("items").map((item, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-2">{item.description || "Not specified"}</td>
                        <td className="text-right py-2">{item.quantity}</td>
                        <td className="text-right py-2">{item.unit || "N/A"}</td>
                        <td className="text-right py-2">${item.unitPrice.toFixed(2)}</td>
                        <td className="text-right py-2">${(item.quantity * item.unitPrice).toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="font-medium">
                      <td colSpan={4} className="text-right py-2">
                        Subtotal:
                      </td>
                      <td className="text-right py-2">
                        $
                        {form
                          .getValues("items")
                          .reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
                          .toFixed(2)}
                      </td>
                    </tr>
                    <tr className="font-medium">
                      <td colSpan={4} className="text-right py-2">
                        Tax (8.5%):
                      </td>
                      <td className="text-right py-2">
                        $
                        {(
                          form.getValues("items").reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) * 0.085
                        ).toFixed(2)}
                      </td>
                    </tr>
                    <tr className="font-medium">
                      <td colSpan={4} className="text-right py-2">
                        Total:
                      </td>
                      <td className="text-right py-2">
                        $
                        {(
                          form.getValues("items").reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) * 1.085
                        ).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="terms" className="p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-4">Terms & Notes</h3>
            <div className="space-y-4">
              <div>
                <FormLabel>Payment Terms</FormLabel>
                <Select defaultValue="net30">
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="net15">Net 15</SelectItem>
                    <SelectItem value="net30">Net 30</SelectItem>
                    <SelectItem value="net45">Net 45</SelectItem>
                    <SelectItem value="net60">Net 60</SelectItem>
                    <SelectItem value="cod">COD (Cash on Delivery)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <FormLabel>Notes</FormLabel>
                <Textarea
                  className="min-h-[120px]"
                  placeholder="Add any additional notes or instructions for the vendor"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit">Create Purchase Order</Button>
        </div>
      </form>
    </Form>
  )
}

