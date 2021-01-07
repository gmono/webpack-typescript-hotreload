import React, { ReactElement, Component } from "react";

export interface ChildProps {
  children: ReactElement<any, any>;
  name: string
}
// Child包装组件 放在ChildContext中 用于包装内部元素
// 本组件本身并不会产生内容
//<child name="first"><div></div></child> 则会被设为上级组件的 first属性里去 
export class Child extends Component<ChildProps>{
  constructor(props) {
    super(props)
  }
  render() {
    return <></>;
  }
}

export interface ChildContextProps<C = ReactElement<ChildProps, typeof Child>> {
  packComponent: ReactElement<any, any>;
  children?: C | C[];
}
/**
 * 用于包装Child组件 并将其中的children和name取出来 
 */
export class ChildContext extends Component<ChildContextProps> {
  constructor(props) {
    super(props);
    const pack = this.props.packComponent;
    const childs =
      this.props.children instanceof Array ?
        (this.props.children as ReactElement<ChildProps, typeof Child>[])
        : [this.props.children];
    let temp = {}
    childs.forEach(v => {
      const name = v.props.name;
      const ele = v.props.children;
      // 设置包装的组件的props
      temp[name] = ele;
    })
    this.NewElement= React.cloneElement(this.props.packComponent,temp);
  }
  private NewElement = null;
  render() {
    // 返回包装的组件
    return this.NewElement;
  }
}

