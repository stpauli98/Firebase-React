import React, { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase.js";  // Import od DB

function App() {
  // Variable
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // funk show mess
  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // input into DB
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if input is empty
    if (inputValue.trim() === "") {
      showMessage("Unos ne smije biti prazan!");
      return;
    }

    setLoading(true); // loading untill data is showen

    try {
      // adds data to "uson" in DB
      await addDoc(collection(db, "unos"), {
        text: inputValue,
        timestamp: new Date() // time and date whenn added to DB
      });

      // shows mess
      showMessage("Podatak je uspješno sačuvan!");

      // set input on empty
      setInputValue("");
    } catch (e) {
      showMessage("Greška prilikom čuvanja podataka.");
      console.error("Greška prilikom čuvanja: ", e);
    } finally {
      setLoading(false); // loading off/data showen
    }
  };

  // func search DB
  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchValue.trim() === "") {
      showMessage("Unos za pretragu ne smije biti prazan!");
      return;
    }

    setLoading(true); // loading untill data is showen

    try {
      const q = query(collection(db, "unos"), where("text", "==", searchValue));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const result = querySnapshot.docs.map(doc => doc.data());
        setSearchResult(result[0]);  // show shearching results
        showMessage("Podatak pronađen!");
      } else {
        setSearchResult(null);  // set search result on null
        showMessage("Podatak nije pronađen.");
      }
    } catch (e) {
      //console.error("Greška prilikom pretrage: ", e);
      showMessage("Greška prilikom pretrage.");
    } finally {
      setLoading(false);  //  loading off /data showen
    }

    // set search on empty
    setSearchValue("");
  };

  return (
    <div className="App">
      <h2>Firebase</h2>

      {/* Mess find/didn't find the results */}
      {message && <div className="popup-message">{message}</div>}

      {/* Loading */}
      {loading && <div className="loading">Učitavanje...</div>}

      {/* Input Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Unesi tekst"
        />
        <button type="submit" disabled={loading}>Sačuvaj</button>
      </form>

      {/* FSearch Form */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Pretraži bazu podataka"
        />
        <button type="submit" disabled={loading}>Pretraži</button>
      </form>

      {/* Results Form */}
      {searchResult && (
        <div className="search-result">
          <h3>Rezultat pretrage:</h3>
          <p>Tekst: {searchResult.text}</p>
        </div>
      )}
    </div>
  );
}

export default App;
