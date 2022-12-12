import React from 'react';
import QRCode from "react-qr-code";
function Account() {
  const jwt =  localStorage.getItem("token")
  console.log(jwt);
    return (
        <>
        <h1>Account</h1>
        <div style={{ height: "auto", margin: "0 auto", maxWidth: 400, width: "100%" }}>
        <QRCode
        size={400}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={jwt}
        viewBox={`0 0 400 400`} />
</div>
        </>

    );
}

export default Account ;