import axios from "axios";
import Link from 'next/link';
import Container from "@mui/material/Container";

const CustomPath = (props) => {
    return (
        <Container>
            {props.error ?
                <>
                    <h1>Error: Unable to locate URL to redirect to</h1>
                    <h2>Please check that your link is correct. Visit <Link href="/"><a>home</a></Link> to learn more about Linkfi.co and our services.</h2>
                </>
            :
                <h1>Redirecting...</h1>
            }
        </Container>
    )
}

export default CustomPath;

export async function getServerSideProps(context) {
    let customPath = context.params.customPath;
    let data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/link/${customPath}`)
        .then(response => {
            return response.data
        })
        .catch(error => error.response.data);

    if (!data || data.error) {
        return {
            props: {
                error: true
            },
        }
    } else {
        return {
            redirect: {
                destination: data.originalLink,
                permanent: false,
            },
        }
    }
}
