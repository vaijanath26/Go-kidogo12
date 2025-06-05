import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Background.module.css';
import restaurantData from '../data/restaurants.json'; // Adjust path if needed

const Background = () => {
  const [query, setQuery] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [fullTextIndex, setFullTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const phrases = [
    'at the best price!',
    'with unique food!',
    'with nice location!',
  ];

  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmedQuery = query.trim().toLowerCase();

    if (trimmedQuery) {
      const match = restaurantData.find(
        (resto) =>
          resto.name.toLowerCase().includes(trimmedQuery) ||
          (resto.cuisine && resto.cuisine.toLowerCase().includes(trimmedQuery))
      );

      if (match) {
        // Navigate to PartnerPage with searchQuery in state
        navigate('/partner', { state: { searchQuery: trimmedQuery } });
      } else {
        alert('No restaurant found for your search.');
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    const currentPhrase = phrases[fullTextIndex];
    if (charIndex < currentPhrase.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + currentPhrase[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCharIndex(0);
        setDisplayText('');
        setFullTextIndex((prev) => (prev + 1) % phrases.length);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, fullTextIndex]);

  return (
    <div className={styles['background-container']}>
      <div className={styles.content}>
        <p className={styles.para}>Delivery or Takeaway Food</p>

        <h2 className={`${styles.subheading} ${styles.typewriter}`}>
          {displayText}
        </h2>

        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search by restaurant or cuisine"
            className={styles.inputField}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button className={styles.SearchBTN} onClick={handleSearch}>
            Search
          </button>
        </div>

        <h4 className={styles.subheading}>
          Trending:- Pizza, Sushi, Burger, Nudeln, Indisch, Thai uvm
        </h4>
      </div>

      <div className={styles['wave-container']}>
        <div className={`${styles.wave} ${styles.wave1}`}></div>
        <div className={`${styles.wave} ${styles.wave2}`}></div>
        <div className={`${styles.wave} ${styles.wave3}`}></div>
      </div>
    </div>
  );
};

export default Background;
