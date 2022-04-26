import React, { useState } from 'react';
import { Container, Button, Grid, Paper } from '@material-ui/core';
import { Form, FormControl, InputGroup, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { qrcodeGenerateAction } from '../../redux/actions/qrcode-arabicActions';
import useFormValidation from '../../validators/useFormValidation';
import validateQrcode from '../../validators/validateQrcode';
import Favicon from '../../assets/images/favicon.png';
import PageHeading from '../common/pageHeading';

import utf8 from 'utf8';



let INITIAL_STATE = {
    qrcodeUrl:"",
    qrcodeFile:"",
    qrgenType:"url",
    Size:128,
    FgColor: '#000000',
    BgColor: '#ffffff',
    includeImage: true,
    imageH: 24,
    imageW: 24,
    imageX: 0,
    imageY: 0,
    //imageSrc: 'https://static.zpao.com/favicon.png',
   // imageSrc: <Favicon />,
    imageSrc: '',
    centerImage: true,
    imageExcavate: true,
  };

const QrcodeArabicGen = (props) => {

    const { qrCodePath, qrcodeGenerateAction } = props;

    //enable download button
    const [showButton, setShowbutton]= useState(true);


    //show/hide rows
    const [rowUrlVisibility, setRowUrlVisibility]= useState('showRow');
    const [rowImgVisibility, setRowImgVisibility]= useState('hideRow');


    const { handleChange, handleSubmit, values, errors } = useFormValidation(INITIAL_STATE, validateQrcode );

      const hideRowFunc = async(e)=>{
          if(e.target.value==="image"){
              //assign classname here
              setRowUrlVisibility('hideRow');
              setRowImgVisibility('showRow');
          }
          else{
               //assign classname here
               setRowUrlVisibility('showRow');
               setRowImgVisibility('hideRow');
          }
        
      }



      const downloadQRCode = () => {

        const canvas = document.getElementById("qr-gen");
  
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

     

    return(

        <Container className="pageContainer" >
            <PageHeading 
                heading="QR Code Arabic"
            />
            <Grid container direction="row">
                <Grid xs={8} container direction="column" >
                    <Form
                        onSubmit={async e => {
                            try { 
                                await handleSubmit(e, qrcodeGenerateAction,'', true);
                               
                            } catch (error) {}
                        }}
                    >
                        <Grid item xs={3}  >
                            <InputGroup className="mb-3">
                                Url
                                <FormControl
                                    name="qrgenType"
                                    type="radio"
                                    value="url"
                                   // onChange={handleChange}
                                    onChange={e => { handleChange(e); hideRowFunc(e)}}
                                    checked={values.qrgenType === 'url'}
                                />
                           
                                Image
                                <FormControl
                                    name="qrgenType"
                                    type="radio"
                                    value="image"
                                    //onChange={handleChange}
                                    onChange={e => { handleChange(e); hideRowFunc(e)}}
                                    checked={values.qrgenType === 'image'}
                                />
                            </InputGroup>
                        </Grid>

                        <Grid item xs={6} className={rowUrlVisibility}>
                            <InputGroup className="mb-3">
                                <FormControl
                                    name="qrcodeUrl"
                                    type="text"
                                    value={values.qrcodeUrl}
                                    onChange={handleChange}
                                />
                            </InputGroup>
                        </Grid>

                        <Grid item xs={6} className={rowImgVisibility}>
                            <InputGroup className="mb-3">
                                <FormControl
                                    name="qrcodeFile"
                                    type="file"
                                    value={values.qrcodeFile?.files?.[0]?.name}
                                    onChange={(e) => handleChange(e, false, null, true, false)}
                                />
                            </InputGroup>
                        </Grid>

                        <Grid item xs={6}>
                            <InputGroup className="mb-3">
                                <Button variant="contained" color="primary" type='submit'>
                                    Generate{qrCodePath}
                                </Button>
                            </InputGroup>
                        </Grid>
                    </Form>
                </Grid>
                <Grid xs={2} container direction="column" alignItems="center">
                    <img id='qr-gen' src={qrCodePath} />
                    
                    <Button onClick={downloadQRCode} variant="contained" color="primary" disabled={showButton}>
                    Download
                    </Button>
                </Grid>
            </Grid>

       </Container>

    )
}



const mapStateToProps = (state) => ({
	imagePath: state.qrcodeReducer.imagePath
});
const mapDispatchToProps = {
    qrcodeGenerateAction
}
export default connect(mapStateToProps, mapDispatchToProps)(QrcodeArabicGen);