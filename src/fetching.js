import Error from "./error.js";

const API_URL = import.meta.env.VITE_API_URL;

export function getPosts() {
    return fetch("/post_index.json")
        .then(res => res.json())
        .then(data => data.posts)
        .catch(err => Error.display_result(err, true));
}

export function postImage(file) {
    let has_an_error = false;

    const form_data = new FormData();
    form_data.append("file", file);

    return fetch(`${API_URL}/upload_image`, {
        method: "POST",
        body: form_data
    })
        .then(response => {
            if ( !response.ok ) {
                has_an_error = true;
            }

            return response.json()
        })
        .then(data => {
            if ( has_an_error ) {
                Error.display_result(data, true);
                return null
            }

            Error.display_result(`Image saved with name: ${data.image_path}`, false);
            return data.image_path
        })
        .catch(err => Error.display_result(err, true))
}

export function postPost(post) {
    let has_an_error = false;

    const form_data = new FormData();
    form_data.append("title", post.title);
    form_data.append("description", post.description);
    form_data.append("content", post.content);
    form_data.append("tags", JSON.stringify(post.tags));

    return fetch(`${API_URL}/new_post`, {
        method: "POST",
        body: form_data
    })
        .then(response => {
            if ( !response.ok ) {
                has_an_error = true;
            }

            return response.json()
        })
        .then(data => {
            if ( has_an_error ) {
                Error.display_result(data, true);
                return null
            }

            Error.display_result("Post saved !", false);
            return data
        })
        .catch(err => Error.display_result(err))
}

