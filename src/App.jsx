import { useEffect, useState } from 'react'
import { Auth } from './components/Auth'
import { db } from './config/firebase/config'
import {getDocs, collection, addDoc, deleteDoc, doc} from 'firebase/firestore'

function App() {

  const [libraryList, setLibraryList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  //New library data
  const [newLibTitle, setNewLibTitle] = useState("")
  const [newLibReleaseDate, setNewLibReleaseDate] = useState(0)
  const [isPopuler, setIsPopuler] = useState(false)

  const libraryCollectionRef = collection(db, "library")

  const deleteLibrary = async () => {
    try {
      const libraryDoc = 
    } catch (err) {
      console.error(err)
    }
  }

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

  useEffect(() => {

    getLibraryList()
  }, [])

  const submitNewLib = async () => {
    try {
      await addDoc(libraryCollectionRef, 
        {title: newLibTitle, 
          releaseDate: newLibReleaseDate, 
          topFavBook: isPopuler
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
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default App
