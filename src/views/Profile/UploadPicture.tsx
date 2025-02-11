"use client";

import { uploadImage } from "@/utils/upload";
import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faUser } from "@fortawesome/free-solid-svg-icons";
import Container from "@/components/container";
import { PUT_USER_PICTURE } from "@/lib/actions/Picture";
import FormStatePopup from "@/components/form_ui/FormStatePopup";
type Props = {
  id: string; // The `id` used to name the uploaded image
};

const UploadPicture = ({ id }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [state, setState] = useState<{
    status: number | null;
    message: string;
  }>({ status: null, message: "" });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      // Upload the image to the server and get the new URL
      const newImageUrl = await uploadImage(file, id);
      const res = await PUT_USER_PICTURE(newImageUrl);
      setState(res);
      // Update the state to display the new image
      setImageUrl(newImageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Container className="flex flex-col items-center gap-4">
      {/* Display the uploaded image or a placeholder */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Uploaded"
          width={96}
          height={96}
          className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-400">
          <FontAwesomeIcon icon={faUser} className="text-4xl" />
        </div>
      )}

      {/* File input for uploading a new image */}
      <Container className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="hidden"
          id="upload-input"
        />
        <label
          htmlFor="upload-input"
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faUpload} className="w-5 h-5" />
          <span>{isUploading ? "Uploading..." : "Upload Image"}</span>
        </label>
      </Container>
      {state && <FormStatePopup state={state} className="top-20" />}
    </Container>
  );
};

export default UploadPicture;
