import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  productForm: FormGroup;
  display: boolean = true;
  displaylist: boolean = true;
  search = '';

  productList: Products[] = [];

  displayColumns = ['pName', 'pImage', 'pQuantity', 'pPrice'];

  constructor(private fb: FormBuilder, private snackbar: MatSnackBar) {
    this.productForm = this.fb.group({
      productname: ['', Validators.required],
      image: ['',Validators.required],
      quantity: ['',Validators.required],
      price: ['',Validators.required]
    });
  }

  onSubmit() {
    const formValues = this.productForm.value;
    const newProduct: Products = {
      pName: formValues.productname,
      pImage: formValues.image,
      pQuantity: formValues.quantity,
      pPrice: formValues.price,
    };

    this.productList = [...this.productList,newProduct]
    console.log(newProduct)
    this.productForm.reset();
    this.snackbar.open('Product Added Successfully', 'Close', { duration: 2000 });
  }

  onclick() {
    this.display = !this.display;
  }

  onclicklist() {
    this.displaylist = !this.displaylist;
  }
}

export class Products {
  pName: string = "";
  pImage: string = "";
  pQuantity: string = "";
  pPrice: string = "";
}
