import { Component, OnInit } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs';

interface MessageSocket {
  gwID: string;
  nodes: [
    {nodeID: string,
      sensors: [{
        name: string,
        type: string,
        value: string}]
    }
  ];
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  gaugeType = 'semi';
  gaugeValue = 28.3;
  gaugeLabel = 'Temperature';
  gaugeAppendText = '°C';

  gaugeType2 = 'full';
  gaugeValue2 = 28.3;
  gaugeLabel2 = 'Humidity';
  gaugeAppendText2 = '%';

  gaugeColor = '#E6CF6F';

  ledColor;
  constructor(private socket: Socket) {

  }

  ngOnInit(): void {
    this.socket.connect();
    this.socket.emit('get-sensor-data');
    this.getMessages().subscribe(message => {
      console.log(message);
      this.gaugeValue = Number(message.nodes.filter(node => node.nodeID === '01')[0]
          .sensors.filter(sens => sens.name === 'temp')[0].value);
      this.gaugeValue2 = Number(message.nodes.filter(node => node.nodeID === '01')[0]
          .sensors.filter(sens => sens.name === 'humidity')[0].value);
      console.log(this.gaugeValue);
    });
  }


  getMessages() {
    const observable = new Observable<MessageSocket>(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  colorChange() {
    console.log(this.ledColor);
    this.socket.emit('led-color-change', {color: this.ledColor});
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }
}
