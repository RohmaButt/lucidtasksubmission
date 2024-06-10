import React, { useState } from "react";
import useFormulaStore from "../store/useFormulaStore";

const Tag = ({ content, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const { removeTag, updateTag } = useFormulaStore();

  // Toggle edit mode on and off
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Update the tag in the global state when editing is finished
      updateTag(index, editContent);
    }
  };

  // Update local state as the tag is edited
  const handleEditChange = (e) => {
    setEditContent(e.target.value);
  };

  // Handle removing a tag
  const handleRemove = () => {
    removeTag(index);
  };

  const styles = {
    tagContainer: {
      display: "inline-block",
      margin: "5px",
      padding: "5px",
      backgroundColor: "#e0e0e0",
      borderRadius: "10px",
    },
    editInput: {
      margin: "0 5px",
      padding: "2px 5px",
    },
    removeButton: {
      cursor: "pointer",
      backgroundColor: "grey",
      border: "none",
      borderRadius: "5px",
      color: "white",
      padding: "3px 6px",
      marginLeft: "5px",
    },
  };

  return (
    <div onClick={toggleEditMode} style={styles.tagContainer}>
      {isEditing ? (
        <input
          type="text"
          value={editContent}
          onChange={handleEditChange}
          onBlur={toggleEditMode} // Optionally, toggle edit mode off when input loses focus
          autoFocus
        />
      ) : (
        <span>{content}</span>
      )}
      <button style={styles.removeButton} onClick={handleRemove}>
        [X]
      </button>
    </div>
  );
};

export default Tag;
