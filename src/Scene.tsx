import React, { CSSProperties, ReactNode, Component, ReactElement, PureComponent } from "react";
import { Child, ChildContext } from "./ChildContext";

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

function LayerFac(name:string) {
  return class extends PureComponent<{ children: ReactElement }>{
    public constructor(props) {
      super(props)
    }
    get Name() {
      return name;
    }
    // 这个函数只是用来获取element的
    render() {
      return <Child key={name} name={ name}>{ this.props.children}</Child>
    }
  }
}
function ensureList<T>(objorarr: T | T[]) {
  if (objorarr instanceof Array) return objorarr;
  return [objorarr];
}
type RTType = ReturnType<typeof LayerFac>;
type RTTypeEle = ReactElement<any, RTType>;
export const BackLayer = LayerFac("BackLayer");
export const FrontLayer = LayerFac("FrontLayer");
export const Content = LayerFac("Content");
export function Window(props: { height?: number | string; width?: number | string;children:RTTypeEle[]|RTTypeEle}) {
  return (
    <ChildContext packComponent={<Scene height={props.height} width={props.width} FrontLayer={<div></div> } BackLayer={<div></div> } Content={<div></div> }></Scene>}>
      {ensureList(props.children).map(v=>(new v.type(v.props)).render())}
    </ChildContext>
  )
}