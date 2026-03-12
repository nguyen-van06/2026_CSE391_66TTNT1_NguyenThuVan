let students = []

function getRank(d) {
    if(d >= 8.5) return "Gioi"
    if(d >= 7) return "Kha"
    if(d >= 5) return "Trung Binh"
    return "Yeu"
}

function renderTable() {
    const tbody = document.getElementById("tablebody")
    tbody.innerHTML = ""

    let totalScore = 0

    students.forEach((sv, index) => {
        totalScore += sv.score
        let tr = document.createElement("tr")
        if(sv.score < 5) {
            tr.classList.add("yeu")
        }
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${sv.name}</td>
            <td>${sv.score}</td>
            <td>${getRank(sv.score)}</td>
            <td><button data-index="${index}" class="delete-btn">Xóa</button></td>
        `
        tbody.appendChild(tr)
    })
    document.getElementById("total").textContent = students.length
    let avg = students.length ? (totalScore / students.length).toFixed(2) : 0
    document.getElementById("avg").textContent = avg
}

function addStudent() {
    const nameInput = document.getElementById("name")
    const scoreInput = document.getElementById("score")

    const name = nameInput.value.trim()
    const score = parseFloat(scoreInput.value)

    if(name === "") {
        alert("Vui lòng nhập tên sinh viên")
        return
    }

    if(isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập điểm hợp lệ (0-10)")
        return
    }

    students.push({
        name: name,
        score: score
    })

    renderTable()
    nameInput.value = ""
    scoreInput.value = ""
    nameInput.focus()
}

document.getElementById("add").addEventListener("click", addStudent)

document.getElementById("score").addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addStudent()
    }
})

document.getElementById("tablebody").addEventListener("click", function(e){

    if(e.target.tagName === "BUTTON"){

        const index = e.target.dataset.index
        students.splice(index,1)

        renderTable()
    }
})