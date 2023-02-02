const divs=document.getElementsByClassName('cat');

for(let i of divs){
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    i.style.backgroundColor = "#" + randomColor;
}
