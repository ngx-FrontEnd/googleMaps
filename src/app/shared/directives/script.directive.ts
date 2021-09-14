import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[script]'
})
export class ScriptDirective {

  @Input('script') param: any;
  constructor() {
    let node = document.createElement('script');
    node.src = this.param;
    node.type = 'text/javascript';
    node.async = true;
    // node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

}
