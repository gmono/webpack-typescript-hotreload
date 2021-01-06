import React, { ComponentProps, CSSProperties, ReactNode } from "react";




interface SceneProps {
  FrontLayer: any;
  Content: any;
  BackLayer: any;
  style: CSSProperties;
  className: string;
}
function Scene(props: SceneProps) {

  let css = {
    position: "absolute",
    top: 0,
    left: 0
  } as CSSProperties;
  
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
    <div style={props.style} className={props.className}>
        <div style={{position:"relative"}}>
          {backLayer}
          {content}
          {frontLayer}
        </div>
    </div>
    
  )
}
import ReactDOM from "react-dom"
ReactDOM.render(<Scene BackLayer={<div>fasdfasdf</div>} Content={<div>打发斯蒂芬</div>} FrontLayer={<div>adfadfas</div>} />, document.getElementsByTagName("body")[0])