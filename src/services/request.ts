import Axios from 'axios';

import { Book } from '../components/molecules/Book';

export interface Offer {
  type: "percentage" | "minus" | "slice";
  value: number;
  sliceValue: number;
}
interface OffersResponse {
  offers: Offer[];
}

const baseUrl = "http://henri-potier.xebia.fr/books";

export const getBooks = async (): Promise<Book[]> => {
  try {
    const res = await Axios({
      url: baseUrl,
      method: "GET"
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}

export const getBookOffers = async (booksIsbns: string[]): Promise<OffersResponse> => {
  try {
    const res = await Axios({
      url: baseUrl + "/" + booksIsbns.toString() + "/commercialOffers",
      method: "GET"
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}