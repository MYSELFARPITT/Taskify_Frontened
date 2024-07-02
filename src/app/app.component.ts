import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  isEmployeeLoggedIn: boolean = StorageService.isEmployeeLoggedIn();
  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();
  
  constructor(private router: Router, private renderer: Renderer2) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      this.isEmployeeLoggedIn = StorageService.isEmployeeLoggedIn();
      this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    });
  }

  ngAfterViewInit(): void {
    this.dynamicText();
  }

  logout() {
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }

  dynamicText() {
    const texts = [
      "achieve them.",
      "conquer them.",
      "meet them.",
      "fulfill them.",
      "master them."
    ];
    const initialText = "Prioritize your goals and ";
    let textIndex = 0;
    let partIndex = texts[textIndex].length;

    const dynamicElement = document.getElementById('dynamic-text');
    dynamicElement!.innerText = initialText + texts[0];
    const cursorSpan = this.renderer.createElement('span');
    this.renderer.addClass(cursorSpan, 'cursor');
    dynamicElement!.appendChild(cursorSpan);

    setTimeout(() => {
      erase();
    }, 1000);

    const erase = () => {
      if (partIndex >= 0) {
        dynamicElement!.innerText = initialText + texts[textIndex].substring(0, partIndex);
        dynamicElement!.appendChild(cursorSpan);
        partIndex--;
        setTimeout(erase, 50);
      } else {
        textIndex = (textIndex + 1) % texts.length; // Cycle through the texts array
        partIndex = 0;
        setTimeout(type, 500);
      }
    };

    const type = () => {
      if (partIndex < texts[textIndex].length) {
        dynamicElement!.innerText = initialText + texts[textIndex].substring(0, partIndex + 1);
        dynamicElement!.appendChild(cursorSpan);
        partIndex++;
        setTimeout(type, 100);
      } else {
        setTimeout(() => {
          partIndex = texts[textIndex].length;
          setTimeout(erase, 1000);
        }, 1000);
      }
    };
  }
}
