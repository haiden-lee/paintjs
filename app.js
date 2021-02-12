const canvas=document.getElementById("jsCanvas");
const ctx=canvas.getContext("2d");
const colors=document.getElementsByClassName("jsColor");
const range=document.getElementById("jsRange");
const mode=document.getElementById("jsMode");
const saveBtn=document.getElementById("jsSave");

const INITIAL_COLOR="#2c2c2c"
const CANVAS_SIZE=700;

/*canvas는 컨버스 사이즈(css), pixel manipulating(pixel 다룰 수 있는 element로써) 사이즈 둘 다 가져야 함
canvas는 동시에 html5의 한 요소(pixel다룰 수 있는)*/


canvas.width= CANVAS_SIZE;
canvas.height= CANVAS_SIZE;

ctx.fillStyle="white";

ctx.strokeStyle=INITIAL_COLOR; /*처음 브러시 색=검정*/
ctx.fillStyle=INITIAL_COLOR;
ctx.lineWidth=2.5;


let painting=false;
let filling=false;

function stopPainting(){
    painting=false;
}

function startPainting() {
    painting = true;
  }

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
      ctx.beginPath();
      ctx.moveTo(x, y); /*클릭하지 않고 커서를 움직일 때는 path만 만들기*/
    } else {
      ctx.lineTo(x, y); /*선 만들기*/
      ctx.stroke(); /*클릭한 상태로 커서를 움직일 때는 stroke: path 만들고 그대로 선을 그리기*/
    }
}

function onMouseDown(event) {
    painting = true;
}

function handleColorClick(event){
    const color=event.target.style.backgroundColor; /*색상표 클릭할 때 해당 색상 뽑아내기*/
    ctx.strokeStyle=color;
    ctx.fillStyle=color;
}

function handleRangeChange(event){
    const size=event.target.value;
    ctx.lineWidth=size;
}

function handleModeClick(){
    if(filling==true){
        filling=false;
        mode.innerText="FILL";
    } else{
        filling=true;
        mode.innerText="PAINT";
        ctx.ReckFill
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}

function handleCM(event){
    event.preventDefault(); /*마우스우클릭했을 때 아무것도 안 뜨도록*/
}

function handleSaveClick(){
    const image=canvas.toDataURL();
    const link=document.createElement("a");
    link.href=image;
    link.download="PAINTJS[🎨]";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color=>color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange)
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}