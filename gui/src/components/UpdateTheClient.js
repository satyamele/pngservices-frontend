import React, {useState} from "react";
import WrappedRegistrationForm from "./Form";
import {Alert, Button, Result} from "antd";
import {createErrorStack} from "../utility/utility";
import {Link} from "react-router-dom";

export const UpdateClient = (props) => {
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(0);
    const [errorText, setErrorText] = useState('');
    const clientId = props.match.params.customerId;

    const catchErrors = (error) => {
        if (error.hasOwnProperty('errorUndefined')) {
            setStatus(500);
            return;
        }
        setStatus(error.status);
        setError(createErrorStack(error.data));
        setErrorText(error.text);
    };

    const handleCloseAlert = (e) =>
        true;

    if (status === 500) {
        return (
            <div>
                <Result
                    status="500"
                    title="500 - check your server or network"
                    subTitle="Sorry, the server is not running or Network error happened."
                    extra={<Button type="primary"><Link to={'/'}>Go To Dashboard</Link></Button>}
                />
            </div>)
    }
    return (
        <>
            {status !== 0 && status !== 500 && <Alert
                style={{marginBottom: 15}}
                message={errorText}
                description={error}
                type="error"
                closable
                onClose={handleCloseAlert}
            />}
            <WrappedRegistrationForm requestType={'put'} btnText={'Update Client'} clientId={clientId}
                                     catchErrors={catchErrors}/>
        </>
    )
}