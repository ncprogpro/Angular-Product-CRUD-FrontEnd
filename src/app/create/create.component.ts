import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  name = '';
  desc = '';
  price = '';
  invalidFields: any = [];
  errorMsg = '';
  successMsg = '';
  formattedPrice = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  create() {
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

    this.productService.confirmName(this.name)
      .subscribe(
        response => {
          console.log(response);
          let resData: any;
          resData = response;

          console.log("resData.isExist = ", resData.isExist)

          if( !resData.isExist ) {

            const data = {
              name: this.name,
              description: this.desc,
              price: this.price
            };
        
            this.productService.create(data)
              .subscribe(
                response => {
                  console.log(response);

                  this.successMsg = "Product was added successfully!";
                },
                error => {
                  console.log(error);
                });
          } else {
            this.errorMsg = "Prodcut name is already exist";
          }
          
        },
        error => {
          console.log(error);
        });


    
  }

  priceInput(event: any) {
    let value = event.target.value;
    this.formattedPrice = this.formatPriceWith2Decimal(value)
    event.target.value = this.formattedPrice;
  }

  formatPriceWith2Decimal(value: any) {
    if (!value) return value;
    const pattern = /^[0-9]+(\.[0-9]{1,2})?$/;

    if( pattern.test(value) ) {
      return value;
    } else {
      const rounded = Math.round(value * 100) / 100;

      return rounded;
    }

  }

}
