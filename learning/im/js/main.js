async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`Kunne ikke laste ${filePath}`);
        }

        const html = await response.text();

        const element = document.getElementById(elementId);

        if (!element) {
            return;
        }

        element.innerHTML = html;

        if (elementId === "site-header") {
            setActiveNav();
        }

    } catch (error) {
        console.error(error);
    }
}


function setActiveNav() {
    const currentPath = window.location.pathname;

    const links = document.querySelectorAll(
        ".site-header nav a"
    );

    links.forEach(link => {
        const href = link.getAttribute("href");

        if (!href) {
            return;
        }

        if (
            href !== "/index.html" &&
            currentPath.startsWith(
                href.replace("index.html", "")
            )
        ) {
            link.classList.add("active");
        }
    });
}


loadComponent(
    "site-header",
    "../components/header.html"
);

loadComponent(
    "site-footer",
    "../components/footer.html"
);


window.addEventListener("scroll", () => {
    const header = document.querySelector(".site-header");

    if (!header) {
        return;
    }

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


function renderBlogPosts() {
    const blogContainer =
        document.getElementById("blog-posts");

    if (
        !blogContainer ||
        typeof blogPosts === "undefined"
    ) {
        return;
    }

    blogPosts.forEach(post => {
        const article =
            document.createElement("article");

        article.classList.add("blog-card");

        article.innerHTML = `
            <p class="blog-category">
                ${post.category}
            </p>

            <h2>
                ${post.title}
            </h2>

            <p class="blog-date">
                ${post.date}
            </p>

            <p>
                ${post.description}
            </p>

            <a href="${post.link}">
                Les artikkelen
            </a>
        `;

        blogContainer.appendChild(article);
    });
}


renderBlogPosts();

function renderHomeBlogPosts() {

    const blogContainer =
        document.getElementById("home-blog-posts");

    if (
        !blogContainer ||
        typeof blogPosts === "undefined"
    ) {
        return;
    }

    const latestPosts =
        blogPosts.slice(0, 3);


    latestPosts.forEach(post => {

        const article =
            document.createElement("article");

        article.classList.add("blog-card");


        article.innerHTML = `
            <p class="blog-category">
                ${post.category}
            </p>

            <h2>
                ${post.title}
            </h2>

            <p class="blog-date">
                ${post.date}
            </p>

            <p>
                ${post.description}
            </p>

            <a href="blogg/${post.link}">
                Les artikkelen
            </a>
        `;


        blogContainer.appendChild(article);

    });

}


renderHomeBlogPosts();