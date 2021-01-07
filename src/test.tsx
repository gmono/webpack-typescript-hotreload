import React, { ReactElement } from "react";
import ReactDOM from "react-dom"
import { isThisTypeNode, JsxEmit } from "typescript";
import { ChildContext, Child } from ".";
import { Content, Window, Scene, BackLayer, FrontLayer } from "./Scene";
function PPP(props: { a?: ReactElement, b?: ReactElement }) {
  return <div>
    first:
    <div>{props.a}</div>
    second:
    <div>{props.b}</div>
  </div>
}

const t = (
  <ChildContext packComponent={
    <Scene height={400} width={400} FrontLayer={<div></div>} BackLayer={<div></div>} Content={<div></div>}></Scene>
  }>
    <Child name="Content">
      <div style={{background:"rgba(100,0,100,0.2)"}}>hello world</div>
    </Child>
    <Child name="BackLayer">
      <div style={{height:"100%",width:"100%",background:"green"}}>
        测试
      </div>
    </Child>
  </ChildContext>
)

const tt = (
  <Window height={400} width={400}>
    <BackLayer>
      <div style={{ height: "100%", width: "100%",background:"green"}}></div>
    </BackLayer>
    <Content>
      <div>fafasdfas</div>
    </Content>
    <FrontLayer>
      <div style={{height: "100%", width: "100%",background:"rgba(0,0,100,0.5)"}}></div>
    </FrontLayer>
  </Window>
)

// ReactDOM.render(<Scene height={400} width={400} BackLayer={<div style={{ background: "red", ...ttt }}></div>} Content={<div>打发斯蒂芬</div>} FrontLayer={<div style={{ ...ttt, background: "rgba(0,0,0,0.2)" }}></div>} />, document.getElementsByTagName("body")[0])
ReactDOM.render(tt, document.getElementsByTagName("main")[0])