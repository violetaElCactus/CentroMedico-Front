import { Component, OnInit, Input } from '@angular/core';
import { AreasService } from '../../../services/areas.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Swal from 'sweetalert2';
import { first } from 'rxjs/operators';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-est-mensual',
  templateUrl: './est-mensual.component.html',
  styleUrls: ['./est-mensual.component.css']
})
export class EstMensualComponent implements OnInit {
  mes: string;
  dias: any;
  año: any;
  mess: any;
  mesNombre: any;
  areas!: any;
  arrAreas!: any;
  ar!: any;
  largo!: any;
  @Input() mesSelect!: string;
  @Input() anioSelect!:string;
  AreaMedica: Array<any> = [
    { nombre: 'Nutrición y dietética'},
    { nombre: 'Medicina General'},
    { nombre: 'Cardiología'},
    { nombre: 'Diabetología'},
    { nombre: 'Psiquiatría'},
    { nombre: 'Pediatría'},
    { nombre: 'Otorrinolaringología'},
    { nombre: 'Cirugía'},
    { nombre: 'Traumatología'},
    { nombre: 'Kinesiología'},
    { nombre: 'Ginecología y obstetricia'}, 
    { nombre: 'Neurología'},  
    { nombre: 'Enfermería'},
    { nombre: 'Técnico enfermería'},
    { nombre: 'Matronería'},
    { nombre: 'Pesquisa de PA'},
    { nombre: 'Electrocardiograma'},
    { nombre: 'Ecografía'},
    { nombre: 'Tecnología médica'},
    { nombre: 'Radiología'},
  ];

  constructor(
    private areaService: AreasService
  ) {}

  ngOnInit(): void {   
  }
  calcularMes(mes){
    let meses = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
    let m = parseInt(mes);
    this.mesNombre = meses[m-1];
  }
  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = () => {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL('image/jpg');

        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  }
  async createPdf() {
    if(this.mesSelect === '' || this.anioSelect === '')
    {
      Swal.fire('Error', 'Selecciona mes y año','error');
      return 1;
    }
    let fecha = this.anioSelect + '-' + this.mesSelect + '-01';
    this.areaService.obtenerAreas(fecha).subscribe(async (resp) => {
    this.arrAreas = resp;
    this.mes = this.mesSelect;
    this.año = this.anioSelect;
    this.calcularMes(this.mes);
    //definir la cantidad de columnas según los meses del mes a mostrar
    let meses31 = ['01','03','05','07','08','10','12'];
    if(meses31.includes(this.mes)){
      this.dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    }
    else if(this.mes == '02'){
      if((this.año - 2020) % 4 == 0){
        this.dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
      }
      else{
        this.dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
      }
    }
    else{
      this.dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    }

    var cabecera = [];
    cabecera.push({ text: 'PRESTACIONES/FECHA', style: 'normal'});
    
    for(var key in this.dias){
      cabecera.push({ text: this.dias[key], style: 'normal'});
    }
    cabecera.push({ text: 'TOTAL', style: 'normal'});
    
   
    var cuerpoMaster = [];
    var totalTotal = 0;
    for (var wey in this.AreaMedica){
      var cuerpo = [];
      var total = 0;
      cuerpo.push({ text: this.AreaMedica[wey].nombre, style: 'normal'});
      var index = this.arrAreas.map(function(o) { return o.especialidad; }).indexOf(this.AreaMedica[wey].nombre);
      if(index ==-1){
        for(var key in this.dias){
          cuerpo.push({ text: '0', style: 'peque'});
        }
      }
      else{
        for(var key in this.dias){
          var dia= this.año + '-' + this.mes + '-' + key;
          if((this.arrAreas[index].especialidad == this.AreaMedica[wey].nombre) && dia == this.arrAreas[index].fecha)
          {
            cuerpo.push({ text: this.arrAreas[index].atendidas, style: 'normal'});
            total = total + parseInt(this.arrAreas[index].atendidas);
            if(this.arrAreas.length-1>index){
              index ++;
            }
          }
          else{
            cuerpo.push({ text: '0', style: 'peque'});
          }  
        }
      }
      totalTotal = totalTotal + total;
      cuerpo.push({ text: total, style: 'normal'});
      cuerpoMaster.push(cuerpo);
    }
    const pdfDefinition: any = {
      pageMargins: [40,20,40,55],
        pageOrientation: 'landscape',
        content: [
          {
            table: {
            
              widths: [ 100,'*',100],
              body: [
                [
                  {
                    image: await this.getBase64ImageFromURL("/assets/images/logo-uta-impresion.jpg"),
                    fit: [80, 80]
                  },
                  {
                    //cabecera
                    stack: ['\n',
                      {text:'CENTRO MÉDICO Y PROCEDIMIENTOS ECOGRÁFICOS'},
                      {text:'Escuela de Medicina - Universidad de Tarapacá.', style:'subheader'},
                      {text: 'Av. 18 de Septiembre #2222. Arica, Chile.', style:'subheader'}
                    ],
                    style: 'header'
                  },
                  {
                    image: await this.getBase64ImageFromURL("/assets/images/logo-cmed.jpg"),
                    fit: [80, 80]
                  },
                ]
              ]
              
            },  
            layout: 'noBorders'   
          },
          { 
            text:'\nESTADÍSTICAS DE ATENCIÓN MES DE ' + this.mesNombre + ' DEL '+ this.año +'\n\n',alignment: 'center'
          },  
          {
            table: {
              alignment: 'center',
              body: [cabecera,cuerpoMaster[0],cuerpoMaster[1],cuerpoMaster[2],cuerpoMaster[3],cuerpoMaster[4],
              cuerpoMaster[5],cuerpoMaster[6],cuerpoMaster[7],cuerpoMaster[8],cuerpoMaster[9],cuerpoMaster[10],
              cuerpoMaster[11],cuerpoMaster[12],cuerpoMaster[13],cuerpoMaster[14],cuerpoMaster[15],
              cuerpoMaster[16],cuerpoMaster[17],cuerpoMaster[18],cuerpoMaster[19]]
            }
          },
          {
            table: {
              alignment: 'center',
              widths: [688,30],
              body: [ [{text:'Total de prestaciones', style:'derecha'},{text: totalTotal, style:'subheader'}]]
            }
          }
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
            normal: {
              fontSize: 10,
              alignment: 'center',
            },
            peque: {
              fontSize: 8,
              alignment: 'center',
            }
          },
    }
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
    
  });
  return console.log('ou yes');
  }
}
