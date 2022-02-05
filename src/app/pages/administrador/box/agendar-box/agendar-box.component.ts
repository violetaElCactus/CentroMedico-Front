import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { BoxService } from 'src/app/services/box.service';
import { formatearFecha } from 'src/app/utils/formatearFecha';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-agendar-box',
  templateUrl: './agendar-box.component.html',
  styleUrls: ['./agendar-box.component.css'],
})
export class AgendarBoxComponent implements OnInit {
  boxesAsignados: any[] = [];
  boxesDisponibles: any[] = [];
  usuarios: any[] = [];

  mensajeCabecera!: string;
  fecha: any = this.route.snapshot.params['fecha'];
  closeResult = '';

  formularioAsignarBox: FormGroup = this.fb.group({
    id_box: ['', [Validators.required]],
    fecha: [this.fecha],
    manana: ['', [Validators.required]],
    tarde: ['', [Validators.required]],
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private boxService: BoxService,
    private usuarioService: UsuarioService
  ) {
    /**Obtiene los boxes disponibles  */
    this.boxService.obtenerAsignacionBoxes(this.fecha).subscribe((resp) => {
      this.boxesAsignados = resp;
      this.boxService.obtenerBoxes().subscribe((resp) => {
        resp.map((item) => {
          if (item.habilitado) {
            let found = this.boxesAsignados.some(
              (elem) => elem.id_box === item.id_lugar
            );
            if (!found) this.boxesDisponibles.push(item);
          }
        });
      });
    });

    /**Obtiene los usuarios para desplegarlo en el modal de asignación*/
    this.usuarioService.obtenerUsuarios().subscribe((resp) => {
      this.usuarios = resp;
    });

    this.mensajeCabecera = formatearFecha(this.fecha);
  }

  ngOnInit(): void {}

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  campoEsValido(campo: string) {
    return (
      this.formularioAsignarBox.controls[campo].errors &&
      this.formularioAsignarBox.controls[campo].touched
    );
  }

  asignarBox() {
    /**Guarda la nueva asignación */
    const nuevaAsignacion: any = this.formularioAsignarBox.value;
    this.boxService
      .asignarBox(nuevaAsignacion, this.fecha)
      .subscribe((valido) => {
        if (valido) {
          this.boxService
            .obtenerAsignacionBoxes(this.fecha)
            .subscribe((resp) => {
              this.boxesAsignados = resp;
            });
        }
      });
    /**Actualiza la tabla de box y el selector */
    this.boxesDisponibles = this.boxesDisponibles.filter(
      (item) => item.id_lugar !== parseInt(nuevaAsignacion.id_box)
    );

    /**Reiniviar formulario y valores */
    this.formularioAsignarBox.reset();
    this.formularioAsignarBox.setValue({
      id_box: '',
      fecha: this.fecha,
      manana: '',
      tarde: '',
    });

    /**Cierra el modal */
    this.modalService.dismissAll();
  }
}
