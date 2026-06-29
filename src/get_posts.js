import { getPosts } from "./fetching.js";

const POST_CONTAINER = document.querySelector(".articles-section");

if ( !POST_CONTAINER ) throw new Error("There is no article container.");

getPosts()
    .then(posts => showPosts(posts));

function showPosts(posts) {
    console.log(posts)

    let is_home = POST_CONTAINER.classList.contains("home-container");
    posts.reverse();
    let length = is_home && posts.length > 5 ? 5 : posts.length;

    for ( let i = 0; i < length; i++ ) {
        let post = posts[i];
        post.tags = JSON.parse(post.tags);

        let article = document.createElement("article");
        article.classList.add("article");

        let title = document.createElement("h2");
        title.innerText = post.title;

        let date = document.createElement("span");
        date.classList.add("article-date");
        date.innerText = post.date;

        let tags_container = document.createElement("ul");
        tags_container.classList.add("tags-container");

        for ( let j = 0; j < post.tags.length; j++ ) {
            const tag_content = post.tags[j];

            let tag_container = document.createElement("li");
            let tag = document.createElement("a");
            tag.href = `/posts?filter=${tag_content}`;
            tag.innerText = `#${tag_content}`;


            tag_container.appendChild(tag);
            tags_container.appendChild(tag_container);
        }

        let description = document.createElement("p");
        description.innerText = post.description;

        let link = document.createElement("a");
        link.classList.add("read-more-button");
        link.href = post.link;
        link.innerText = "Read more";

        article.appendChild(title);
        article.appendChild(date);
        article.appendChild(tags_container);
        article.appendChild(description);
        article.appendChild(link);


        POST_CONTAINER.appendChild(article);
    }
}
