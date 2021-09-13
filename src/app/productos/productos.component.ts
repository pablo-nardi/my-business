import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DeleteProductoModalComponent } from './delete-productos-modal.component';
import { ProductoService } from './productos.service';
import { IProducto } from './productos.models';
import { FormBuilder } from '@angular/forms';
import { IPage, newPage, totalPages } from '../shared/page.models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductoComponent implements OnInit {
  private ngbModalRef: NgbModalRef | undefined;

  collapsedFilter: boolean = false;
  page!: IPage;

  myForm = this.fb.group({
    descripcion: [null],
    verInactivas: [null],
  });

  rows: IProducto[] = [];
  loading = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productoService: ProductoService,
    private modalService: NgbModal,
    private fb: FormBuilder,
  ) {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams ? data.pagingParams : newPage({ activa: true }, ['descripcion', 'ASC']);
    });
  }

  ngOnInit(): void {
    this.findAll();

    if (this.page.filter.descripcion) {
      this.myForm.get(['descripcion'])!.setValue(this.page.filter.descripcion);
    }
    if (this.page.filter.activa) {
      this.myForm.get(['verInactivas'])!.setValue(false);
    } else {
      this.myForm.get(['verInactivas'])!.setValue(true);
    }
  }

  findAll(): void {
    this.transition();
    this.loading = true;
    this.productoService.findAll({
      ...this.page.filter,
      ...{
        offset: this.page.offset,
        order: this.page.order
      }
    }).subscribe(res => {
      this.rows = res.body.rows;
      this.loading = false;
      this.page.totalElements = res.body.count;
      this.page.totalPages = totalPages(this.page.size, this.page.totalElements);
    }, () => this.loading = false);
  }

  onSort(event: any): void {
    this.page.order = [event.sorts[0].prop, event.sorts[0].dir];
    this.findAll();
  }

  onFilter(): void {
    this.page.filter = {};
    if (this.myForm.get(['descripcion'])!.value) {
      Object.assign(this.page.filter, {
        descripcion: this.myForm.get(['descripcion'])!.value.toLowerCase()
      });
    }
    if (!this.myForm.get(['verInactivas'])!.value) {
      Object.assign(this.page.filter, {
        activa: true
      });
    }

    this.findAll();
  }

  clearFilter(): void {
    this.page.filter = { activa: true };
    this.page = newPage(this.page.filter, this.page.order);
    this.myForm.get(['verInactivas'])!.setValue(false);
    this.myForm.get(['descripcion'])!.setValue('');
    this.findAll();
  }

  setPage(pageInfo: any): void {
    this.page.offset = pageInfo.offset;
    this.findAll();
  }

  delete(id: number): void {
    this.ngbModalRef = this.modalService.open(DeleteProductoModalComponent, { size: 'lg', backdrop: 'static' });
    this.ngbModalRef.componentInstance.id = id;
    this.ngbModalRef.result.then(
      () => {
        this.ngbModalRef = undefined;
        this.findAll();
      },
      () => {
        this.ngbModalRef = undefined;
      }
    );
  }

  transition(): void {
    this.router.navigate(['/productos'], {
      queryParams: {
        page: JSON.stringify(this.page)
      },
      replaceUrl: true
    });
  }
}
