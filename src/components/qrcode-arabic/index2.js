import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { 
	Paper, 
	Grid, 
	TextField, 
	TextareaAutosize, 
	Checkbox, 
	Button
 } from '@material-ui/core';

import useFormValidation from "../../validators/useFormValidation";
import validateQrcode from "../../validators/validateQrcode";
//import bgImage from "../../assets/images/qrcodebg.jpg";
var QRCode = require('qrcode.react');


 let INITIAL_STATE = {
    Value: "",
    Size:128,
    FgColor: '#000000',
    BgColor: '#ffffff',
    includeImage: true,
    imageH: 24,
    imageW: 24,
    imageX: 0,
    imageY: 0,
    //imageSrc: 'https://static.zpao.com/favicon.png',
    imageSrc: 'http://localhost:3001/favicon.png',
    centerImage: true,
    imageExcavate: true,
  };

  const useStyles = makeStyles((theme) => ({
  root2: {
    flexGrow: 1,
  },
  paper1: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  paper2: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const QrcodeGen = props => {

const classes = useStyles();

const [includeImageCheck, setincludeImageCheck] = useState(true);
const [centerImageCheck, setcenterImageCheck] = useState(true);
const [imageExcavateCheck, setimageExcavateCheck] = useState(true);
const setincludeImageCheckFunc = async () => {
	 	setincludeImageCheck(!includeImageCheck);
	 }
const setcenterImageCheckFunc = async () => {
	 	setcenterImageCheck(!centerImageCheck);
	 }
const setimageExcavateCheckFunc = async () => {
	 	setimageExcavateCheck(!imageExcavateCheck);
	 }	

const downloadQRCode = () => {

  const canvas = document.getElementById("qr-gen");
  console.log(canvas);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    //downloadLink.download = `${values.Value}Qrcode.png`;
    downloadLink.download = `Qrcode.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

};

const { handleChange, handleSubmit, values, errors } = useFormValidation(
		INITIAL_STATE,
		validateQrcode
		);
console.log(centerImageCheck);
    return (


		    <div className={classes.root2} >
		      <Grid container spacing={3} >
		        <Grid item xs={5}>
		          <Paper className={classes.paper1} >


		          	<div>

		       <div>
		          <label>
		            Description:
		            <br />
		            <TextareaAutosize
		              name="Value"
		              rowsMin={3} 
		              cols="40"
		              onChange={handleChange}
		              value={values.Value}
		            />
		          </label>
		          {errors.Value && <p className="error">{errors.Value}</p>}
		        </div>


		        <div>
		          <label>
		            Size(px):
		            <br />
		            <TextField
		              required
		              type="number"
		              name="Size"
		              onChange={handleChange}
		              value={values.Size}
		            />
		          </label>
		        </div>
		       
		        <div>
		          <label>
		            Background Color:
		            <br />
		            <input
		              name="BgColor"
		              type="color"
		              onChange={handleChange}
		              value={values.BgColor}
		            />
		          </label>
		        </div>

		        <div>
		          <label>
		            Foreground Color:
		            <br />
		            <input
		              name="FgColor"
		              type="color"
		              onChange={handleChange}
		              value={values.FgColor}
		            />
		          </label>
		        </div>

		      </div>



          </Paper>
        </Grid>

        <Grid item xs={4}>
        	<Paper className={classes.paper2}>
        		 <div>
		          <label>
		            Include Image:
		            <br />
		            <Checkbox 
		              color="primary"
		              name="includeImage"
		              checked={includeImageCheck}
		              onChange={setincludeImageCheckFunc}
		            />
		          </label>
		        </div>

		        <fieldset disabled={!includeImageCheck}>
		          <legend>Image Settings</legend>

		          <div>
		            <label>
		              Source:
		              <br />
		              <TextField
		                inputProps={
							{ readOnly: true, }
						}
		                name="imageSrc"
		                type="text"
		                onChange={handleChange}
		                value={values.imageSrc}
		              />
		            </label>
		          </div>
		          <div>
		            <label>
		              Image Width: {values.imageW}
		              <br />
		              <TextField
		             	name="imageW"
		                type="number"
		                value={values.imageW}
		                onChange={handleChange}
		              />
		            </label>
		          </div>
		          <div>
		            <label>
		              Image Height: {values.imageH}
		              <br />
		              <TextField
		                name="imageH"
		                type="number"
		                value={values.imageH}
		                onChange={handleChange}
		              />
		            </label>
		          </div>

		          <div>
		            <label>
		              Center Image:
		              <br />
		              <Checkbox
		                name="centerImage"
		                color="primary"
		                checked={centerImageCheck}
		             	onChange={setcenterImageCheckFunc}
		              />
		            </label>
		          </div>

		          <fieldset disabled={centerImageCheck}>
		            <legend>Image Settings</legend>
		            <div>
		              <label>
		                Image X: {values.imageX}
		                <br />
		                <input
		                  name="imageX"
		                  type="range"
		                  min={0}
		                  max={values.Size - values.imageW}
		                  value={values.imageX}
		                  onChange={handleChange}
		                />
		              </label>
		            </div>
		            <div>
		              <label>
		                Image Y: {values.imageY}
		                <br />
		                <input
		                  name="imageY"
		                  type="range"
		                  min={0}
		                  max={values.Size - values.imageH}
		                  value={values.imageY}
		                  onChange={handleChange}
		                />

		              </label>
		            </div>
		          </fieldset>

		           <div>
		            <label>
		              Excavate ("dig" foreground to nearest whole module):
		              <br />
		              <Checkbox
		                name="imageExcavate"
		                color="primary"
		                checked={imageExcavateCheck}
		              	onChange={setimageExcavateCheckFunc}
		              />
		            </label>
		          </div>
		          </fieldset>
        	</Paper>
        </Grid>

        <Grid item xs={3}>
        	<Paper className={classes.paper2}>
        		<QRCode
        		  id="qr-gen"
		          value={values.Value}
		          size={parseInt(values.Size, 10) || 0}
		          fgColor={values.FgColor}
		          bgColor={values.BgColor}
		          includeMargin={true}

		          imageSettings={
		            includeImageCheck
		              ? {
		                  src: values.imageSrc,
		                  height: values.imageH,
		                  width: values.imageW,
		                  x: centerImageCheck ? null : values.imageX,
		                  y: centerImageCheck ? null : values.imageY,
		                  excavate: imageExcavateCheck,
		                }
		              : null
		          }
		        />
		        
        		<Button onClick={downloadQRCode} variant="contained" color="primary">
				  Download QR Code
				</Button>
        	</Paper>
        </Grid>

      </Grid>
    </div>





      
    );
  }

export default QrcodeGen;