const cvUpload = document.getElementById("cvUpload");
const generateBtn = document.getElementById("generateBtn");
const companyInput = document.getElementById("cojo1");
const roleInput = document.getElementById("cojo2");


generateBtn.addEventListener("click", async () => {
    const file = cvUpload.files[0];
    const company = companyInput.value.trim();
    const job = roleInput.value.trim();

    // Basic validation
    if (!file) {
        alert("Please upload your CV.");
        return;
    }
    if (!['application/pdf'].includes(file.type)) {
        alert("Please upload a valid PDF file.");
        return;
    }
    if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2MB.");
        return;
    }
    if (!company || !job) {
        alert("Please enter both company and role.");
        return;
    }

    const formData = new FormData();
    formData.append("cv", file);
    formData.append("company", company);
    formData.append("job", job);

    generateBtn.disabled = true;
    generateBtn.textContent = "Generating...";

    try {
        const response = await fetch("http://127.0.0.1:5000/generate_cover_letter", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        });

        const isJson = response.headers.get("content-type")?.includes("application/json");

        if (!response.ok) {
            const errorMsg = isJson ? (await response.json()).error : await response.text();
            throw new Error(errorMsg || `HTTP ${response.status}`);
        }

        const result = isJson ? await response.json() : { cover_letter: "Unknown format received" };

        document.getElementById("output").innerHTML = `<pre>${result.cover_letter}</pre>`;
        const letterHTML = `
            <html>
            <head><title>Generated Cover Letter</title></head>
            <body style="font-family:sans-serif; padding:20px;">
                <h2>Generated Cover Letter</h2>
                <pre>${result.cover_letter || "No content generated."}</pre>
            </body>
            </html>
        `;
        
        const newWindow = window.open("", "_blank");

        if (newWindow) {
            newWindow.document.write(letterHTML);
            newWindow.document.close();
        } else {
            document.getElementById("output").innerHTML = `<pre>${result.cover_letter || "No content generated."}</pre>`;
        }

    
    } catch (error) {
        const isJson = response.headers.get("content-type")?.includes("application/json");
        const errorMsg = isJson ? (await response.json()).error : await response.text();
        console.log("Raw error response:", errorMsg);
        throw new Error(errorMsg || `HTTP ${response.status}`);

    } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = "Generate Cover Letter";
    }
});
