import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/brands';
import { IType } from '../shared/models/productType';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    const {
      brandId,
      typeId,
      sort,
      pageNumber,
      pageSize,
      search
    } = shopParams;

    let params = new HttpParams();

    if (brandId !== 0) {
      params = params.append('brandId', brandId.toString());
    }

    if (typeId !== 0) {
      params = params.append('typeId', typeId.toString());
    }

    if (search) {
      params = params.append('search', search);
    }

    params = params.append('sort', sort);
    params = params.append('pageIndex', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<IPagination>(`${this.baseUrl}products`, { observe: 'response', params })
      .pipe(
        map(response => response.body)
      );
  }

  getBrands() {
    return this.http.get<IBrand[]>(`${this.baseUrl}products/brands`);
  }

  getTypes() {
    return this.http.get<IType[]>(`${this.baseUrl}products/types`);
  }

}

