"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Reusable expandable row component for hierarchical data
export function ExpandableRow({
  data,
  level = 0,
  columns,
  expandedField,
  childrenField,
  renderRowActions,
  isExpanded = false,
  maxLevel = 3,
}) {
  const [expanded, setExpanded] = useState(isExpanded)
  const hasChildren = data[childrenField] && data[childrenField].length > 0
  const canExpand = hasChildren && level < maxLevel

  const toggleExpand = (e) => {
    e.stopPropagation()
    setExpanded(!expanded)
  }

  const indentation = level * 24 // 24px per level

  return (
    <>
      <tr
        className={cn("transition-colors hover:bg-muted/50", level > 0 && "bg-muted/20")}
        onClick={canExpand ? toggleExpand : undefined}
        style={{ cursor: canExpand ? "pointer" : "default" }}
      >
        {columns.map((column, index) => {
          // Apply indentation to the first column
          const isFirstColumn = index === 0
          const cellStyle = isFirstColumn ? { paddingLeft: `${indentation + 16}px` } : {}

          return (
            <td key={column.key} className="p-4 align-middle" style={cellStyle}>
              {isFirstColumn && canExpand && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 mr-2 p-0 absolute left-4 ml-1"
                  style={{ marginLeft: `${indentation}px` }}
                  onClick={toggleExpand}
                >
                  {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              )}
              {column.render ? column.render(data, level) : data[column.key]}
            </td>
          )
        })}

        {/* Actions column */}
        {renderRowActions && <td className="p-4 align-middle text-right">{renderRowActions(data, level)}</td>}
      </tr>

      {/* Render children if expanded */}
      {expanded &&
        hasChildren &&
        data[childrenField].map((child, index) => (
          <ExpandableRow
            key={`${child.id || index}-${level + 1}`}
            data={child}
            level={level + 1}
            columns={columns}
            expandedField={expandedField}
            childrenField={childrenField}
            renderRowActions={renderRowActions}
            maxLevel={maxLevel}
          />
        ))}
    </>
  )
}

export function HierarchicalTable({
  data,
  columns,
  expandedField = "expanded",
  childrenField = "children",
  renderRowActions,
  maxLevel = 3,
}) {
  return (
    <div className="rounded-md border">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50">
              {columns.map((column) => (
                <th key={column.key} className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  {column.header}
                </th>
              ))}
              {renderRowActions && (
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {data.map((item, index) => (
              <ExpandableRow
                key={`${item.id || index}-0`}
                data={item}
                columns={columns}
                expandedField={expandedField}
                childrenField={childrenField}
                renderRowActions={renderRowActions}
                isExpanded={item[expandedField]}
                maxLevel={maxLevel}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
