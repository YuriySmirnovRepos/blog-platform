import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { withForm } from "@shared/components/HOC/withForm/withForm";
import { CreateArticleFormData } from "../model/types/article";
import "./CreateArticleForm.scss";

interface CreateArticleFormProps {
  form: UseFormReturn<CreateArticleFormData>;
}

const CreateArticleFormContent: React.FC<CreateArticleFormProps> = ({
  form,
}) => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const [newTag, setNewTag] = useState("");
  const tags = watch("tags") || [];

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setValue("tags", [...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setValue(
      "tags",
      tags.filter((tag) => tag !== tagToDelete),
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <>
      <div className="form-group">
        <label>Title</label>
        <input
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters",
            },
          })}
          placeholder="Title"
        />
        {errors.title && (
          <span className="error-message">{errors.title.message}</span>
        )}
      </div>

      <div className="form-group">
        <label>Short description</label>
        <input
          {...register("shortDescription", {
            required: "Short description is required",
            minLength: {
              value: 10,
              message: "Short description must be at least 10 characters",
            },
          })}
          placeholder="Short description"
        />
        {errors.shortDescription && (
          <span className="error-message">
            {errors.shortDescription.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label>Text</label>
        <textarea
          {...register("text", {
            required: "Article text is required",
            minLength: {
              value: 50,
              message: "Article text must be at least 50 characters",
            },
          })}
          placeholder="Write your article here..."
        />
        {errors.text && (
          <span className="error-message">{errors.text.message}</span>
        )}
      </div>

      <div className="form-group tags-container">
        <label>Tags</label>
        <div className="tags-list">
          {tags.map((tag) => (
            <div key={tag} className="tag-item">
              {tag}
              <button
                type="button"
                className="delete-button"
                onClick={() => handleDeleteTag(tag)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="tags-input-group">
          <input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a tag"
          />
          <button
            type="button"
            className="add-tag-button"
            onClick={handleAddTag}
          >
            Add tag
          </button>
        </div>
      </div>

      <button type="submit" className="send-button">
        Send
      </button>
    </>
  );
};

export const CreateArticleForm = withForm<
  CreateArticleFormProps & { title: string; onSubmit: () => void }
>(CreateArticleFormContent, 68);
