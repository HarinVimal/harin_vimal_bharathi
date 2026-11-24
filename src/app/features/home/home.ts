import { ChangeDetectionStrategy, Component } from '@angular/core';
import { About } from '../about/about';
import { Certifications } from '../certifications/certifications';
import { Contact } from '../contact/contact';
import { Experience } from '../experience/experience';
import { Projects } from '../projects/projects';
import { Resume } from '../resume/resume';
import { Technologies } from '../technologies/technologies';
import { HeroSection } from './hero-section/hero-section';

@Component({
  selector: 'app-home',
  imports: [
    HeroSection,
    About,
    Technologies,
    Experience,
    Projects,
    Certifications,
    Resume,
    Contact,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
