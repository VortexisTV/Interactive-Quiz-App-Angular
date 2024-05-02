import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {
  constructor(private route: ActivatedRoute) { }

  score: number = 0;

ngOnInit(): void {
  this.score = Number(this.route.snapshot.queryParamMap.get('score'));
}
}
