export const url = "http://localhost:5000";

export const setHeaders = () => {
    const header = {
        headers: {
            "x-access-token": localStorage.getItem("token"),
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
    };
    return header;
}