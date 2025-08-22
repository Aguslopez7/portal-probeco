import axiosInstance from "./axiosConfig";

export const uploadFileToCloudinary = async (file, fieldKey) => {
    const timestamp = Date.now(); // current time in milliseconds
    const fileName = `${fieldKey}-${file.name}-${timestamp}`;
    const description = `${fileName} subido en ${new Date(timestamp).toLocaleString()}`;

    const fileData = new FormData();
    fileData.append("file", file);
    fileData.append("name", fileName);
    fileData.append("description", description);

    const res = await axiosInstance.post("/cloudinary/upload", fileData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    console.log(`${fileName} upload successful:`, res.data);
    return res.data;
};

export const handleFileUpload = async (formData, file, fileName) => {
    let updatedFormData = { ...formData }; // create a copy of the current state

    try {
        if (file) {
            const uploadedFile = await uploadFileToCloudinary(file, fileName);
            Object.assign(updatedFormData, uploadedFile);
        }
        return updatedFormData;
    } catch (err) {
        console.error('Upload failed:', err);
        throw err; // rethrow to handle in outer catch
    }
};