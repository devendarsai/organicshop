import { Injectable } from '@angular/core';
import {
  Database,
  getDatabase,
  onValue,
  orderByChild,
  query,
  ref,
} from 'firebase/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private db: Database;
  constructor() {
    this.db = getDatabase();
  }
  // return list of categories
  getCategories(): Observable<any> {
    const categoriesRef = query(
      ref(this.db, '/categories'),
      orderByChild('name')
    );
    return new Observable((observer) => {
      onValue(
        categoriesRef,
        (snapshot) => {
          const categories = snapshot.val();
          console.log('categories', categories);
          //iterate over the categories object and convert it to array
          const categoriesArray = [{ name: '', key: '' }];
          for (const key in categories) {
            if (categories.hasOwnProperty(key)) {
              const category = categories[key];
              category.key = key;
              categoriesArray.push(category);
            }
          }
          observer.next(categoriesArray);
          // observer.next(categories);
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}
