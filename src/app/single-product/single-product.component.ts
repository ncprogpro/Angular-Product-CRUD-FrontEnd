import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  id = '';
  name = '';
  desc = '';
  price = '';
  invalidFields: any = [];
  errorMsg = '';
  successMsg = '';
  isEdit = false;
  

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const productName = this.route.snapshot.paramMap.get('name');

    this.productService.get(productName)
      .subscribe(
        response => {
          console.log(response);
          let resData: any;
          resData = response;
          this.id = resData._id;
          this.name = resData.name;
          this.desc = resData.description;
          this.price = resData.price;
        },
        error => {
          console.log(error);
        });
  }

  update() {
    this.successMsg = '';
    this.errorMsg = '';
    
    if( !this.name || this.name.length < 3 ) {
      this.invalidFields.push("name");
    } else {
      let index = this.invalidFields.indexOf('name');
      if( index !== -1 )
        this.invalidFields.splice(index, 1);
    }

    if( !this.desc || this.desc.length < 5 ) {
      this.invalidFields.push("desc");
    } else {
      let index = this.invalidFields.indexOf('desc');
      if( index !== -1 )
        this.invalidFields.splice(index, 1);
    }

    if( !this.price || parseFloat(this.price) < 1 ) {
      this.invalidFields.push("price");
    } else {
      let index = this.invalidFields.indexOf('price');
      if( index !== -1 )
        this.invalidFields.splice(index, 1);
    }

    if( this.invalidFields.length != 0 ) {
      return;
    }

    const data = {
      name: this.name,
      description: this.desc,
      price: this.price
    };

    this.productService.update(this.id, data)
      .subscribe(
        response => {
          console.log(response);

          this.successMsg = "Product was updated successfully!";
        },
        error => {
          console.log(error);
        });
    
  }

  delete() {
    this.productService.delete(this.id)
      .subscribe(
        response => {
          console.log(response);
          let resData: any;
          resData = response;
          this.successMsg = resData.message;

          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000)
        },
        error => {
          console.log(error);
        });
  }

}
