import React, { Component, ComponentProps, CSSProperties, JSXElementConstructor, ReactElement, ReactNode, useState } from "react";




export interface SceneProps {
  FrontLayer: any;
  Content: any;
  BackLayer: any;
  style?: CSSProperties;
  className?: string;
  height?: number | string;
  width?: number | string;
  children?: ReactNode;
}
export class Scene extends Component<SceneProps>{
  constructor(props: SceneProps) {
    super(props)
  }
  // 事件通知程序 一般被父scene调用
  //需要被覆盖
  OnResize(hw: [string, string]) {

  }
  // 父scene 如果父级不是scene则null
  private parent: Scene = null;
  public set Parent(value) {
    this.parent = value;
  }
  public get Parent() {
    return this.parent;
  }

  public get ChildrenScenes(): Scene[] {
    if (this.props.children == null) return [];
    if (this.props.children instanceof Array) {
      // return this.props.children.filter((v: JSX.Element) => v.type instanceof Scene)
      //                           .map((v: JSX.Element)=>v.type);
      return [];
    }
    return [];
  }
  private oldhw = ["", ""];
  render() {
    const props = this.props;
    const [h, w] = [
      (props.height == undefined ? "100%" : typeof props.height == "string" ? props.height : `${props.height}px`),
      (props.width == undefined ? "100%" : typeof props.width == "string" ? props.width : `${props.width}px`)
    ];
    //大小改变时自动调用 只props改变时调用
    if (this.oldhw[0] != h || this.oldhw[1] != w) {
      this.oldhw = [h, w];
      //通知下级scene大小改变事件
      this.ChildrenScenes.forEach(v => {
        v.Parent = this;
        v.OnResize([h, w]);
      })
    }
    ///
    let gcss = {
      height: h,
      width: w
    }
    let css = {
      position: "absolute",
      top: 0,
      left: 0,
      ...gcss
    } as CSSProperties;

    //大小控制机制 监听onresize 设置大小
    // 如果children中有scene 则会通知其大小改变的事情
    let frontLayer = (
      <div style={{
        pointerEvents: "none",
        ...css
      }}>
        {props.FrontLayer}
      </div>
    )
    let content = (
      <div style={{
        ...css
      }
      }>
        {props.Content}
      </div>
    )
    let backLayer = (
      <div style={{
        pointerEvents: "none",
        ...css
      }}>
        {props.BackLayer}
      </div>
    )
    return (
      <div style={Object.assign(props.style ?? {}, gcss)} className={props.className}>
        <div style={{ ...gcss, position: "relative" }}>
          {backLayer}
          {content}
          {frontLayer}
        </div>
      </div>

    )
  }
}


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

