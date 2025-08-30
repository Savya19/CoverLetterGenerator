const cvUpload = document.getElementById("cvUpload");
const generateBtn = document.getElementById("generateBtn");
const companyInput = document.getElementById("companyName");
const roleInput = document.getElementById("targetRole");
const companyDescInput = document.getElementById("companyDesc");
const downloadBtn = document.getElementById("downloadBtn");
let lastCoverLetter = '';

generateBtn.addEventListener("click", async () => {
    const file = cvUpload.files[0];
    const company = companyInput.value.trim();
    const job = roleInput.value.trim();
    const companyDesc = companyDescInput.value.trim();

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
    if (!company || !job || !companyDesc) {
        alert("Please enter company, role, and company description.");
        return;
    }

    const formData = new FormData();
    formData.append("cv", file);
    formData.append("company", company);
    formData.append("job", job);
    formData.append("company_desc", companyDesc);

    generateBtn.disabled = true;
    generateBtn.textContent = "Generating...";
    downloadBtn.style.display = "none";

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
        lastCoverLetter = result.cover_letter || '';
        if (lastCoverLetter) {
            downloadBtn.style.display = "block";
        }

    } catch (error) {
        console.error("Error generating cover letter:", error);
        document.getElementById("output").innerHTML = `<div style=\"color: red;\">Error: ${error.message}</div>`;
        downloadBtn.style.display = "none";
    } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = "Generate Cover Letter";
    }
});

downloadBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    
    if (!lastCoverLetter) {
        alert("No cover letter to download. Please generate one first.");
        return;
    }

    try {
        downloadBtn.disabled = true;
        downloadBtn.textContent = "Downloading...";

        const response = await fetch("http://127.0.0.1:5000/download_cover_letter", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            },
            body: JSON.stringify({
                cover_letter: lastCoverLetter
            })
        });

        if (!response.ok) {
            throw new Error(`Download failed: ${response.status}`);
        }

        // Create blob from response
        const blob = await response.blob();
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cover_letter.docx';
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

    } catch (error) {
        console.error("Download error:", error);
        alert("Failed to download cover letter. Please try again.");
    } finally {
        downloadBtn.disabled = false;
        downloadBtn.textContent = "Download as Word";
    }
});


