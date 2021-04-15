const disk = document.querySelector('.diskDetail');
let surface, track, sector;
let values;
let logicalBlockAddress = [];
let maxBlocks;
let sectorPerCylinder;
let CHSarr = [];
const br = document.createElement('br');


const displayResult = (count) => {
    const result = document.querySelector('.result');
    for(let i=0;i<count;i++){
        const newLi = document.createElement('li');
        newLi.innerHTML = `<h1>Logical Address: <strong>${values[i].value}</strong><br><strong>[C,H,S]:[${CHSarr[i].c},${CHSarr[i].h},${CHSarr[i].s}]</strong></h1>`;
        result.insertAdjacentElement('beforeend', newLi);
    }
}

const CHS = (count) => {
    for(let i=0;i<count;i++){
        CHSarr.push({
            c: 0,
            h: 0,
            s: 0
        });
    }
    for(let i=0;i<count;i++){
        CHSarr[i].c = parseInt(logicalBlockAddress[i]/sectorPerCylinder);
        logicalBlockAddress[i] = logicalBlockAddress[i] - CHSarr[i].c*sectorPerCylinder;
        CHSarr[i].h = parseInt(logicalBlockAddress[i]/sector);
        logicalBlockAddress[i] = logicalBlockAddress[i] - CHSarr[i].h*sector;
        CHSarr[i].s = logicalBlockAddress[i];
    }
    displayResult(count);
}

const addressProcessing = (count) => {
    logicalBlockAddress = [];
    let flag=0;
    for(let i=0;i<count;i++){
        if(parseInt(values[i].value)>=(maxBlocks-1)){
            values[i].classList.add('border-red');
            flag=1;
        }
        else{
            logicalBlockAddress.push(parseInt(values[i].value) + 1);
            values[i].classList.add('border-green');
        }
    }
    if(flag==0){
        CHS(count);
    }else{
        alert(`INCORRECT VALUES FOUND! (SHOULD NOT BE GREATER THAN ${maxBlocks-1})`);
    }
}

const addDiv = (count) => {
    const listDiv = document.querySelector('.values');
    for(let i=0;i<count;i++){
        const input = document.createElement('input');
        input.required = true;
        input.classList.add('value','margin');
        input.type = "number";
        input.min = "0";
        input.value = 0;
        let description = `Value ${i + 1}`;
        input.placeholder = description;
        listDiv.insertAdjacentElement('beforeend', input);
    }
    listDiv.insertAdjacentElement('beforeend', br)
    values = document.querySelectorAll('.value');
    const button = document.createElement('button');
    button.innerText="Proceed";
    button.classList.add('value-btn','btn','btn-success')
    listDiv.insertAdjacentElement('beforeend', button)
    valueBtn = document.querySelector('.value-btn')
    valueBtn.addEventListener('click', ()=>{
        addressProcessing(count);
    })
}
disk.addEventListener('submit', (e)=>{
    e.preventDefault();
    diskDetail = document.querySelectorAll('.disk')
    surface = parseInt(diskDetail[1].value);
    track = parseInt(diskDetail[2].value);
    sector = parseInt(diskDetail[3].value);
    sectorPerCylinder = sector*surface;
    maxBlocks = surface*track*sector;
    const count = document.querySelector('.count');
    addDiv(count.value);
})


let platterInput = () => {
    let platter = document.querySelector('.platter');
    let surface = document.querySelector('.surface');
    platter = parseInt(platter.value);
    surface.value = platter*2;
}
let surfaceInput = () => {
    let platter = document.querySelector('.platter');
    let surface = document.querySelector('.surface');
    surface = parseInt(surface.value);
    platter.value = surface/2;
}