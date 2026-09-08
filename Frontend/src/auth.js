async function login() {
    try {
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const response = await fetch("/login", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({email, password})})
        if (!response.ok) {
            throw new Error("User login request failed");
        }
        const data = await response.json();
        console.log("Server response:", data);
        if (data.success) {
            window.location.href = "/";
        } else {
            alert("Login failed");
        }
    }
    catch(err){console.error("Error calling backend:", err);}
}
