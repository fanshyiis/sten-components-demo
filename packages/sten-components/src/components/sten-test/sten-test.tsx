import { Component, Host, h, State, Method } from '@stencil/core';

@Component({
  tag: 'sten-test',
})
export class StenTest {

  @State() num = 0;

  @Method()
  async add() {
    console.log('first')
     this.num++;
  }

  connectedCallback() {
    this.add = this.add.bind(this);
  }

  render() {
    return (
      <Host>
        <div id="num_container">{this.num}</div>
        <button id="add" onClick={this.add}>增加</button>
        <button id="reduce" onClick={() => this.num--}>减少</button>
        <button id="reset" onClick={() => this.num = 0}>重置</button>
        <slot></slot>
      </Host>
    );
  }
}
