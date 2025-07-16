import { useEffect, useState } from 'react'
import { Auth } from './components/Auth'
import { db, auth } from './config/firebase/config'
import {getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore'

function App() {
1
  const [libraryList, setLibraryList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditingById, setIsEditingById] = useState(null)


  //New library data
  const [newLibTitle, setNewLibTitle] = useState("")
  const [newLibReleaseDate, setNewLibReleaseDate] = useState(0)
  const [isPopuler, setIsPopuler] = useState(false)

  //Updated Title
  const [updatedTitleLib, setUpdatedTitleLib] = useState("")

  const libraryCollectionRef = collection(db, "library")

  const deleteLibrary = async (id) => {
    try {
      const libraryDoc = doc(db, "library", id)
      await deleteDoc(libraryDoc)
    } catch (err) {
      console.error(err)
    }
  }

  const updateLib = async (id) => {
    try {
      const libraryDoc = doc(db, "library", id)
      await updateDoc(libraryDoc, {title: updatedTitleLib})
    } catch (err) {
      console.error(err)
    }
  }

  
  useEffect(() => {
    const getLibraryList = async () => {
      try {
        const data = await getDocs(libraryCollectionRef)
        const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
        setLibraryList(filteredData)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    getLibraryList()
  }, [])

  const submitNewLib = async () => {
    try {
      if(!newLibTitle.trim() || !newLibReleaseDate){
        alert("input filed harus terisi")
        return
      }
      await addDoc(libraryCollectionRef, 
        {title: newLibTitle, 
          releaseDate: newLibReleaseDate, 
          topFavBook: isPopuler,
          userId: auth?.currentUser?.uid
        })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>

      <div className="container">
        <Auth/>

        <div className="addLibr">
          <label>New title</label> <br />
          <input 
          value={newLibTitle}
          onChange={(e) => {
            setNewLibTitle(e.target.value)
          }}
          type="text" placeholder='Add title' /> <br />

          <label>Release date</label> <br />
          <input 
          value={newLibReleaseDate}
          onChange={(e) => {
            setNewLibReleaseDate(Number(e.target.value))
          }}
          type="number" placeholder='Release date' /> <br />

          <label>is it populer?</label><br />
          <input 
          checked={isPopuler}
          onChange={(e) => {
            setIsPopuler(e.target.checked)
          }}
          type="checkbox" />

          <button onClick={submitNewLib}>Submit new Library</button>
        </div>

        {isLoading && <h3>Loading....</h3>}
        <div className="library">
            {libraryList.map((lib) => (
              <div className="list" key={lib.id}>
                <h3>{lib.title}</h3>
                <h5>{lib.releaseDate}</h5>

                { isEditingById === lib.id && (<>
                  <label>Title</label><br />
                  <input 
                  value={updatedTitleLib}
                  onChange={(e) => {
                    setUpdatedTitleLib(e.target.value)
                  }}
                  type="text" /><br />
                  </>
                  )}

                <button onClick={() => 
                  deleteLibrary(lib.id)
                }>Delete</button>

                <button onClick={() =>{ 
                  isEditingById === lib.id ? setIsEditingById(null) : setIsEditingById(lib.id)
                }}

                   >{isEditingById === lib.id ? "Cancle Editing" : "Edit"}  </button>

                   {isEditingById === lib.id ? (
                    <button onClick={() => {
                      updateLib(lib.id)
                      setUpdatedTitleLib("")
                    }}>Update</button>
                    ) : ''}
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default App
