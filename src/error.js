export default class Error {
    static ERROR_CONTAINER = document.querySelector("#error-container");

    static display_result(result, is_error) {
        let element = document.createElement("span");
        element.classList.add( is_error ? "error" : "valid" );
        element.innerText = result;

        Error.ERROR_CONTAINER.appendChild(element);

        setTimeout(() => {
           Error.ERROR_CONTAINER.removeChild(element);
        }, 5000)
    }
}
