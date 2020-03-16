import Axios, { AxiosResponse, Method } from 'axios';

export interface BooksResponse extends AxiosResponse {

}

export default async (): Promise<BooksResponse> => {
    try {
        const res = await Axios({
        });
    
        return res;
      } catch (error) {
        console.error('Request Error', error);
        throw error;
      }
} 