const students=[]

let filteredStudents=[]

const nameInput=document.getElementById("nameInput")
const scoreInput=document.getElementById("scoreInput")
const addBtn=document.getElementById("addBtn")

const searchInput=document.getElementById("searchInput")
const rankFilter=document.getElementById("rankFilter")

const tableBody=document.getElementById("tableBody")
const stats=document.getElementById("stats")
const scoreHeader=document.getElementById("scoreHeader")
const noResult=document.getElementById("noResult")

let sortAsc=true

function getRank(score){

if(score>=8.5) return "Gioi"
if(score>=7) return "Kha"
if(score>=5) return "Trung Binh"
return "Yeu"

}

function renderTable(){

tableBody.innerHTML=""

if(filteredStudents.length===0){

noResult.style.display="block"

}else{

noResult.style.display="none"

}

filteredStudents.forEach((sv,index)=>{

const tr=document.createElement("tr")

if(sv.score<5) tr.classList.add("weak")

tr.innerHTML=`
<td>${index+1}</td>
<td>${sv.name}</td>
<td>${sv.score}</td>
<td>${getRank(sv.score)}</td>
<td><button data-index="${sv.index}">Xóa</button></td>
`

tableBody.appendChild(tr)

})

updateStats()

}

function updateStats(){

const total=students.length

let avg=0

if(total>0){

const sum=students.reduce((a,b)=>a+b.score,0)
avg=(sum/total).toFixed(2)

}

stats.innerText=`Tổng SV: ${total} | Điểm TB: ${avg}`

}

function applyFilters(){

const keyword=searchInput.value.toLowerCase()
const rank=rankFilter.value

filteredStudents=students
.map((sv,i)=>({...sv,index:i}))
.filter(sv=>{

const matchName=sv.name.toLowerCase().includes(keyword)

const svRank=getRank(sv.score)

const matchRank=rank==="all"||svRank===rank

return matchName && matchRank

})

filteredStudents.sort((a,b)=>{

return sortAsc ? a.score-b.score : b.score-a.score

})

scoreHeader.innerText=sortAsc ? "Điểm ▲" : "Điểm ▼"

renderTable()

}

addBtn.onclick=function(){

const name=nameInput.value.trim()
const score=Number(scoreInput.value)

if(name==="" || isNaN(score) || score<0 || score>10){

alert("Dữ liệu không hợp lệ")
return

}

students.push({name,score})

nameInput.value=""
scoreInput.value=""

nameInput.focus()

applyFilters()

}

scoreInput.addEventListener("keypress",function(e){

if(e.key==="Enter") addBtn.click()

})

tableBody.addEventListener("click",function(e){

if(e.target.tagName==="BUTTON"){

const index=e.target.dataset.index

students.splice(index,1)

applyFilters()

}

})

searchInput.addEventListener("input",applyFilters)

rankFilter.addEventListener("change",applyFilters)

scoreHeader.addEventListener("click",function(){

sortAsc=!sortAsc

applyFilters()

})

applyFilters()