export const categories = [
  { name: 'Advanced Building Blocks', sheet: 'Sheet1' },
  { name: 'Isotope labeled compounds', sheet: 'Sheet2' },
  { name: 'PEGs and PEG Linkers', sheet: 'Sheet3' },
  { name: 'Cy5', sheet: 'Sheet4' },
] as const

export type CategoryName = typeof categories[number]['name']

// Helper function to get sheet name from category name
export function getSheetName(categoryName: string) {
  return categories.find(cat => cat.name === categoryName)?.sheet
}

// Helper function to validate category name
export function isValidCategory(categoryName: string): categoryName is CategoryName {
  return categories.some(cat => cat.name === categoryName)
} 