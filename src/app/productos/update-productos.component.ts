import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductoService } from './productos.service';
import { IProducto } from './productos.models';

@Component({
  selector: 'app-update-productos',
  templateUrl: './update-productos.component.html'
})
export class UpdateProductoComponent implements OnInit {
  isSaving = false;

  myForm = this.fb.group({
    id: [],
    descripcion: [null, [Validators.required]],
    stock: [null, [Validators.required, Validators.min(0)]],
    cantidadMinima: [null, [Validators.required, Validators.min(0)]],
    categoriaId: [null, [Validators.required]],
    activa: [null],
  });

  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    if (id) {
      this.productoService.find(parseInt(id)).subscribe(
        (res: HttpResponse<IProducto>) => this.updateForm(res.body!)
      );
    }
  }

  updateForm(producto: IProducto): void {
    this.myForm.patchValue({
      id: producto.id,
      descripcion: producto.descripcion,
      activa: producto.activa,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const producto = this.createFromForm();
    if (producto.id) {
      this.subscribeToSaveResponse(this.productoService.update(producto));
    } else {
      this.subscribeToSaveResponse(this.productoService.create(producto));
    }
  }

  private createFromForm(): IProducto {
    return {
      id: this.myForm.get(['id'])!.value,
      descripcion: this.myForm.get(['descripcion'])!.value,
      stock: this.myForm.get(['stock'])!.value,
      cantidadMinima: this.myForm.get(['cantidadMinima'])!.value,
      categoria: this.myForm.get(['categoriaId'])!.value,
      activa: this.myForm.get(['activa'])!.value,
    };
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IProducto>>): void {
    result.subscribe(
      () => this.previousState(),
      () => this.isSaving = false
    );
  }
}
