import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { PacienteService } from '../../services/paciente.service';

import { Paciente } from 'src/app/interfaces/paciente';

@Component({
  selector: 'app-diccionario-pacientes',
  templateUrl: './diccionario-pacientes.component.html',
  styleUrls: ['./diccionario-pacientes.component.css'],
})
export class DiccionarioPacientesComponent {
  pacientes!: Paciente[];
  paciente!: Paciente;
  buscarPaciente!: string;
  closeResult = '';

  constructor(
    private pacienteService: PacienteService,
    private modalService: NgbModal
  ) {
    this.pacienteService.obtenerPacientes().subscribe((resp) => {
      this.pacientes = resp;
    });
  }

  open(content: any, rut: any) {
    const pacienteSeleccionado: any = this.pacientes.find((x) => x.rut === rut);

    this.paciente = { ...pacienteSeleccionado };
    let fecha = pacienteSeleccionado.fecha_nacimiento.slice(0, 10);
    this.paciente.nacimiento = fecha;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
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
}
