import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  products : any = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAll()
      .subscribe(
        response => {
          console.log(response);
          this.products = response;
        },
        error => {
          console.log(error);
        });
  }

}
