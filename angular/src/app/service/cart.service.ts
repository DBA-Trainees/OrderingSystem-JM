import { Injectable } from '@angular/core';
import {
  CartDto,
  CartServiceProxy,
  CreateCartDto,
  CustomerServiceProxy,
  FoodDto,
  FoodDtoPagedResultDto,
  FoodServiceProxy,
  OrderServiceProxy,
} from "@shared/service-proxies/service-proxies";

@Injectable({
  providedIn: 'root'
})
export class CartService {
items : FoodDto[] = []

addToCart(food: FoodDto){
  this.items.push(food);
}

getItems(){
  return this.items;
}

clearCart(){
  this.items = [];
  return this.items;
}

  constructor() { }
}
