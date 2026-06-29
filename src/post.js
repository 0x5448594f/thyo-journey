import { marked } from "marked";
import { postImage, postPost } from "./fetching.js";
import Error from "./error.js";

export default class Post {
    constructor() {
        this.input = document.querySelector("#input");
        this.title_input = document.querySelector("#title-textarea");
        this.description_input = document.querySelector("#description-textarea");
        this.tags_input = document.querySelector("#tags-input");
        this.add_image_input = document.querySelector("#add-image");
        this.preview_button = document.querySelector("#preview");
        this.preview_container = document.querySelector("#preview-container");
        this.save_post_button = document.querySelector("#send");
        this.value = this.input.value;
        this.debug_value = false;

        this.handle_input = this.handle_input.bind(this);
        this.upload_image = this.upload_image.bind(this);
        this.toggle_preview = this.toggle_preview.bind(this);
        this.save_post = this.save_post.bind(this);

        this.input.addEventListener("keyup", this.handle_input);
        this.preview_button.addEventListener("click", this.toggle_preview);
        this.save_post_button.addEventListener("click", this.save_post);
        this.add_image_input.addEventListener("change", this.upload_image)
    }

    handle_input(e) {
        this.#update_value(e);

        if ( this.debug_value ) {
            this.#debug();
        }
    }

    upload_image(e) {
        let file = e.target.files[0];

        postImage(file)
            .then(path => {
                console.log(path);

                if ( path ) {
                    let image_pattern = `![${file.name}](/assets/images/${path})`;

                    this.input.value += `\n ${image_pattern}`;
                }
            })
    }

    save_post() {
        let tags = this.tags_input.value.split("/");

        if ( tags.length === 1 && tags[0] === "" ) {
            tags.pop();
        }

        let post = { 
            title: this.title_input.value,
            description: this.description_input.value,
            content: marked.parse(this.input.value), // See image error
            tags
        }

        if ( post.title.length === 0 || post.description.length === 0 || post.content.length === 0 || post.tags.length === 0 ) {
            Error.display_result("Invalid post !", true);
            return
        }

        postPost(post);
    }

    #update_value(e) {
        this.value = e.target.value;
    }

    #debug() {
        console.log(`Value: ${this.value}`);
    }

    toggle_preview() {
        let is_html = this.preview_button.dataset.value === "to-html";

        if ( is_html ) { 
            this.preview_button.dataset.value = "to-textarea";
            this.preview_button.innerText = "Edit";

            this.preview_container.classList.remove("hide");
            this.input.classList.add("hide");

            this.preview_container.innerHTML = marked.parse(this.input.value);
        } else {
            this.preview_button.dataset.value = "to-html";
            this.preview_button.innerText = "Preview HTML";

            this.preview_container.classList.add("hide");
            this.input.classList.remove("hide");

            this.preview_container.innerHTML = "";
        }
    }
}
