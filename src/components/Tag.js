import React, { useState } from "react";
import useFormulaStore from "../store/useFormulaStore";

const Tag = ({ content, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const { removeTag, updateTag } = useFormulaStore();

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      updateTag(index, editContent);
    }
  };

  const handleEditChange = (e) => {
    setEditContent(e.target.value);
  };

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
          onBlur={toggleEditMode}
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
