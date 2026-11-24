import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

@Component({
  selector: 'app-page-layout',
  imports: [Header, RouterOutlet, Footer],
  templateUrl: './page-layout.html',
  styleUrl: './page-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayout {}
