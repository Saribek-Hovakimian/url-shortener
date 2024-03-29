import { useState } from "react";
import Head from "next/head";
import Lottie from "lottie-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { isValidURL } from "../lib/patterns";
import axios from "axios";

import styles from "../styles/Home.module.css";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";

import heroAnimation from "../public/assets/79780-website.json";

const HeroTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "#9457eb",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "#9457eb",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#9457eb",
            borderWidth: "2px",
        },
        "&:hover fieldset": {
            borderColor: "#9457eb",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#9457eb",
        },
    },
});

const ShortenButton = styled(Button)({
    textTransform: "none",
    fontSize: "1rem",
});

export default function Home() {
    const [originalLink, setOriginalLink] = useState("");
    const [customPath, setCustomPath] = useState("");
    const [error, setError] = useState("");
    const [finalLink, setFinalLink] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (await isValid()) {
            let data = await axios
                .post(`${process.env.NEXT_PUBLIC_API_URL}/links`, {
                    customPath: customPath,
                    originalLink: originalLink,
                })
                .then((response) => {
                    return response.data;
                })
                .catch((error) => error.response.data);

            if (data.error) {
                if (typeof data.error === "object") {
                    setError(
                        data.error.message
                            ? data.error.message
                            : "Error: check inputs and try again later"
                    );
                } else {
                    setError(data.error);
                }
            } else {
                setFinalLink(
                    `${process.env.NEXT_PUBLIC_CLIENT_URL}/${data.customPath}`
                );
                setOriginalLink("");
                setCustomPath("");
                setError("");
            }
            setLoading(false);
        }
    };

    const isValid = async () => {
        if (!isValidURL(originalLink)) {
            setError("Invalid url entered!");
            setLoading(false);
            return false;
        } else {
            return true;
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnackbar(false);
    };

    return (
        <div>
            <Head>
                <title>URL Shortener | Linkfi</title>
                <meta
                    name="description"
                    content="Shorten your long URL quickly and customize your new link"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.container}>
                <Container maxWidth="lg" className={styles.hero}>
                    <Grid container>
                        <Grid item xs={12} md={8} lg={6}>
                            <div className={styles.heroCTA}>
                                <h1 className={styles.title}>
                                    <span className={styles.highlight}>
                                        Shorten
                                    </span>{" "}
                                    Long Links
                                </h1>
                                <h2 className={styles.subHeader}>
                                    Customize &amp; Share{" "}
                                    <u className={styles.highlightUnderline}>
                                        Anywhere
                                    </u>
                                </h2>
                                <form
                                    className={styles.inputSection}
                                    onSubmit={handleSubmit}
                                >
                                    {/* <div className={styles.heroExample}>
                    <Typography variant='h3' className={styles.example}>Example</Typography>
                    <Typography noWrap variant="body2" color="primary" className='exampleText' sx={{ fontStyle: "italic", fontWeight: "lighter" }}><span style={{ color: "black" }}>Ugly:</span> https://www.allrecipes.com/recipe/255038/fajitas-pan-seared</Typography>
                    <Typography noWrap variant="body2" className='exampleText' sx={{ color: "green", marginBottom: "1rem", fontStyle: "italic", fontWeight: "lighter" }}><span style={{ color: "black" }}>New:</span> {process.env.NEXT_PUBLIC_CLIENT_URL}/recipe</Typography>
                  </div> */}

                                    <HeroTextField
                                        id="originalLinkInput"
                                        label="Enter your Long Link"
                                        variant="filled"
                                        fullWidth
                                        margin="dense"
                                        placeholder="Paste long link here..."
                                        focused
                                        value={originalLink}
                                        onChange={(event) => {
                                            setOriginalLink(event.target.value);
                                            setError("");
                                            setFinalLink("");
                                        }}
                                        required
                                    />
                                    <HeroTextField
                                        id="customPathInput"
                                        label="Customize your Short Link"
                                        variant="filled"
                                        fullWidth
                                        margin="dense"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">{`${process.env.NEXT_PUBLIC_CLIENT_SHORT_URL}/`}</InputAdornment>
                                            ),
                                        }}
                                        placeholder="type new link here..."
                                        focused
                                        value={customPath}
                                        onChange={(event) => {
                                            setCustomPath(event.target.value);
                                            setError("");
                                            setFinalLink("");
                                        }}
                                        required
                                    />
                                    <ShortenButton
                                        id="shortenButton"
                                        className={styles.shortenButton}
                                        variant="contained"
                                        fullWidth
                                        type="submit"
                                    >
                                        Shorten
                                    </ShortenButton>

                                    {loading && (
                                        <Stack
                                            direction="row"
                                            justifyContent="center"
                                        >
                                            <CircularProgress
                                                className={styles.progress}
                                            />
                                        </Stack>
                                    )}

                                    {(finalLink || error) && (
                                        <Alert
                                            id={
                                                error
                                                    ? "errorAlert"
                                                    : "successAlert"
                                            }
                                            className={styles.alert}
                                            severity={
                                                error ? "error" : "success"
                                            }
                                            action={
                                                error ? null : (
                                                    <CopyToClipboard
                                                        text={finalLink}
                                                        onCopy={() =>
                                                            setOpenSnackbar(
                                                                true
                                                            )
                                                        }
                                                    >
                                                        <Button
                                                            color="inherit"
                                                            size="small"
                                                        >
                                                            Copy
                                                        </Button>
                                                    </CopyToClipboard>
                                                )
                                            }
                                        >
                                            {error ? error : finalLink}
                                        </Alert>
                                    )}
                                </form>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4} lg={6}>
                            <div>
                                {/* <a href="https://lottiefiles.com/79780-website"> */}
                                <Lottie
                                    animationData={heroAnimation}
                                    style={{ height: 500 }}
                                />
                                {/* </a> */}
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </main>

            <footer className={styles.footer}>
                Made with{" "}
                <span>
                    <FavoriteIcon
                        fontSize="small"
                        sx={{ color: "red", mx: "3px" }}
                    />
                </span>{" "}
                in Atlanta, GA
            </footer>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={1000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="info"
                    color="primary"
                    sx={{ width: "100%" }}
                >
                    Copied!
                </Alert>
            </Snackbar>
        </div>
    );
}
