import React, { Component, ComponentProps, CSSProperties, ReactNode, useState } from "react";




interface SceneProps {
  FrontLayer: any;
  Content: any;
  BackLayer: any;
  style?: CSSProperties;
  className?: string;
  height?: number|string;
  width?: number | string;
  children?: ReactNode;
}
class Scene extends Component<SceneProps>{
  constructor(props: SceneProps) {
    super(props)
  }
  // 事件通知程序 一般被父scene调用
  //需要被覆盖
  OnResize(hw:[string,string]) {
    
  }
  // 父scene 如果父级不是scene则null
  private parent:Scene=null;
  public set Parent(value) {
    this.parent = value;
  }
  public get Parent() {
    return this.parent;
  }

  public get ChildrenScenes():Scene[] {
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
      (props.height==undefined?"100%":typeof props.height == "string" ? props.height : `${props.height}px`),
      (props.width==undefined?"100%":typeof props.width == "string" ? props.width : `${props.width}px`)
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
      <div style={Object.assign(props.style ?? {},gcss)} className={props.className}>
          <div style={{...gcss,position:"relative"}}>
            {backLayer}
            {content}
            {frontLayer}
          </div>
      </div>
      
    )
  }
}

// Child组件 放在ChildContext中 用于包装内部元素
function Child(props:{children:JSX.Element}) {
  
}
//   自动赋值 把其中的
function ChildContext(props: {packComponent:JSX.Element, children?: JSX.Element[] }) {
  const { children } = props;
  if (children != null) {
    // 这里过滤出一组 Child组件实例，获取其中的name字段 然后把它们的直接子元素设为 packComponent的props中的对应字段的值

  }
}
import ReactDOM from "react-dom"
import { JsxEmit } from "typescript";
const ttt = {
  height: "100%",
  width: "100%"
}
ReactDOM.render(<Scene height={400} width={400} BackLayer={<div style={{background:"red",...ttt}}></div>} Content={<div>打发斯蒂芬</div>} FrontLayer={<div style={{...ttt,background:"rgba(0,0,0,0.2)"}}></div>} />, document.getElementsByTagName("body")[0])