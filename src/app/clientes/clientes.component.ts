import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { IPage, newPage, totalPages } from '../shared/page.models';
import { ActivatedRoute, Router } from '@angular/router';
import {ClientesService} from './clientes.service';
import {ICliente} from './clientes.models';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  collapsedFilter: boolean = false;
  page!: IPage;
  myForm = this.fb.group({
    nombre:[null]
  });
  rows: ICliente[]=[];
  loading = false;

 

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clientesService: ClientesService,
    private modelService: NgbModal,
    private fb: FormBuilder,
  )
    {
      this.activatedRoute.data.subscribe(data => {
        this.page = data.pagingParams ? data.pagingParams : newPage({activa: true}, ['nombre', 'ASC']);
      });
    }

  ngOnInit(): void {
    this.findAll();

    if (this.page.filter.descripcion){
      this.myForm.get(['nombre'])!.setValue(this.page.filter.descripcion);
    }
  }

  
  findAll():void {
    this.transition();
    this.loading = true;
    this.clientesService.findAll({
      ...this.page.filter,
      ...{
        offset: this.page.offset,
        order: this.page.order
      }
    }).subscribe(res =>{
      this.rows = res.body.rows;
      this.loading = false;
      this.page.totalElements = res.body.count;
      this.page.totalPages = totalPages(this.page.size, this.page.totalElements);
    },() => this.loading = false);

  }
  
  transition():void {
    this.router.navigate(['/clientes'],{
      queryParams:{
        page: JSON.stringify(this.page)
      },
      replaceUrl: true
    });

  }

}
