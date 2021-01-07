# 说明
React-Windows
## Scene组件
三层容器组件，前景，内容，背景  
其中
* 前景背景没有鼠标事件
* 内容接受鼠标事件
* 三层都是单一的Element，通过属性指定
* 通过Window组件（对Scene的封装）可编写语义化代码
通过以下方式使用:
```tsx
<Scene 
height={400} 
width={400} 
FrontLayer={<div></div>} 
BackLayer={<div></div>} 
Content={<div></div>}>

</Scene>
```
Scene可允许指定上中下三层的画布结构
## ChildContext组件
可使用以下方式对目标组件的属性进行赋值：
```tsx
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
```
以上代码中 Scene组件的三个属性会被顶掉，packComponent中直接创建组件实例以允许提供默认值  
**通过ChildContext和Child组件可以对一些可以接受多个children slot的组件进行赋值，组件本身只需要声明几个类型为ReactElement的属性即可**

## Window组件
Scene的封装，通过如下方式使用:
```tsx
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
```
前景背景都没有鼠标事件，而内容有，通过这一方法和在Content中的多重嵌套可实现丰富效果
