 const Main = document.querySelector("main")
 const notesContainer = document.querySelector(".notes-container")
const Dialog = document.querySelector("dialog")
const  notesNumber = document.querySelector(".notes-number")   
//  Changing background of Notes App 
const changeDark = () => {
    Main.classList.add("dark")
    Main.classList.remove("normal")
    Main.classList.remove("gradient")
} 
const changeNormal = () => {
    Main.classList.add("normal")
    Main.classList.remove("gradient")
    Main.classList.remove("dark")
    
    
}
const changeGradient = () => {
    Main.classList.add("gradient")
    Main.classList.remove("dark")
    Main.classList.remove("normal")
}

    let Notes = []
    let editingNoteId = null
     // loading Notes from local storage 

    const loadNotes = () => {
        const savedNotes = localStorage.getItem("quickNotes")
        return savedNotes? JSON.parse(savedNotes):[]
    }


    // Save Note function 


    const saveNote = (event) => {
        event.preventDefault()
        
        const titleValue = document.getElementById("titleNote").value.trim()
        const contentValue = document.getElementById("contentNote").value.trim()

        if(editingNoteId){
                const noteIndex = Notes.findIndex((curElem) => {
                   return curElem.id == editingNoteId
                })

                Notes[noteIndex] = {
                    ...Notes[noteIndex],
                    title : titleValue,
                    content : contentValue
                }
                

        }else{

            Notes.unshift(
                {
                    title : `${titleValue}`,
                    content : `${contentValue}`,
                    id: generateId()
                }
            )
        }

            
        saveNotes()
        renderNotes()
        notesNumber.innerHTML = `Maximum Notes : ${Notes.length}/8`
        
        
        
                
        
    }

    const generateId = () => {
        return Date.now().toString()
    }

    // Stores this notes to local storage

        const saveNotes = () => {
            localStorage.setItem("quickNotes" , JSON.stringify(Notes))
        }

        const deleteNote = (noteId) => {
            Notes = Notes.filter((curElem) => {
                return   curElem.id !=  noteId
            })

            saveNotes()
            renderNotes()
            notesNumber.innerHTML = `Maximum Notes : ${Notes.length}/8`
            
        }
        
        const renderNotes = () => {
            if(Notes.length == 0){
                notesContainer.innerHTML = `
                <div class="create-note-div">
                <h1>Add Your First Note</h1>
                <div class="add-note-div" onclick="openNoteDialog()">
                        <h1>+</h1>
                </div>
            </div>
            
            `
            return
        }
        
        notesContainer.innerHTML = Notes.map((curElem) => {
            return `
            <div class="note-div">
            <h1>${curElem.title}</h1>
            <p>${curElem.content}</p>
            
            <div class="notes-btn">
            <button class="edit-btn" onclick= "openNoteDialog(${curElem.id})">EDIT</button>
            <button class="delete-btn" onclick="deleteNote(${curElem.id})">DELETE</button>
            </div>
            
            </div>
            `
        }).join("")
        
        const allNotes = document.querySelectorAll(".note-div")
        
        allNotes.forEach((curElem) => {
            curElem.querySelector(".notes-btn").style.display= "none"
            
            curElem.addEventListener("mouseenter" , () => {
                curElem.querySelector(".notes-btn").style.display= "block"
                
            })
            curElem.addEventListener("mouseleave" , () => {
                curElem.querySelector(".notes-btn").style.display= "none"
                
            })
            
        })
        
        
        
    }
    
    
    
    //  Open note Dialog Function
    
    const openNoteDialog = (noteId) => {
        
        Dialog.showModal()
        if(noteId){
            
            
            const noteToEdit =   Notes.find((curElem) => {
                return  curElem.id == noteId
            })
            
            
            document.getElementById("titleNote").value =  noteToEdit.title 
            document.getElementById("contentNote").value = noteToEdit.content
            editingNoteId = noteId
        }else{
            const Title = document.getElementById("titleNote")
            Title.focus()
            editingNoteId = null
        }
        
        
        
        
    }
    
    //  closed note Dialog Function
    
    const closeNoteDialog = () => {
        Dialog.close()
    }
    
    
    // Dom Content Loading 
    
    document.addEventListener("DOMContentLoaded" , () => {
        // console.log(Notes.length);
        
        Notes = loadNotes()
        renderNotes()
        notesNumber.innerHTML = `Maximum Notes : ${Notes.length}/8`
         
    // console.log(Notes.length);
    

     const Form = document.querySelector("form")

        Form.addEventListener("submit" , (event) => {
            saveNote(event)
            document.getElementById("titleNote").value = ""
            document.getElementById("contentNote").value = ""
            closeNoteDialog()
        })
 

    Dialog.addEventListener("click" , (event) => {
      
        if(event.target == Dialog){
            closeNoteDialog()
        }
    })

})



