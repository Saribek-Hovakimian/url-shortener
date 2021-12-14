import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Lottie from "lottie-react";
import heroAnimation from "../public/assets/79780-website.json";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';

const HeroTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#9457eb',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#9457eb',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#9457eb',
      borderWidth: "2px",
    },
    '&:hover fieldset': {
      borderColor: '#9457eb',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#9457eb',
    },
  },
});

const ShortenButton = styled(Button)({
  textTransform: 'none',
  fontSize: '1rem',
});

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>URL Shortener</title>
        <meta name="description" content="Shorten your ugly URL quickly and customize your new link" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container maxWidth="lg" className={styles.hero}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <div className={styles.heroCTA}>
                <h1 className={styles.title}>
                  <span className={styles.highlight}>Shorten</span> Ugly Links
                </h1>
                <h2 className={styles.subHeader}>
                  Customize & Share <u className={styles.highlightUnderline}>Anywhere</u>
                </h2>
                <div className={styles.inputBoxes}>
                  <HeroTextField 
                    label="Ugly Link" 
                    variant="outlined" 
                    fullWidth
                    margin='dense'
                    placeholder='Paste ugly link here...'
                    autoFocus
                  />
                  <HeroTextField 
                    label="Short Link" 
                    variant="outlined" 
                    fullWidth
                    margin='dense'
                    InputProps={{
                      startAdornment: <InputAdornment position="start">{`${process.env.NEXT_PUBLIC_CLIENT_URL}/`}</InputAdornment>,
                    }}
                    placeholder='type here...'
                  />
                  <ShortenButton 
                    className={styles.shortenButton} 
                    variant="contained" 
                    fullWidth
                  >
                    Shorten
                  </ShortenButton>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div>
                <a href="https://lottiefiles.com/79780-website">
                  <Lottie 
                    animationData={heroAnimation}
                    style={{ height: 500 }}
                  />
                </a>
              </div>
            </Grid>
          </Grid>
        </Container>
      </main>

      <footer className={styles.footer}>
        Made with ❤️ in Atlanta, GA
      </footer>
    </div>
  )
}
