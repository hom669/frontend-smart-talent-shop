import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TranslateApiService {

  constructor() { }

  private myMemoryUrl = 'https://api.mymemory.translated.net/get';

  async translateToSpanish(text: string): Promise<string> {
    const params = {
      q: text,
      langpair: 'en|ES',
    };

    try {
      const response = await axios.post(this.myMemoryUrl, params); // Hacer la solicitud de traducción
      return response.data.translatedText; // Extraer el texto traducido
    } catch (error) {
      console.error('Error during translation:', error);
      throw error;
    }
  }
}
