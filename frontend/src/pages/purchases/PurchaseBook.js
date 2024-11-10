import React, { useState, useEffect } from 'react';
import { getMusicBooksAndSongs } from '../../api/musicBooks';
import { useParams } from 'react-router-dom';
import { displayMoreOrLessSongs } from '../../js/purchasePage';
import '../../styles/styles.css'

function PurchaseBook() {
    const [currentBook, setCurrentBook] = useState({});
    const [currentSongs, setCurrentSongs] = useState([]);
    const [allSongsDisplayed, setAllSongsDisplayed] = useState(false);
    const { bookId } = useParams();

    useEffect(() => {
        async function requestBooksAndSongs(currentBookId) {
            const {book, songs} = await getMusicBooksAndSongs(currentBookId);
            setCurrentBook(book);
            setCurrentSongs(songs);
        }

        requestBooksAndSongs(bookId);
        displayMoreOrLessSongs();
    }, [bookId]);

    // const frontendHost = process.env.REACT_APP_FRONTEND_HOST;
    // const frontendPort = process.env.REACT_APP_FRONTEND_PORT;
    // useExternalScript('../../js/purchasePage.js');
    // useExternalScript(`${frontendHost}:${frontendPort}/src/js/purchasePage.js`);

    const backendHost = process.env.REACT_APP_BACKEND_HOST;
    const backendPort = process.env.REACT_APP_BACKEND_PORT;
    const musicBookUrl = `${backendHost}:${backendPort}`;

    // const descriptionArray = currentBook.Book_Description.split('\n');
    
    return (
        <>
        {/* <h4 style={{paddingTop: '100px'}}>{currentBook.Book_Description.split('\n')}</h4> */}
        <div id="back-button-purchase">
            <input type="submit" value="Back to all books" class="back-button"/>
        </div>
        <div class="purchase-grid">
            <div class="purchase-book-img">
                {currentBook.image_link ? 
                    <img 
                    src={`${musicBookUrl}/images/purchase/${ currentBook.image_link }`} 
                    alt={`${ currentBook.Book_Name }`} 
                    />
                : null }
            </div>
            <div>
                <h1 class="book-name">{ currentBook.Book_Name }</h1>
                <h3 class="book-author">{ currentBook.Book_Artist }</h3>
                <div class="book-price-container">
                    <h3 class="book-price">{ currentBook.Book_Price }</h3>
                </div>
                    <h3 class="book-level">Difficulty level: { currentBook.Difficulty }</h3>
                    <h5 class="book-shipping">{ currentBook.shipping ? "This book can be shipped" : "No hard copy available for this book" }</h5>
                <form action={`/buy/purchase-complete/${currentBook.Book_ID}`} method="post">
                    <button type="submit" class="purchase-book-button">Purchase Book</button>
                </form>
                <h2>Songs included:</h2>
                <ul class="songs-included">
                    {currentSongs.slice(0, 6).map((song, idx, songs) => {
                        // <li key={`song-${song.Song_ID}`}>{song.Song_Name}</li>
                        if (idx == songs.length - 1) {
                            return (
                                <>
                                <span 
                                    class="more-songs" 
                                    id={`more-songs-${currentBook.Book_ID}`} 
                                    key={`span-${currentBook.Book_ID}`}
                                >
                                    {currentSongs.slice(idx).map((song, idx, songs) => {
                                        return <li key={`song-${song.Song_ID}`}>{song.Song_Name}</li>
                                    })}
                                </span>
                                <p 
                                    id={`see-more-${currentBook.Book_ID}`} 
                                    class="see-more" 
                                    onClick={() => setAllSongsDisplayed(true)} 
                                    key={`see-more-${currentBook.Book_ID}`}
                                    >
                                        See more
                                    </p>
                                {/* {!allSongsDisplayed && (<p 
                                    id={`see-more-${currentBook.Book_ID}`} 
                                    class="see-more" 
                                    onClick={() => setAllSongsDisplayed(true)} 
                                    key={`see-more-${currentBook.Book_ID}`}
                                    >
                                        See more
                                    </p>
                                )} */}
                                </>
                            );
                        } else {
                            return <li key={`song-${song.Song_ID}`}>{song.Song_Name}</li>
                        }
                    })}
                </ul>
                    {/* <% let more = false %>
                    <% for (let song of songs) { %>
                        <% if (songs.indexOf(song) == 5) { %>
                            <span class="more-songs" id="more-songs-<%= book.Book_ID %>">
                            <% more = true %>
                        <% } %> 
                        <li><%= song.Song_Name %></li>
                        <% if (songs.indexOf(song) == songs.length - 1 && more == true) { %>
                            </span>
                            <p id="see-more-<%= book.Book_ID %>" class="see-more">See more</p>
                        <% } %>
                    // <% } %> */}
                <h2 class="book-description-subheader">Description</h2>
                {currentBook.Book_Description ? ( currentBook.Book_Description.split('\n').map((paragraph) => (
                    <p class="book-description-paragraph">{ paragraph }</p>
                ))
            ) : null }
            </div>
        </div>
        
        </>
    )
}

export default PurchaseBook;