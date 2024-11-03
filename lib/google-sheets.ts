import axios from 'axios';
import { Product } from '@/lib/types'

const SHEET_ID = '1mlI_-rUxWRY44GhtK73SVXfFrUvvB6nF8lKomlIcMo8';
const SHEET_NAME = 'Sheet1';

export async function getProducts(sheetName: string = SHEET_NAME): Promise<Product[]> {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

  try {
    const response = await axios.get(url);
    const data = JSON.parse(response.data.substr(47).slice(0, -2));
    
    if (!data || !data.table || !data.table.rows) {
      console.error('Unexpected API response structure:', data);
      return [];
    }

    // Skip the first row (header) and map the rest
    return data.table.rows.slice(1).map((row: SheetRow, index: number): Product => {
      // console.log(row);
      return {
        id: index + 1,
        name: row.c[0]?.v || 'No Name',
        cas: row.c[1]?.v || 'No cas',
        catalog: row.c[2]?.v || 'N/A',
        category: 'N/A'
      };
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

type Cell = {
  v: string | null;
};

type SheetRow = {
  c: Cell[];
};

