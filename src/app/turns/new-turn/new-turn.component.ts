import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TurnSummaryComponent } from './components/turn-summary/turn-summary.component';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-turn',
  standalone: true,
  imports: [RouterOutlet, TurnSummaryComponent, ButtonModule,CommonModule],
  templateUrl: './new-turn.component.html',
  styleUrl: './new-turn.component.css'
})
export class NewTurnComponent {

}
