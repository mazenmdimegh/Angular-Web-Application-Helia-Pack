import { Component, OnInit, ViewChild } from '@angular/core';
import { CsvserviceService } from '../services/csvservice.service';
import { AlertsService } from '../services/alerts.service';


@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.css']
})
export class CsvComponent {
  private rows :any[]= [];
  private arrl:number=1;
  constructor(private Csvservice:CsvserviceService,private toastr: AlertsService) { }
   @ViewChild('filImportInput',{static:false})fileImportInput:any;

    save:any;
   //array varibales to store csv data
   lines :any[]= []; //for headings
   linesR :any[]= []; // for rows
   //File upload function
   changeListener(e: Event){
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;
    
    
     if(files && files.length > 0) {
       
        let file : File = files[0] as File; 
        
         // console.log(file.name);
         // console.log(file.size);
         // console.log(file.type);
          //File reader method
          let reader: FileReader = new FileReader();
          reader.readAsText(file);
       this.toastr.showSuccess('Success', 'Csv Saved successfuly');

          reader.onload = (e) => {
           let csv: any = reader.result;
           let allTextLines = [];
           csv=csv.replace(/\r\n/g,"?");
           allTextLines = csv.split( "?");
            
          //Table Headings
           let headers = allTextLines[0].split(';');
           let data = headers;
           let tarr :any[]= [];
            
           for (let j = 0; j < headers.length; j++) {
             
             tarr.push(data[j]);
           }
           //Pusd headings to array variable
           this.lines.push(tarr);
           
           
          
           // Table Rows
           let tarrR :any[]= [];
           
           this.arrl = allTextLines.length;
           
           for(let i = 1; i < this.arrl; i++){
           this.rows.push(allTextLines[i].split(';'));
            
           }
           
           for (let j = 0; j < this.arrl; j++) {
              if(this.rows[j]!=""){
               tarrR.push(this.rows[j]);
              }
           }tarrR.pop();
          //Push rows to array variable
           this.linesR.push(tarrR);
           console.log(this.linesR);
           for (let j = 0; j < this.arrl; j++) {
            
            
            this.save={name:this.rows[j][0],first_name:this.rows[j][1],last_name:this.rows[j][2],age:this.rows[j][3]};
           
           if(this.save["age"]!=undefined && this.save["name"]!=undefined && this.save["first_name"]!=undefined && this.save["last_name"]!=undefined ){
            
            this.Csvservice.SaveCsv(this.save)
            .subscribe(data=>{
              
            },err=>{
              console.log(err);
        
            })
            
           }}
       }
     }
   }
}
