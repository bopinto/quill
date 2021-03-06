import Delta from 'rich-text/lib/delta';
import Parchment from 'parchment';


class Cursor extends Parchment.Leaf {
  constructor(domNode) {
    super(domNode);
    this.domNode.classList.add(Parchment.PREFIX + 'cursor');
    this.textNode = document.createTextNode(Cursor.CONTENTS);
    this.domNode.appendChild(this.textNode);
    this.length = 0;
  }

  format(name, value) {
    if (this.length !== 0) {
      return super.format(name, value);
    }
    let target = this, index = 0;
    this.length = 1;
    while (target != null && !(target instanceof Parchment.Block)) {
      index += target.offset(target.parent);
      target = target.parent;
    }
    if (target != null) {
      target.formatAt(index, 1, name, value);
    }
    this.length = 0;
  }

  getLength() {
    return this.length;
  }

  getValue() {
    return '';
  }
}
Cursor.blotName = 'cursor';
Cursor.tagName = 'span';
Cursor.CONTENTS = "\uFEFF";   // Zero width space


Parchment.register(Cursor);
Parchment.register(Parchment.Inline);   // Workaround from Cursor matching span

export { Cursor as default };
