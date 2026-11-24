import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FOOTER_BRAND, FOOTER_SOCIAL_LINKS } from '../../core/config/footer.config';
import { NAVBAR_ASSETS } from '../../core/config/navigation.config';
import { scrollToSection } from '../../core/utils/scroll.util';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  readonly brand = FOOTER_BRAND;
  readonly logoUrl = NAVBAR_ASSETS.logoSource;
  readonly socialLinks = FOOTER_SOCIAL_LINKS;

  onBrandClick(event: MouseEvent): void {
    event.preventDefault();
    scrollToSection(this.brand.homeSectionId);
  }
}
