import ErrorMessage from "../errorMessage/ErrorMessage";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage />
            <p style={{textAlign: "center", fontSize: "72px"}}>404</p>
            <p style={{textAlign: "center", fontSize: "36px"}}>PAGE NOT FOUND</p>
        </div>
    )
};

export default Page404;