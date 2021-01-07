import React, { ReactElement } from "react";
import ReactDOM from "react-dom"
import { isThisTypeNode, JsxEmit } from "typescript";
import { ChildContext, Child } from ".";
function PPP(props: { a?: ReactElement, b?: ReactElement }) {
  return <div>
    first:
    <div>{props.a}</div>
    second:
    <div>{props.b}</div>
  </div>
}

const t = (
  <ChildContext packComponent={<PPP></PPP>}>
    <Child name="a">
      <div style={{background:"red"}}>hello world</div>
    </Child>
    <Child name="b">
      <div style={{background:"green"}}>
        测试
      </div>
    </Child>
  </ChildContext>
)


const ttt = {
  height: "100%",
  width: "100%"
}
// ReactDOM.render(<Scene height={400} width={400} BackLayer={<div style={{ background: "red", ...ttt }}></div>} Content={<div>打发斯蒂芬</div>} FrontLayer={<div style={{ ...ttt, background: "rgba(0,0,0,0.2)" }}></div>} />, document.getElementsByTagName("body")[0])
ReactDOM.render(t, document.getElementsByTagName("main")[0])