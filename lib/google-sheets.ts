import axios from 'axios';

const SHEET_ID = '1mlI_-rUxWRY44GhtK73SVXfFrUvvB6nF8lKomlIcMo8';
const SHEET_NAME = 'Sheet1';

interface Product {
  id: number;
  name: string;
  description: string;
  otherAttributes: string;
}

export async function getProducts(): Promise<Product[]> {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

  try {
    const response = await axios.get(url);
    const data = JSON.parse(response.data.substr(47).slice(0, -2));
    
    if (!data || !data.table || !data.table.rows) {
      console.error('Unexpected API response structure:', data);
      return [];
    }

    // Skip the first row (header) and map the rest
    return data.table.rows.slice(1).map((row: any, index: number): Product => {
      return {
        id: index + 1,
        name: row.c[0]?.v || 'No Name',
        description: row.c[1]?.v || 'No Description',
        otherAttributes: row.c[2]?.v || 'N/A'
      };
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}