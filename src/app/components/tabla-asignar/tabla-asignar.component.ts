import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { BoxTabla } from 'src/app/interfaces/box.interface';
import { UsuarioService } from '../../services/usuario.service';
import { BoxService } from '../../services/box.service';
import { ActivatedRoute } from '@angular/router';

const BOX: BoxTabla[] = [
  {
    nro_box: 0,
    zona: 'No aplica',
    uso: 'No aplica',
    habilitado: 0,
  },
];

@Component({
  selector: 'app-tabla-asignar',
  templateUrl: './tabla-asignar.component.html',
  styleUrls: ['./tabla-asignar.component.css'],
})
export class TablaAsignarComponent implements OnInit {
  @Input() boxes: any[] = BOX;
  usuarios: any[] = [];
  fechaFormateada!: string;
  fecha: any = this.route.snapshot.params['fecha'];

  formularioActualizarBox: FormGroup = this.fb.group({
    id_box: [],
    nro_box: [],
    zona: [],
    manana: [],
    tarde: [],
  });

  page = 1;
  pageSize = 4;
  collectionSize = this.boxes.length;

  closeResult = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private usuarioService: UsuarioService,
    private boxService: BoxService
  ) {
    this.refreshBoxes();
    this.usuarioService.obtenerUsuarios().subscribe((resp) => {
      this.usuarios = resp;
    });
  }

  refreshBoxes() {
    this.boxes = this.boxes
      .map((boxes, i) => ({
        id: i + 1,
        ...boxes,
      }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  open(content: any, idBox: any) {
    const boxSeleccionado = this.boxes.find(
      (x) => x.id_box === parseInt(idBox)
    );
    this.formularioActualizarBox.setValue(boxSeleccionado);

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
      this.formularioActualizarBox.controls[campo].errors &&
      this.formularioActualizarBox.controls[campo].touched
    );
  }

  actualizarBox() {
    const asignacionActualizada: any = this.formularioActualizarBox.value;
    this.boxService
      .actualizarAsignacion(asignacionActualizada, this.fecha)
      .subscribe((valido) => {
        if (valido) {
          this.boxService
            .obtenerAsignacionBoxes(this.fecha)
            .subscribe((resp) => {
              this.boxes = resp;
            });
        }
      });

    /**Reiniviar formulario y valores */
    this.formularioActualizarBox.reset();
    this.formularioActualizarBox.setValue({
      id_box: '',
      nro_box: '',
      manana: '',
      tarde: '',
      zona: '',
    });

    /**Cierra el modal */
    this.modalService.dismissAll();
  }

  ngOnInit(): void {}
}
