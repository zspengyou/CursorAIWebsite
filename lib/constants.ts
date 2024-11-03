export const categories_and_sheet = [
  { name: 'Advanced Building Blocks', sheet: 'Sheet1' },
  {name: 'Analytical Chemical Reagents', sheet:'Sheet2'},
  { name: 'Isotope labeled compounds', sheet: 'Sheet3' },
  { name: 'PEGs and PEG Linkers', sheet: 'Sheet4' },
  { name: 'Cy5', sheet: 'Sheet5' },
] as const

export type CategoryName = typeof categories_and_sheet[number]['name']

// Helper function to get sheet name from category name
export function getSheetName(categoryName: string) {
  return categories_and_sheet.find(cat => cat.name === categoryName)?.sheet
}

// Helper function to validate category name
export function isValidCategory(categoryName: string): categoryName is CategoryName {
  return categories_and_sheet.some(cat => cat.name === categoryName)
} 