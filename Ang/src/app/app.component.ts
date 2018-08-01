import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public Englishinput = '';
  public Germanoutput = '';
  public Tamiloutput = '';
  public Description = '';
  constructor(public http: Http) {
    http.get('/api/todos').subscribe(result => {
      this.forecasts = result.json() as WeatherForecast[];
      console.log(this.forecasts);
    }, error => console.error(error));
  }

  save() {
    console.log('test');
    this.http.post('/api/todos', { German: this.Germanoutput, English: this.Englishinput, Tamil: this.Tamiloutput, Description: this.Description })

      .subscribe((data) => {
        console.log('test1');
      })
  }


  public forecasts: WeatherForecast[];


}

interface WeatherForecast {
  Description: string;
  German: string;
  English: string;
  Tamil: string;
  Id: number;
}


export class TeamData {
  public Englishinput = '';
  public Germanoutput = '';
}