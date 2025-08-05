import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverShadow]'
})
export class HoverShadowDirective {

  @Input() appHoverShadow: string=''

  constructor(private element: ElementRef, private renderer:Renderer2 ) { }

  @HostListener('mouseenter') onMouseEnter(){
    this.renderer.setStyle(this.element.nativeElement, 'box-shadow', this.appHoverShadow);
    this.renderer.setStyle(this.element.nativeElement,'transform','scale(1.05)')
    this.renderer.setStyle(this.element.nativeElement, 'transition', 'box-shadow 0.3s ease-in-out')
    this.renderer.setStyle(this.element.nativeElement, 'transition', 'transform 0.3s ease-in-out')
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.renderer.removeStyle(this.element.nativeElement,'box-shadow')
    this.renderer.removeStyle(this.element.nativeElement,'transform')
  }

}
