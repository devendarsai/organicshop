import { Injectable } from '@angular/core';
import { Database, getDatabase, push, ref, set } from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private db: Database;
  constructor() {
    this.db = getDatabase();
  }
  create(product: any) {
    console.log('product', product);
    set(push(ref(this.db, 'products/')), product);
  }
  getAll() {
    const productsRef = ref(this.db, '/products');
  }
}
