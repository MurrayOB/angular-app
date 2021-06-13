import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  time: any; 
  items = ['591 Grand Avenue, San Marcos, CA, 92069', '021 453 46353']; 

  // Format YYYY-mm-dd HH:mm:ss
  constructor(public datepipe: DatePipe) { 
    setInterval(() => {
      this.time = this.datepipe.transform(new Date(), 'YYYY-mm-dd HH:mm:ss');
     }, 1000);
  }

  ngOnInit(): void {
  }


  
  
  
    
  
  
}
