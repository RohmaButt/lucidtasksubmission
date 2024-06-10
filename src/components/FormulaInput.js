import React, { useState, useEffect } from "react";
import useFormulaStore from "../store/useFormulaStore";
import Tag from "./Tag";

const FormulaInput = () => {
  const styles = {
    inputField: {
      padding: "5px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    addButton: {
      padding: "5px 10px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      margin: "auto 20px",
    },
    suggestionsList: {
      listStyleType: "none",
      padding: "0",
      margin: "10px 0 0",
      border: "1px solid #ccc",
      borderRadius: "4px",
      maxHeight: "150px",
      overflowY: "auto",
    },
    suggestionItem: {
      padding: "8px",
      cursor: "pointer",
      borderBottom: "1px solid #eee",
    },
    suggestionItemLastChild: {
      borderBottom: "none",
    },
  };

  const { tags, addTag } = useFormulaStore(); // Assuming addTag is used for adding new tags
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      addTag(inputValue.trim());
      setInputValue("");
    }
  };

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete?search=${query}`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    fetchSuggestions(inputValue);
  }, [inputValue]);

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.trim()) {
      addTag(suggestion.trim());
    }
    setInputValue("");
    setSuggestions([]);
  };

  const checkForNumericChars = (str) => {
    const regex = /[+-]/;
    return regex.test(str);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {tags.map((tag, index) => (
          <Tag key={index} content={tag} index={index} />
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          style={styles.inputField}
          placeholder="Enter a tag"
        />
        <button style={styles.addButton} type="submit">
          Insert Tag
        </button>
      </form>
      {suggestions.length > 0 && Array.isArray(suggestions) && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              style={
                index === suggestions.length - 1
                  ? styles.suggestionItemLastChild
                  : styles.suggestionItem
              }
              onClick={() => handleSuggestionClick(suggestion.name)}
            >
              {suggestion.name +
                "-" +
                suggestion.category +
                ":            " +
                (checkForNumericChars(suggestion.value) ? "numeric" : "string")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FormulaInput;
