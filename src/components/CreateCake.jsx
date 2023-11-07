import React from 'react'
import { useAuth } from "../context/AuthContext"
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import { PhotoCamera } from "@mui/icons-material";
import { Textarea } from "@mui/joy";
import "../styles/CardCreateCake.css";

const CreateCake = ({ fields, buttonName }) => {
  const { register, handleSubmit } = useForm();
  const { createCake } = useAuth();
  const [previewImg, setPreviewImg] = useState(null);
  const [cancelImg, setCancelImg] = useState(false);
  const [img, setImg] = useState(null);

  const defaultImage = "https://images.pexels.com/photos/1028708/pexels-photo-1028708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  // Dentro de la función handleChangeImage
const handleChangeImage = (e) => {
  const fileDefault = "https://images.pexels.com/photos/1028708/pexels-photo-1028708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  const file = e.target.files[0];
  console.log(file);

  // Si el usuario cancela la selección de la imagen
  if (!file) {
    setPreviewImg(fileDefault);
    setCancelImg(true);
  } else {
    setCancelImg(false);
    setPreviewImg(URL.createObjectURL(file));
    setImg(file); // Establecer el estado 'img' con el archivo seleccionado
  }
};

// En la función 'onSubmit'
const onSubmit = handleSubmit(async (data) => {
  console.log(data);
  await createCake(data, img, defaultImage, cancelImg); // Pasar 'img' como un parámetro a 'createCake'
});


  const uploadImage = (
    <Stack direction="row" alignItems="center" spacing={0}>
      <Typography
        sx={{ fontWeight: "medium", textAlign: "center", fontSize: 15, color: "white"}}
      >
        Foto del Pastel
      </Typography>
      <IconButton color="inherit" aria-label="upload picture" component="label">
        <input
          hidden
          accept="image/*"
          type="file"
          name="photo"
          {...register("urlImage")}
          onChange={handleChangeImage}
        />
        <PhotoCamera sx={{color: "white"}}/>
      </IconButton>
    </Stack>
  );

  const imagePreview = (previewImg ? (
    <img
      alt="Foto del pastel"
      src={previewImg}
    />
  ) : (
    <img
      alt="Foto del pastel predeterminada"
      src={defaultImage}
    />
  ));

  const input = fields.map((field, index) => (
    <TextField
      variant="outlined"
      fullWidth
      autoComplete="off"
      label={field.placeholder}
      key={index}
      type={field.type}
      sx={{
        marginBottom: ".7rem",
        backgroundColor: "#141514",
        borderRadius: "5px",
      }}
      InputLabelProps={{ style: { color: "white" } }}
      inputProps={{ style: { color: "white" } }}
      {...register(field.name, { required: true })}
    />
  ));
  
  const textArea = (
    <Textarea
      color="neutral"
      minRows={2}
      placeholder="Descripción"
      size="lg"
      variant="solid"
      sx={{
        marginBottom: ".7rem",
        backgroundColor: "#141514",
        borderRadius: "5px",
        width: "100%",
      }}
      {...register("description", { required: true })}
    />
  );

  const buttonCard = (
    <Button
      variant="contained"
      type="submit"
      style={{
        width: "100%",
        backgroundColor: "#2a9c9d",
      }}
    >
      {`${buttonName}`}
    </Button>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card-container color">
        <div className="card-image">
          {imagePreview}
          {uploadImage}
        </div>
        <div className="card-details">
          {input}
          {textArea}
          <div className="quantity-container"></div>
          {buttonCard}
        </div>
      </div>
    </form>
  )
}

export default CreateCake