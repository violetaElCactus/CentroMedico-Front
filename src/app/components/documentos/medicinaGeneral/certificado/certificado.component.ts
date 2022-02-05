import { Component, Input, OnInit } from '@angular/core';
import { calcularEdad } from 'src/app/utils/calcularEdad';
import { PacienteService } from '../../../../services/paciente.service';

import { format } from 'rut.js';

/**Importar las librerías de pdfMake */
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { UsuarioService } from '../../../../services/usuario.service';
import { generarLineasFirma } from '../../../../utils/generarLineas';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css'],
})
export class CertificadoComponent implements OnInit {
  @Input() certificado!: any;
  paciente!: any;
  usuario!: any;
  lineasFirma!: string;
  nombreProfesional!: string;

  constructor(
    private pacienteService: PacienteService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.pacienteService
      .obtenerPacientePorRut(this.certificado.id_paciente)
      .subscribe((resp) => {
        this.paciente = resp;
        this.paciente.rut = format(resp.rut);
        this.paciente.edad = calcularEdad(resp.fecha_nacimiento);
      });

    this.usuarioService
      .obtenerUsuarioPorRut(this.certificado.id_doctor)
      .subscribe((resp) => {
        this.usuario = resp;
        if (resp.sexo === 'hombre') {
          this.nombreProfesional = `Dr. ${resp.nombre} ${resp.apellido}`;
        } else {
          this.nombreProfesional = `Dra. ${resp.nombre} ${resp.apellido}`;
        }
        this.lineasFirma = generarLineasFirma(this.nombreProfesional);
      });
  }

  createPdf() {
    const pdfDefinition: any = {
      //prettier-ignore
      content: [
       
        { 
          //cabecera
          stack: [
            'CENTRO MÉDICO Y PROCEDIMIENTOS ECOGRÁFICOS',
            {text:'Escuela de Medicina - Universidad de Tarapacá.', style:'subheader'},
            {text: 'Av. 18 de Septiembre #2222. Arica, Chile.', style:'subheader'}
          ],
          style: 'header'
        },
        {
          text: 'Fecha: '+ this.certificado.fecha, style: ['derecha','espacio_30']
        },
        {
         //Info paciente
          table: {
            headerRows: 1,
            widths: [ '*'], heights:['auto'],
    
            body: [
              [
                {
                border: [true, true, true, true],
                 text: 'IDENTIFICACIÓN DEL PACIENTE\n\n\nNombre del paciente: ' + this.paciente.nombre + ' ' + this.paciente.apellido 
                 + '\n\nR.U.N: ' +this.paciente.rut
                 + '                           Fecha de nacimiento: ' + this.paciente.fecha_nacimiento
                 + '               Edad: ' + this.paciente.edad, style: 'negrita'

                }
              ],   
            ]
          }
        },
        {
          text: '\n'
        },
        {
          //Motivo Certificado
          table: {
            widths: ['*'],heights:['auto'],

            headerRows: 1,
            body: [
              [
                {
                 border: [true, true, true, true],
                 text: this.certificado.titulo
                 + '\n\nMotivo: ' + this.certificado.contenido 
                 , style: 'negrita'
                }
              ],   
            ]
          }
        },
        {
          text: '\n'
        },
        {
          //pie
          table: {
            widths: ['*','*'],
            
            body: [
              [{text:'', style: 'pie'},
              {text: '\n\n'+this.lineasFirma+'\n'+this.nombreProfesional
              + '\nRut: ' + this.usuario.rut, style: 'pie'}]
            ]
          },
          layout: 'noBorders'
        },     
        {
          type: 'none',
          ul: [

          ]
        },
      ],
      styles: {
        header: {
          fontSize: 13,
          bold: true,
          alignment: 'center',
        },
        subheader: {
          fontSize: 11,
          bold: false,
        },
        superMargin: {
          fontSize: 12,
          bold: false,
        },
        derecha: {
          alignment: 'right',
        },
        espacio: {
          margin: [0, 30, 0, 0],
        },
        negrita: {
          bold: true,
          fontSize: 10,
        },
        pie: {
          bold: true,
          fontSize: 12,
          alignment: 'center',
        },
      },
    };

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }
}
