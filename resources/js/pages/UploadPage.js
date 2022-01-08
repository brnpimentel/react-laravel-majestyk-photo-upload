import React, { useState } from "react";
import api from "./../services/api";

export default function UploadPage() {
    
    const [loading, setLoading] = useState();
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        file_base64: "",
        output: "",
    });

    const handleChange = (evt) => {
        setForm({
            ...form,
            [evt.target.name]: evt.target.value,
        });
    };

    const handleFile = (evt) => {
        let file = evt.target.files[0];

        //convert to base64
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setForm({
                ...form,
                file_base64: reader.result,
            });
        };
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        setLoading(true);

        api.post("/api/upload", form)
            .then(() => alert('Sended! o/'))

            .catch((e) => {
                setLoading(false);
                // console.log(e);
                e.response.status == 422 &&
                    e.response.data.errors &&
                    setErrors(e.response.data.errors);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div>
            <h2>Welcome!</h2>
            <p>Please, submit the image.</p>
            <form onSubmit={handleSubmit} className="mt-2 space-y-2">
                <input
                    type="file"
                    name="file"
                    required
                    onChange={handleFile}
                    accept="image/png, image/jpeg"
                ></input>
                {errors.file_base64 && (
                    <small className="error-msg">
                        {errors.file_base64.join(", ")}
                    </small>
                )}

                <div><label>Output:</label>
                <select name="output" value={form.output} onChange={handleChange} className="input" required>
                    <option value="" disabled>- Select -</option>
                    <option value="original">Original</option>
                    <option value="square">Square of original size</option>
                    <option value="small">Small</option>
                    <option value="all">All Three</option>
                </select>
                </div>

                <button type="submit" className="block btn">
                    {(loading && "Loading...") || "Send"}
                </button>
            </form>
        </div>
    );
}
