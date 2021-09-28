import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { IPage, newPage, totalPages } from '../shared/page.models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  collapsedFilter: boolean = false;
  page!: IPage;

 

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    
  ) { }

  ngOnInit(): void {
  }

}
